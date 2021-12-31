import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Client } from 'pg';

import productSchema from '@schemas/product';
import { Api } from '@libs/api';
import { ProductService } from '@services/product.service';
import { dbOptions } from '../dbOptions';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof productSchema> = async (event) => {
  const { resource, path, httpMethod } = event;
  console.log({ resource, path, httpMethod });

  const client = new Client(dbOptions);
  await client.connect();
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
