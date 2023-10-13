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
  stopBunkerPoll?: Maybe<BunkerPoll>;
  voteBunkerPoll?: Maybe<BunkerPoll>;
};


export type MutationCreateBunkerPollArgs = {
  id: Scalars['String']['input'];
};


export type MutationStopBunkerPollArgs = {
  id: Scalars['String']['input'];
};


export type MutationVoteBunkerPollArgs = {
  id: Scalars['String']['input'];
  vote: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getBunkerPolls?: Maybe<Array<BunkerPoll>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onBunkerPollUpdated?: Maybe<BunkerPoll>;
};

export type BunkerPoll = {
  __typename?: 'bunkerPoll';
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  redVote: Scalars['Int']['output'];
  yellowVote: Scalars['Int']['output'];
};

export type GetBunkerPollsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBunkerPollsQuery = { __typename?: 'Query', getBunkerPolls?: Array<{ __typename?: 'bunkerPoll', id: string, yellowVote: number, redVote: number, isActive: boolean }> | null };

export type OnBunkerPollUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnBunkerPollUpdatedSubscription = { __typename?: 'Subscription', onBunkerPollUpdated?: { __typename?: 'bunkerPoll', id: string, yellowVote: number, redVote: number, isActive: boolean } | null };


export const GetBunkerPollsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBunkerPolls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBunkerPolls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"yellowVote"}},{"kind":"Field","name":{"kind":"Name","value":"redVote"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<GetBunkerPollsQuery, GetBunkerPollsQueryVariables>;
export const OnBunkerPollUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnBunkerPollUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onBunkerPollUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"yellowVote"}},{"kind":"Field","name":{"kind":"Name","value":"redVote"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<OnBunkerPollUpdatedSubscription, OnBunkerPollUpdatedSubscriptionVariables>;