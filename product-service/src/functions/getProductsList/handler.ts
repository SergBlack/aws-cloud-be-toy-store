import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import productSchema from '@schemas/product';
import { Api } from '@libs/api';
import { getPgClient } from '@libs/getPgClient';
import { ProductService } from '@services/product.service';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof productSchema> = async (event) => {
  const { resource, path, httpMethod } = event;
  console.log({ resource, path, httpMethod });

  const client = await getPgClient();
  const productService = new ProductService(client);

  try {
    const products = await productService.getAll();

    return Api.sendOk({
      data: products,
      total: products.length,
      resource,
      path,
      httpMethod,
    });
  } catch (e) {
    console.log(e.stack);

    return Api.sendServerError();
  } finally {
    await client.end();
  }
};

export const main = middyfy(getProductsList);
