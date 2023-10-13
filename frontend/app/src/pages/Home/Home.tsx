import { useQuery, useSubscription } from '@apollo/client';
import { Box } from '@mui/system';

import { graphql } from 'graphql';
import { BunkerPoll } from 'graphql/graphql';

const GET_BUNKER_POLLS = graphql(/* GraphQL */ `
  query GetBunkerPolls {
    getBunkerPolls {
      id
      yellowVote
      redVote
      isActive
    }
  }
`);

const BUNKER_POLL_UPDATED_SUBSCRIPTION = graphql(`
  subscription OnBunkerPollUpdated {
    onBunkerPollUpdated {
      id
      yellowVote
      redVote
      isActive
    }
  }
`);

const Home = (): JSX.Element => {
  const { data: bunkerPolls } = useQuery<{ getBunkerPolls: BunkerPoll[] }>(
    GET_BUNKER_POLLS,
  );

  const { data: bunkerPollUpdated } = useSubscription<{
    onBunkerPollUpdated: BunkerPoll;
  }>(BUNKER_POLL_UPDATED_SUBSCRIPTION, {});

  console.log({ bunkerPolls, bunkerPollUpdated });

  const redVote = bunkerPollUpdated?.onBunkerPollUpdated.redVote ?? 0;
  const yellowVote = bunkerPollUpdated?.onBunkerPollUpdated.yellowVote ?? 0;
  const yellowPercentage =
    redVote + yellowVote === 0 ? 0.5 : yellowVote / (redVote + yellowVote);
  const value = yellowPercentage * 200 - 100;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
      textAlign="center"
      height="100vh"
      maxWidth="100%"
    >
      {bunkerPollUpdated?.onBunkerPollUpdated.isActive === true && (
        <>
          <div
            style={{
              width: '300px',
              height: '500px',
              backgroundColor: 'yellow',
              position: 'absolute',
              borderRadius: '8px',
              right: '10px',
            }}
          />
          <div
            style={{
              width: '300px',
              height: '500px',
              backgroundColor: 'red',
              clipPath: `polygon(${value}% 100%, 100% ${value}%, 100% 100%)`,
              position: 'absolute',
              borderRadius: '8px',
              right: '10px',
            }}
          />
        </>
      )}
    </Box>
  );
};

export default Home;
