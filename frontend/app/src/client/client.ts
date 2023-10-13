import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

import { createAppSyncHybridLink } from 'appsyncApolloAdapter/appSyncHybridLink';

let client: ApolloClient<NormalizedCacheObject> | undefined;

export const createClient = async (): Promise<
  ApolloClient<NormalizedCacheObject>
> => {
  client = await createAppSyncApolloClient({
    appSyncApiUrl:
      'https://q42jhugczngnlafxcv27nc676e.appsync-api.eu-west-1.amazonaws.com/graphql',
    getJwtToken: () => Promise.resolve('da2-zrz3ahlckzcefb7uxkc73nrhja'),
    cacheConfig: {},
    connectToDevTools: true,
  });

  return client;
};

export const getClient = (): ApolloClient<NormalizedCacheObject> | undefined =>
  client;

const createAppSyncApolloClient = async ({
  appSyncApiUrl,
  getJwtToken,
  cacheConfig,
  connectToDevTools,
}: {
  appSyncApiUrl: string;
  getJwtToken: () => Promise<string>;
  cacheConfig: Record<string, unknown>;
  connectToDevTools: boolean;
}): Promise<ApolloClient<NormalizedCacheObject>> =>
  new ApolloClient({
    link: await createAppSyncHybridLink({
      appSyncApiUrl,
      getJwtToken,
    }),
    cache: new InMemoryCache(cacheConfig),
    connectToDevTools,
  });
