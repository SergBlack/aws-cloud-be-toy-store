import { getPgClient } from '@libs/getPgClient';
import { middyfy } from '@libs/lambda';
import { ProductService } from '@services/product.service';
import { PublishCommand, snsClient } from '@libs/snsClient';

const { SNS_ARN } = process.env;

const catalogBatchProcess = async (event) => {
  const { Records } = event;

  const client = await getPgClient();
  const productService = new ProductService(client);

  try {
    const products = Records.map(({ body }) => JSON.parse(body));
    console.log({ products });

    await productService.addItems(products);

    const params = {
      Subject: 'Products was added',
      Message: JSON.stringify(products),
      TopicArn: SNS_ARN,
    };

    const command = new PublishCommand(params);

    await snsClient.send(command);
  } catch (e) {
    console.log(e.stack);
  }
};

export const main = middyfy(catalogBatchProcess);
