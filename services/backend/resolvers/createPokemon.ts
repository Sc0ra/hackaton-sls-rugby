/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Context, DynamoDBPutItemRequest, util } from '@aws-appsync/utils';

import { createItem } from 'lib/helpers';

import { MutationCreatePokemonArgs, Pokemon } from '../types/appsync';

export function request(
  ctx: Context<MutationCreatePokemonArgs>,
): DynamoDBPutItemRequest {
  const item = createItem(ctx.args.input);

  const id = util.autoId();

  return {
    operation: 'PutItem',
    key: {
      PK: util.dynamodb.toDynamoDB(`POKEMON#${id}`),
      SK: util.dynamodb.toDynamoDB(`POKEMON#${id}`),
    },
    attributeValues: util.dynamodb.toMapValues({
      id,
      ...item,
    }),
  };
}

export function response(
  ctx: Context<MutationCreatePokemonArgs, object, object, object, Pokemon>,
) {
  return ctx.result;
}
