/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Context, DynamoDBPutItemRequest, util } from '@aws-appsync/utils';

import { MutationCreatePenaltyPollArgs, PenaltyPoll } from '../types/appsync';

export function request(
  ctx: Context<MutationCreatePenaltyPollArgs>,
): DynamoDBPutItemRequest {
  const id = ctx.args.id;

  return {
    operation: 'PutItem',
    key: {
      PK: util.dynamodb.toDynamoDB(`PENALTY_POLL`),
      SK: util.dynamodb.toDynamoDB(id),
    },
    attributeValues: util.dynamodb.toMapValues({
      id,
      yesVote: 0,
      noVote: 0,
      isActive: true,
    }),
  };
}

export function response(
  ctx: Context<
    MutationCreatePenaltyPollArgs,
    object,
    object,
    object,
    PenaltyPoll
  >,
) {
  return ctx.result;
}
