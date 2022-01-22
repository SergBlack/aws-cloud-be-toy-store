import addFormats from 'ajv-formats';
import Ajv from 'ajv';
import { middyfy } from '@libs/lambda';
import { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';

import { Api } from '@libs/api';
import productSchema from '@schemas/product';
import { ProductService } from '@services/product.service';
import { getPgClient } from '@libs/getPgClient';

const ajv = new Ajv();
addFormats(ajv);
const uuidSchema = { type: 'string', format: 'uuid' };
const validate = ajv.compile(uuidSchema);

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

  const client = await getPgClient();
  const productService = new ProductService(client);

  try {
    if (!validate(pathParameters?.id)) {
      return Api.sendBadRequest(validate.errors?.[0].message);
    }

    const product = await productService.findById(pathParameters?.id || '');

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
