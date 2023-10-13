import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';

import AppRoutes from 'AppRoutes';
import { startChatBot } from 'chatbot/chatbot';
import { flattenMessages } from 'services/i18n';
import { muiTheme } from 'theme';
import { frFRMessages } from 'translations';

import { createClient } from './client/client';

const intlMessages = flattenMessages(frFRMessages);

const App = (): JSX.Element => {
  startChatBot();

  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  useEffect(() => {
    const instanciateClient = async () => {
      setClient(await createClient());
    };
    void instanciateClient();

    return () => {
      client?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {client !== undefined && (
        <ApolloProvider client={client}>
          <ThemeProvider theme={muiTheme}>
            <IntlProvider locale="fr-FR" messages={intlMessages}>
              <CssBaseline />
              <AppRoutes />
            </IntlProvider>
          </ThemeProvider>
        </ApolloProvider>
      )}
    </>
  );
};

export default App;
