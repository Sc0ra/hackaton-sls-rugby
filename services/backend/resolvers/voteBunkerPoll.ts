/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Context, DynamoDBUpdateItemRequest, util } from '@aws-appsync/utils';

import { BunkerPoll, MutationVoteBunkerPollArgs } from '../types/appsync';

export function request(
  ctx: Context<MutationVoteBunkerPollArgs>,
): DynamoDBUpdateItemRequest {
  const { id, vote } = ctx.args;

  const keyToUpdate = vote === 'red' ? 'redVote' : 'yellowVote';

  return {
    operation: 'UpdateItem',
    key: {
      PK: util.dynamodb.toDynamoDB(`BUNKER_POLL`),
      SK: util.dynamodb.toDynamoDB(id),
    },
    update: {
      expression: `SET ${keyToUpdate} = if_not_exists(${keyToUpdate}, 0) + 1`,
    },
  };
}

export function response(
  ctx: Context<MutationVoteBunkerPollArgs, object, object, object, BunkerPoll>,
) {
  return ctx.result;
}
