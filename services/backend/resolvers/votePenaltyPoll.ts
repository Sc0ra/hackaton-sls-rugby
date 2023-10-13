/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Context, DynamoDBUpdateItemRequest, util } from '@aws-appsync/utils';

import { MutationVotePenaltyPollArgs, PenaltyPoll } from '../types/appsync';

export function request(
  ctx: Context<MutationVotePenaltyPollArgs>,
): DynamoDBUpdateItemRequest {
  const { id, vote } = ctx.args;

  return {
    operation: 'UpdateItem',
    key: {
      PK: util.dynamodb.toDynamoDB(`PENALTY_POLL`),
      SK: util.dynamodb.toDynamoDB(id),
    },
    update: {
      expression: `ADD #voteKey :inc`,
      expressionNames: {
        '#voteKey': vote === 'yes' ? 'yesVote' : 'noVote',
      },
      expressionValues: {
        ':inc': { N: 1 },
      },
    },
  };
}

export function response(
  ctx: Context<
    MutationVotePenaltyPollArgs,
    object,
    object,
    object,
    PenaltyPoll
  >,
) {
  return ctx.result;
}
