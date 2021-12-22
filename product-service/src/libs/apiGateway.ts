import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }

export type ValidatedEventAPIGatewayProxyEvent<S> =
  Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (
  statusCode: number,
  response: Record<string, unknown>,
  headers: Record<string, string | boolean>,
) => {
  return {
    statusCode,
    headers,
    body: JSON.stringify(response),
  };
};
