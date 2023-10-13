import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { IntlProvider } from 'react-intl';

import { startChatBot } from 'chatbot/chatbot';
import { flattenMessages } from 'services/i18n';
import { muiTheme } from 'theme';
import { frFRMessages } from 'translations';

import AppRoutes from './AppRoutes';
import { createAppSyncHybridLink } from './appsyncApolloAdapter/appSyncHybridLink';

const intlMessages = flattenMessages(frFRMessages);

export const createAppSyncApolloClient = async ({
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

const client = await createAppSyncApolloClient({
  appSyncApiUrl:
    'https://q42jhugczngnlafxcv27nc676e.appsync-api.eu-west-1.amazonaws.com/graphql',
  getJwtToken: () => Promise.resolve('da2-zrz3ahlckzcefb7uxkc73nrhja'),
  cacheConfig: {},
  connectToDevTools: true,
});

const App = (): JSX.Element => {
  startChatBot();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={muiTheme}>
        <IntlProvider locale="fr-FR" messages={intlMessages}>
          <CssBaseline />
          <AppRoutes />
        </IntlProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
