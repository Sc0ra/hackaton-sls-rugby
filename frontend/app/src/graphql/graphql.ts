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
  createPokemon?: Maybe<Pokemon>;
};


export type MutationCreatePokemonArgs = {
  input: PokemonInput;
};

export type PokemonInput = {
  height: Scalars['Int']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  weight: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  getPokemon?: Maybe<Pokemon>;
  getPokemons?: Maybe<Array<Pokemon>>;
};


export type QueryGetPokemonArgs = {
  id: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onPokemonCreated?: Maybe<Pokemon>;
};

export type Pokemon = {
  __typename?: 'pokemon';
  height: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  weight: Scalars['Int']['output'];
};

export type GetQueryVariables = Exact<{ [key: string]: never; }>;


export type GetQuery = { __typename?: 'Query', getPokemons?: Array<{ __typename?: 'pokemon', id: string, name: string, weight: number, height: number }> | null };

export type OnPokemonCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnPokemonCreatedSubscription = { __typename?: 'Subscription', onPokemonCreated?: { __typename?: 'pokemon', id: string, name: string } | null };


export const GetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Get"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPokemons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]} as unknown as DocumentNode<GetQuery, GetQueryVariables>;
export const OnPokemonCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnPokemonCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onPokemonCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<OnPokemonCreatedSubscription, OnPokemonCreatedSubscriptionVariables>;