import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Client } from 'pg';

import productSchema from '@schemas/product';
import { Api } from '@libs/api';
import { ProductService } from '@services/product.service';
import { dbOptions } from '../dbOptions';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof productSchema> = async (event) => {
  const {
    resource,
    path,
    httpMethod,
    pathParameters,
  } = event;
  console.log({
    resource, path, httpMethod, pathParameters,
  });

  const client = new Client(dbOptions);
  await client.connect();
  const productService = new ProductService(client);

  try {
    // TODO: add validation for id (uuid_v4)
    const product = await productService.findById('7567ec3b-b10c-48c5-9345-fc73c48a80a1');

    if (!product.length) {
      return Api.sendNotFound('Product was not found in the database');
    }

    return Api.sendOk({
      data: product,
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

export const main = middyfy(getProductById);
