/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Context, DynamoDBGetItemRequest, util } from '@aws-appsync/utils';

import { Pokemon, QueryGetPokemonArgs } from '../types/appsync';

export function request(
  ctx: Context<QueryGetPokemonArgs>,
): DynamoDBGetItemRequest {
  return {
    operation: 'GetItem',
    key: {
      PK: util.dynamodb.toDynamoDB(`POKEMON#${ctx.args.id}`),
      SK: util.dynamodb.toDynamoDB(`POKEMON#${ctx.args.id}`),
    },
  };
}

export function response(
  ctx: Context<QueryGetPokemonArgs, object, object, object, Pokemon>,
) {
  return ctx.result;
}
