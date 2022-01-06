import { handlerPath } from '@libs/handlerResolver';
import { BUCKET, PREFIX } from '@common/constants';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: BUCKET,
        event: 's3:ObjectCreated:*',
        rules: [{
          prefix: PREFIX.UPLOADED,
        }],
        existing: true,
      },
    },
  ],
};
