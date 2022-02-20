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
          name: 'basicAuthorizer',
          arn: {
            'Fn::ImportValue': 'authorization-service-dev-BasicAuthorizerArn',
          },
          identitySource: 'method.request.header.Authorization',
          resultTtlInSeconds: 0,
          type: 'request',
        },
      },
    },
  ],
};
