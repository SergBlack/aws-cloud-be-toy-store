import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import productSchema from '../../schemas/product';
const mockData = require('../../mock-data/mock.json');

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof productSchema> = async (event) => {
  const { resource, path, httpMethod } = event;

  return formatJSONResponse({
    data: mockData,
    total: mockData.length,
    message: 'Success',
    resource,
    path,
    httpMethod,
  });
};

export const main = middyfy(getProductsList);
