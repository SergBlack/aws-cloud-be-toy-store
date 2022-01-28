import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        request: {
          parameters: {
            querystrings: {
              name: true,
            },
          },
        },
        authorizer: {
          arn: 'arn:aws:lambda:eu-west-1:611212157086:function:authorization-service-dev-basicAuthorizer',
          identitySource: 'method.request.header.Authorization',
          resultTtlInSeconds: 0,
          type: 'request',
        },
      },
    },
  ],
};
