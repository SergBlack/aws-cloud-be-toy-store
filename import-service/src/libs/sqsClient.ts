import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

import { REGION } from '@common/constants';

const sqsClient = new SQSClient({ region: REGION });

export {
  SendMessageCommand,
  sqsClient,
};
