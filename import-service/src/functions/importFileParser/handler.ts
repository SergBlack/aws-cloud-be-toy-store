import csv from 'csvtojson';
import readline from 'readline';
import { GetObjectCommandOutput } from '@aws-sdk/client-s3';

import { middyfy } from '@libs/lambda';
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  s3Client,
} from '@libs/s3Client';
import { BUCKET } from '@common/constants';

function printContent(object: GetObjectCommandOutput) {
  const readlineInterface = readline.createInterface({
    input: object.Body.pipe(csv()),
  });

  readlineInterface
    .on('line', (line) => console.log(`${line}\n`))
    .on('close', () => console.log('File has been read'));
}

const importFileParser = async (event) => {
  const { Records } = event;

  try {
    // eslint-disable-next-line no-restricted-syntax
    for await (const record of Records) {
      const OBJECT_KEY = record.s3.object.key as string;
      const PARSED_OBJECT_KEY = OBJECT_KEY.replace('uploaded', 'parsed');

      const params = {
        Bucket: BUCKET,
        Key: OBJECT_KEY,
      };
      const copyObjectParams = {
        Bucket: BUCKET,
        CopySource: `${BUCKET}/${OBJECT_KEY}`,
        Key: PARSED_OBJECT_KEY,
      };

      const getObjectCommand = new GetObjectCommand(params);
      const copyObjectCommand = new CopyObjectCommand(copyObjectParams);
      const deleteObjectCommand = new DeleteObjectCommand(params);

      const object = await s3Client.send(getObjectCommand);

      printContent(object);

      await s3Client.send(copyObjectCommand);
      await s3Client.send(deleteObjectCommand);
    }
  } catch (e) {
    console.log(e.stack);
  }
};

export const main = middyfy(importFileParser);
