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
    appSyncApiUrl: import.meta.env.VITE_API_URL,
    getJwtToken: () => Promise.resolve(import.meta.env.VITE_API_KEY),
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
