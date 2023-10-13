import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import {
  AppsyncFunction,
  AuthorizationType,
  Code,
  Definition,
  FieldLogLevel,
  FunctionRuntime,
  GraphqlApi,
  Resolver,
} from 'aws-cdk-lib/aws-appsync';
import { AttributeType, TableV2 } from 'aws-cdk-lib/aws-dynamodb';
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import path from 'path';

import { bundleAppSyncResolver } from './helpers';

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const cloudWatchLogsRole = new Role(this, 'CloudWatchLogsRole', {
      assumedBy: new ServicePrincipal('appsync.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          'service-role/AWSAppSyncPushToCloudWatchLogs',
        ),
      ],
    });

    const api = new GraphqlApi(this, 'Api', {
      name: apiName,
      definition: Definition.fromFile(
        path.join(__dirname, '../schema.graphql'),
      ),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.API_KEY,
        },
      },
      logConfig: {
        fieldLogLevel: FieldLogLevel.ALL,
        role: cloudWatchLogsRole,
      },
      xrayEnabled: true,
    });

    const rugbyTable = new TableV2(this, 'RugbyTable', {
      partitionKey: {
        name: 'PK',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'SK',
        type: AttributeType.STRING,
      },
    });

    const rugbyDS = api.addDynamoDbDataSource('rugbyDataSource', rugbyTable);

    const defaultPipelineCode = Code.fromInline(`
    // The before step
    export function request(...args) {
      return {}
    }

    // The after step
    export function response(ctx) {
      return ctx.prev.result
    }
  `);

    const getBunkerPolls = new AppsyncFunction(this, 'getBunkerPolls', {
      api,
      name: 'getBunkerPolls',
      dataSource: rugbyDS,
      code: bundleAppSyncResolver(
        path.join(__dirname, '../resolvers/getBunkerPolls.ts'),
      ),
      runtime: FunctionRuntime.JS_1_0_0,
    });

    new Resolver(this, 'QueryGetBunkerPollsResolver', {
      api,
      typeName: 'Query',
      fieldName: 'getBunkerPolls',
      code: defaultPipelineCode,
      runtime: FunctionRuntime.JS_1_0_0,
      pipelineConfig: [getBunkerPolls],
    });

    const createBunkerPoll = new AppsyncFunction(this, 'CreateBunkerPoll', {
      api,
      name: 'createBunkerPoll',
      dataSource: rugbyDS,
      code: bundleAppSyncResolver(
        path.join(__dirname, '../resolvers/createBunkerPoll.ts'),
      ),
      runtime: FunctionRuntime.JS_1_0_0,
    });

    new Resolver(this, 'MutationCreateBunkerPollResolver', {
      api,
      typeName: 'Mutation',
      fieldName: 'createBunkerPoll',
      code: defaultPipelineCode,
      runtime: FunctionRuntime.JS_1_0_0,
      pipelineConfig: [createBunkerPoll],
    });

    const voteBunkerPoll = new AppsyncFunction(this, 'VoteBunkerPoll', {
      api,
      name: 'voteBunkerPoll',
      dataSource: rugbyDS,
      code: bundleAppSyncResolver(
        path.join(__dirname, '../resolvers/voteBunkerPoll.ts'),
      ),
      runtime: FunctionRuntime.JS_1_0_0,
    });

    new Resolver(this, 'MutationVoteBunkerPollResolver', {
      api,
      typeName: 'Mutation',
      fieldName: 'voteBunkerPoll',
      code: defaultPipelineCode,
      runtime: FunctionRuntime.JS_1_0_0,
      pipelineConfig: [voteBunkerPoll],
    });

    const stopBunkerPoll = new AppsyncFunction(this, 'StopBunkerPoll', {
      api,
      name: 'stopBunkerPoll',
      dataSource: rugbyDS,
      code: bundleAppSyncResolver(
        path.join(__dirname, '../resolvers/stopBunkerPoll.ts'),
      ),
      runtime: FunctionRuntime.JS_1_0_0,
    });

    new Resolver(this, 'MutationStopBunkerPollResolver', {
      api,
      typeName: 'Mutation',
      fieldName: 'stopBunkerPoll',
      code: defaultPipelineCode,
      runtime: FunctionRuntime.JS_1_0_0,
      pipelineConfig: [stopBunkerPoll],
    });

    new CfnOutput(this, 'GraphQLAPIURL', {
      value: api.graphqlUrl,
    });
  }
}
