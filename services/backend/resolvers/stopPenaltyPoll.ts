/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Context, DynamoDBUpdateItemRequest, util } from '@aws-appsync/utils';

import { MutationStopPenaltyPollArgs, PenaltyPoll } from '../types/appsync';

export function request(
  ctx: Context<MutationStopPenaltyPollArgs>,
): DynamoDBUpdateItemRequest {
  const { id } = ctx.args;

  return {
    operation: 'UpdateItem',
    key: {
      PK: util.dynamodb.toDynamoDB(`PENALTY_POLL`),
      SK: util.dynamodb.toDynamoDB(id),
    },
    update: {
      expression: `SET #isActive = :false`,
      expressionNames: {
        '#isActive': 'isActive',
      },
      expressionValues: {
        ':false': { BOOL: false },
      },
    },
  };
}

export function response(
  ctx: Context<
    MutationStopPenaltyPollArgs,
    object,
    object,
    object,
    PenaltyPoll
  >,
) {
  return ctx.result;
}
