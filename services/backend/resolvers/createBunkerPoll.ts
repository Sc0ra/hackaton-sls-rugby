/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Context, DynamoDBPutItemRequest, util } from '@aws-appsync/utils';

import { BunkerPoll, MutationCreateBunkerPollArgs } from '../types/appsync';

export function request(
  ctx: Context<MutationCreateBunkerPollArgs>,
): DynamoDBPutItemRequest {
  const id = ctx.args.id;

  return {
    operation: 'PutItem',
    key: {
      PK: util.dynamodb.toDynamoDB(`BUNKER_POLL`),
      SK: util.dynamodb.toDynamoDB(id),
    },
    attributeValues: util.dynamodb.toMapValues({
      id,
      yellowVote: 0,
      redVote: 0,
      isActive: true,
    }),
  };
}

export function response(
  ctx: Context<
    MutationCreateBunkerPollArgs,
    object,
    object,
    object,
    BunkerPoll
  >,
) {
  return ctx.result;
}
