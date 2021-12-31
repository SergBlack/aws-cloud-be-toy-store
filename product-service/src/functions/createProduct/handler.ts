import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Client, ClientConfig } from 'pg';

import productSchema from '@schemas/product';
import { Api } from '@libs/api';
import { ProductService } from '@services/product.service';

const dbOptions: ClientConfig = {
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof productSchema> = async (event) => {
  const {
    resource,
    path,
    httpMethod,
    body,
  } = event;
  console.log({
    resource, path, httpMethod, body,
  });

  const client = new Client(dbOptions);
  await client.connect();
  const productService = new ProductService(client);

  try {
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
