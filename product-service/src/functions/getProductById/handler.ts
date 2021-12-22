import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import productSchema from '@schemas/product';
import { Api } from '@libs/api';
import { getProduct } from '@controllers/product.controller';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof productSchema> = async (event) => {
  const {
    resource,
    path,
    httpMethod,
    pathParameters,
  } = event;

  try {
    const product = await getProduct(pathParameters.id);

    if (!product) {
      return Api.sendNotFound('Product was not found in the database');
    }

    return Api.sendOk({
      data: product,
      resource,
      path,
      httpMethod,
    });
  } catch (e) {
    return Api.sendServerError();
  }
};

export const main = middyfy(getProductById);
