import Ajv, { JSONSchemaType } from 'ajv';
import { middyfy } from '@libs/lambda';

import { Api } from '@libs/api';
import { IProduct } from '@interfaces/product';
import { ProductService } from '@services/product.service';
import productSchema from '@schemas/product';
import { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { getPgClient } from '@libs/getPgClient';

const ajv = new Ajv();
const schema: JSONSchemaType<IProduct> = productSchema;
const validate = ajv.compile(schema);

const addProduct: ValidatedEventAPIGatewayProxyEvent<typeof productSchema> = async (event) => {
  const {
    resource,
    path,
    httpMethod,
    body,
  } = event;
  console.log({
    resource,
    path,
    httpMethod,
    body,
  });

  const client = await getPgClient();
  const productService = new ProductService(client);

  try {
    if (!validate(body)) {
      return Api.sendBadRequest(validate.errors?.[0].message);
    }

    const newProduct = await productService.add(body);

    return Api.sendOk({
      data: newProduct,
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

export const main = middyfy(addProduct);
