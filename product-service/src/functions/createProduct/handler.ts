import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Client } from 'pg';

import productSchema from '@schemas/product';
import { Api } from '@libs/api';
import { ProductService } from '@services/product.service';
import { dbOptions } from '../dbOptions';

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof productSchema> = async (event) => {
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

  const client = new Client(dbOptions);
  await client.connect();
  const productService = new ProductService(client);

  try {
    // TODO: add validation for request body
    if (!body || !body.count || !body.price || !body.title) {
      return Api.sendBadRequest();
    }

    const newProduct = await productService.create(body);

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

export const main = middyfy(createProduct);
