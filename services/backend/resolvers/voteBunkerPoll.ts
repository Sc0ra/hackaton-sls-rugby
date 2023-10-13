/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Context, DynamoDBUpdateItemRequest, util } from '@aws-appsync/utils';

import { BunkerPoll, MutationVoteBunkerPollArgs } from '../types/appsync';

export function request(
  ctx: Context<MutationVoteBunkerPollArgs>,
): DynamoDBUpdateItemRequest {
  const { id, vote } = ctx.args;

  return {
    operation: 'UpdateItem',
    key: {
      PK: util.dynamodb.toDynamoDB(`BUNKER_POLL`),
      SK: util.dynamodb.toDynamoDB(id),
    },
    update: {
      expression: `ADD #voteKey :inc`,
      expressionNames: {
        '#voteKey': vote === 'red' ? 'redVote' : 'yellowVote',
      },
      expressionValues: {
        ':inc': { N: 1 },
      },
    },
  };
}

export function response(
  ctx: Context<MutationVoteBunkerPollArgs, object, object, object, BunkerPoll>,
) {
  return ctx.result;
}
