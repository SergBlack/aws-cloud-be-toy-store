import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { PutObjectCommand, s3Client } from '@libs/s3Client';
import { BUCKET, PREFIX, STATUS_CODES } from '@common/constants';

const importProductsFile = async (event) => {
  const { queryStringParameters: { name: fileName } } = event;

  if (!fileName) {
    return formatJSONResponse(STATUS_CODES.BadRequest, { message: 'File name must be specified' });
  }

  const params = {
    Bucket: BUCKET,
    Key: `${PREFIX.UPLOADED}${fileName}`,
    ContentType: 'text/csv',
  };

  const command = new PutObjectCommand(params);

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 180 });

    return formatJSONResponse(STATUS_CODES.OK, { url });
  } catch (e) {
    console.log(e.stack);

    return formatJSONResponse(STATUS_CODES.ServerError, { message: 'Server Error' });
  }
};

export const main = middyfy(importProductsFile);
