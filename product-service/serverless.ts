import type { AWS } from '@serverless/typescript';

import {
  addProduct,
  catalogBatchProcess,
  getProductsList,
  getProductById,
} from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '2',
  plugins: ['serverless-esbuild', 'serverless-dotenv-plugin'],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      SNS_ARN: {
        Ref: 'createProductTopic',
      },
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'sns:*',
        Resource: {
          Ref: 'createProductTopic',
        },
      },
    ],
  },
  resources: {
    Resources: {
      createProductTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'import-service-create-product-topic',
        },
      },
      createProductSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          TopicArn: {
            Ref: 'createProductTopic',
          },
          Endpoint: '${env:SNS_EMAIL}',
          Protocol: 'email',
        },
      },
    },
  },
  // import the function via paths
  functions: {
    addProduct,
    catalogBatchProcess,
    getProductsList,
    getProductById,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk', 'pg-native'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
