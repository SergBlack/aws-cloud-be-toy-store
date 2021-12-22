import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import productSchema from '@schemas/product';
import { Api } from '@libs/api';
import { getAllProducts } from '@controllers/product.controller';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof productSchema> = async (event) => {
  const { resource, path, httpMethod } = event;

  try {
    const products = await getAllProducts();

    return Api.sendOk({
      data: products,
      total: products.length,
      resource,
      path,
      httpMethod,
    });
  } catch (e) {
    return Api.sendServerError();
  }
};

export const main = middyfy(getProductsList);
