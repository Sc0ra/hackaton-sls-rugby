/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Context, DynamoDBScanRequest } from '@aws-appsync/utils';

import { Pokemon } from 'types/appsync';

export function request(): DynamoDBScanRequest {
  return {
    operation: 'Scan',
  };
}

export function response(
  ctx: Context<object, object, object, object, { items: Pokemon[] }>,
) {
  return ctx.result.items;
}
