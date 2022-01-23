import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

import { REGION } from '@common/constants';

const snsClient = new SNSClient({ region: REGION });

export {
  PublishCommand,
  snsClient,
};
