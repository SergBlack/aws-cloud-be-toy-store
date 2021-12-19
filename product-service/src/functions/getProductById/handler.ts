import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import productSchema from '../../schemas/product';
const mockData = require('../../mock-data/mock.json');

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof productSchema> = async (event) => {
  const {
    resource,
    path,
    httpMethod,
    pathParameters,
  } = event;

  const foundProduct = mockData.filter(product => product.id === pathParameters.id);

  return formatJSONResponse({
    data: foundProduct,
    message: foundProduct.length ? 'Success' : 'Product was not found in the database',
    resource,
    path,
    httpMethod,
  });
};

export const main = middyfy(getProductById);
