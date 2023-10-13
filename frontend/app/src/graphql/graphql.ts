/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createBunkerPoll?: Maybe<BunkerPoll>;
  createPenaltyPoll?: Maybe<PenaltyPoll>;
  stopBunkerPoll?: Maybe<BunkerPoll>;
  stopPenaltyPoll?: Maybe<PenaltyPoll>;
  voteBunkerPoll?: Maybe<BunkerPoll>;
  votePenaltyPoll?: Maybe<PenaltyPoll>;
};


export type MutationCreateBunkerPollArgs = {
  id: Scalars['String']['input'];
};


export type MutationCreatePenaltyPollArgs = {
  id: Scalars['String']['input'];
};


export type MutationStopBunkerPollArgs = {
  id: Scalars['String']['input'];
};


export type MutationStopPenaltyPollArgs = {
  id: Scalars['String']['input'];
};


export type MutationVoteBunkerPollArgs = {
  id: Scalars['String']['input'];
  vote: Scalars['String']['input'];
};


export type MutationVotePenaltyPollArgs = {
  id: Scalars['String']['input'];
  vote: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getBunkerPolls?: Maybe<Array<BunkerPoll>>;
  getPenaltyPolls?: Maybe<Array<PenaltyPoll>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onBunkerPollUpdated?: Maybe<BunkerPoll>;
  onPenaltyPollUpdated?: Maybe<PenaltyPoll>;
};

export type BunkerPoll = {
  __typename?: 'bunkerPoll';
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  redVote: Scalars['Int']['output'];
  yellowVote: Scalars['Int']['output'];
};

export type PenaltyPoll = {
  __typename?: 'penaltyPoll';
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  noVote: Scalars['Int']['output'];
  yesVote: Scalars['Int']['output'];
};

export type CreateBunkerPollMutationVariables = Exact<{
  bunkerId: Scalars['String']['input'];
}>;


export type CreateBunkerPollMutation = { __typename?: 'Mutation', createBunkerPoll?: { __typename?: 'bunkerPoll', id: string, yellowVote: number, redVote: number, isActive: boolean } | null };

export type StopBunkerPollMutationVariables = Exact<{
  bunkerId: Scalars['String']['input'];
}>;


export type StopBunkerPollMutation = { __typename?: 'Mutation', stopBunkerPoll?: { __typename?: 'bunkerPoll', id: string, yellowVote: number, redVote: number, isActive: boolean } | null };

export type VoteBunkerPollMutationVariables = Exact<{
  bunkerId: Scalars['String']['input'];
  vote: Scalars['String']['input'];
}>;


export type VoteBunkerPollMutation = { __typename?: 'Mutation', voteBunkerPoll?: { __typename?: 'bunkerPoll', id: string, yellowVote: number, redVote: number, isActive: boolean } | null };

export type CreatePenaltyPollMutationVariables = Exact<{
  penaltyId: Scalars['String']['input'];
}>;


export type CreatePenaltyPollMutation = { __typename?: 'Mutation', createPenaltyPoll?: { __typename?: 'penaltyPoll', id: string, yesVote: number, noVote: number, isActive: boolean } | null };

export type StopPenaltyPollMutationVariables = Exact<{
  penaltyId: Scalars['String']['input'];
}>;


export type StopPenaltyPollMutation = { __typename?: 'Mutation', stopPenaltyPoll?: { __typename?: 'penaltyPoll', id: string, yesVote: number, noVote: number, isActive: boolean } | null };

export type VotePenaltyPollMutationVariables = Exact<{
  penaltyId: Scalars['String']['input'];
  vote: Scalars['String']['input'];
}>;


export type VotePenaltyPollMutation = { __typename?: 'Mutation', votePenaltyPoll?: { __typename?: 'penaltyPoll', id: string, yesVote: number, noVote: number, isActive: boolean } | null };

export type GetBunkerPollsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBunkerPollsQuery = { __typename?: 'Query', getBunkerPolls?: Array<{ __typename?: 'bunkerPoll', id: string, yellowVote: number, redVote: number, isActive: boolean }> | null };

export type OnBunkerPollUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnBunkerPollUpdatedSubscription = { __typename?: 'Subscription', onBunkerPollUpdated?: { __typename?: 'bunkerPoll', id: string, yellowVote: number, redVote: number, isActive: boolean } | null };


export const CreateBunkerPollDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBunkerPoll"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bunkerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBunkerPoll"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bunkerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"yellowVote"}},{"kind":"Field","name":{"kind":"Name","value":"redVote"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<CreateBunkerPollMutation, CreateBunkerPollMutationVariables>;
export const StopBunkerPollDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StopBunkerPoll"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bunkerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopBunkerPoll"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bunkerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"yellowVote"}},{"kind":"Field","name":{"kind":"Name","value":"redVote"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<StopBunkerPollMutation, StopBunkerPollMutationVariables>;
export const VoteBunkerPollDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VoteBunkerPoll"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bunkerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vote"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voteBunkerPoll"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bunkerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"vote"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vote"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"yellowVote"}},{"kind":"Field","name":{"kind":"Name","value":"redVote"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<VoteBunkerPollMutation, VoteBunkerPollMutationVariables>;
export const CreatePenaltyPollDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePenaltyPoll"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"penaltyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPenaltyPoll"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"penaltyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"yesVote"}},{"kind":"Field","name":{"kind":"Name","value":"noVote"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<CreatePenaltyPollMutation, CreatePenaltyPollMutationVariables>;
export const StopPenaltyPollDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StopPenaltyPoll"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"penaltyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopPenaltyPoll"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"penaltyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"yesVote"}},{"kind":"Field","name":{"kind":"Name","value":"noVote"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<StopPenaltyPollMutation, StopPenaltyPollMutationVariables>;
export const VotePenaltyPollDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VotePenaltyPoll"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"penaltyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vote"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"votePenaltyPoll"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"penaltyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"vote"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vote"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"yesVote"}},{"kind":"Field","name":{"kind":"Name","value":"noVote"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<VotePenaltyPollMutation, VotePenaltyPollMutationVariables>;
export const GetBunkerPollsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBunkerPolls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBunkerPolls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"yellowVote"}},{"kind":"Field","name":{"kind":"Name","value":"redVote"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<GetBunkerPollsQuery, GetBunkerPollsQueryVariables>;
export const OnBunkerPollUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnBunkerPollUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onBunkerPollUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"yellowVote"}},{"kind":"Field","name":{"kind":"Name","value":"redVote"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<OnBunkerPollUpdatedSubscription, OnBunkerPollUpdatedSubscriptionVariables>;