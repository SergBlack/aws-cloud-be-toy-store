import { formatJSONResponse } from '@libs/apiGateway';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

const STATUS_CODES = {
  OK: 200,
  BadRequest: 400,
  NotFound: 404,
  ServerError: 500,
};

export class Api {
  static sendOk(response: Record<string, unknown>) {
    return formatJSONResponse(STATUS_CODES.OK, response, headers);
  }

  static sendBadRequest(message?: string) {
    return formatJSONResponse(STATUS_CODES.BadRequest, { message }, headers);
  }

  static sendNotFound(message?: string) {
    return formatJSONResponse(STATUS_CODES.NotFound, { message }, headers);
  }

  static sendServerError() {
    return formatJSONResponse(STATUS_CODES.ServerError, { message: 'Server error' }, headers);
  }
}
