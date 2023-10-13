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
  createPokemon?: Maybe<Pokemon>;
};


export type MutationCreatePokemonArgs = {
  input: PokemonInput;
};

export type PokemonInput = {
  height: Scalars['Int'];
  id: Scalars['String'];
  name: Scalars['String'];
  weight: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getPokemon?: Maybe<Pokemon>;
  getPokemons?: Maybe<Array<Pokemon>>;
};


export type QueryGetPokemonArgs = {
  id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onPokemonCreated?: Maybe<Pokemon>;
};

export type Pokemon = {
  __typename?: 'pokemon';
  height: Scalars['Int'];
  id: Scalars['String'];
  name: Scalars['String'];
  weight: Scalars['Int'];
};
