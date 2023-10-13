export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AWSDate: string;
  AWSDateTime: string;
  AWSEmail: string;
  AWSIPAddress: string;
  AWSJSON: string;
  AWSPhone: string;
  AWSTime: string;
  AWSTimestamp: number;
  AWSURL: string;
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
  id: Scalars['String'];
};


export type MutationCreatePenaltyPollArgs = {
  id: Scalars['String'];
};


export type MutationStopBunkerPollArgs = {
  id: Scalars['String'];
};


export type MutationStopPenaltyPollArgs = {
  id: Scalars['String'];
};


export type MutationVoteBunkerPollArgs = {
  id: Scalars['String'];
  vote: Scalars['String'];
};


export type MutationVotePenaltyPollArgs = {
  id: Scalars['String'];
  vote: Scalars['String'];
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
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  redVote: Scalars['Int'];
  yellowVote: Scalars['Int'];
};

export type PenaltyPoll = {
  __typename?: 'penaltyPoll';
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  noVote: Scalars['Int'];
  yesVote: Scalars['Int'];
};
