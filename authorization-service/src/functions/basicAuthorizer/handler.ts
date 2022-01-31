import { generatePolicy } from '@libs/generatePolicy';

const { user: storedUserPassword } = process.env;

const basicAuthorizer = (event, _context, callback) => {
  console.log('event', JSON.stringify(event));

  if (event.type !== 'REQUEST') {
    return callback('Unauthorized');
  }

  const { headers, methodArn } = event;

  if (!headers.Authorization) {
    return callback('Unauthorized');
  }

  const [authScheme, token] = headers.Authorization.split(' ');

  if (!(authScheme.toLowerCase() === 'basic' && token)) {
    return callback('Unauthorized');
  }

  try {
    const buffer = Buffer.from(token, 'base64');
    const [_username, password] = buffer.toString('utf-8').split(':');

    const effect = storedUserPassword !== password ? 'Deny' : 'Allow';

    console.log({ token, effect, methodArn });

    return callback(null, generatePolicy(token, effect, methodArn));
  } catch (err) {
    console.log(`Catch error. Invalid token: ${err.message}`);

    return callback('Unauthorized');
  }
};

export const main = basicAuthorizer;
