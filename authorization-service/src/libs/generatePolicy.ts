import { AuthResponseType } from 'src/common/types';

export const generatePolicy = (principalId: string, effect: 'Allow' | 'Deny', resource) => {
  const authResponse: AuthResponseType = {
    principalId,
  };

  if (effect && resource) {
    authResponse.policyDocument = {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    };
  }
  return authResponse;
};
