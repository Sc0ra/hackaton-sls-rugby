import { Stack, StackProps } from 'aws-cdk-lib';
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
      roleName: 'CloudWatchLogsRole',
      assumedBy: new ServicePrincipal('appsync.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          'service-role/AWSAppSyncPushToCloudWatchLogs',
        ),
      ],
    });

    const api = new GraphqlApi(this, 'Api', {
      name: 'pokemon',
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

    const pokemonTable = new TableV2(this, 'PokemonTable', {
      partitionKey: {
        name: 'PK',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'SK',
        type: AttributeType.STRING,
      },
    });

    const pokemonDS = api.addDynamoDbDataSource(
      'pokemonDataSource',
      pokemonTable,
    );

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

    const getPokemon = new AppsyncFunction(this, 'GetPokemon', {
      api,
      name: 'getPokemon',
      dataSource: pokemonDS,
      code: bundleAppSyncResolver(
        path.join(__dirname, '../resolvers/getPokemon.ts'),
      ),
      runtime: FunctionRuntime.JS_1_0_0,
    });

    new Resolver(this, 'QueryGetPokemonResolver', {
      api,
      typeName: 'Query',
      fieldName: 'getPokemon',
      code: defaultPipelineCode,
      runtime: FunctionRuntime.JS_1_0_0,
      pipelineConfig: [getPokemon],
    });

    const createPokemon = new AppsyncFunction(this, 'CreatePokemon', {
      api,
      name: 'createPokemon',
      dataSource: pokemonDS,
      code: bundleAppSyncResolver(
        path.join(__dirname, '../resolvers/createPokemon.ts'),
      ),
      runtime: FunctionRuntime.JS_1_0_0,
    });

    new Resolver(this, 'MutationCreatePokemonResolver', {
      api,
      typeName: 'Mutation',
      fieldName: 'createPokemon',
      code: defaultPipelineCode,
      runtime: FunctionRuntime.JS_1_0_0,
      pipelineConfig: [createPokemon],
    });

    const getPokemons = new AppsyncFunction(this, 'GetPokemons', {
      api,
      name: 'getPokemons',
      dataSource: pokemonDS,
      code: bundleAppSyncResolver(
        path.join(__dirname, '../resolvers/getPokemons.ts'),
      ),
      runtime: FunctionRuntime.JS_1_0_0,
    });

    new Resolver(this, 'QueryGetPokemonsResolver', {
      api,
      typeName: 'Query',
      fieldName: 'getPokemons',
      code: defaultPipelineCode,
      runtime: FunctionRuntime.JS_1_0_0,
      pipelineConfig: [getPokemons],
    });
  }
}
