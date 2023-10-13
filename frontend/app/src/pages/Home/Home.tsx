/* eslint-disable complexity */
import { useSubscription } from '@apollo/client';
import { Box } from '@mui/system';

import { graphql } from 'graphql';
import { BunkerPoll, PenaltyPoll } from 'graphql/graphql';

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

const PENALTY_POLL_UPDATED_SUBSCRIPTION = graphql(`
  subscription OnPenaltyPollUpdated {
    onPenaltyPollUpdated {
      id
      yesVote
      noVote
      isActive
    }
  }
`);

const Home = (): JSX.Element => {
  const { data: bunkerPollUpdated } = useSubscription<{
    onBunkerPollUpdated: BunkerPoll;
  }>(BUNKER_POLL_UPDATED_SUBSCRIPTION, {});

  const { data: penaltyPollUpdated } = useSubscription<{
    onPenaltyPollUpdated: PenaltyPoll;
  }>(PENALTY_POLL_UPDATED_SUBSCRIPTION, {});

  const isBunkerPollActive =
    bunkerPollUpdated?.onBunkerPollUpdated.isActive === true;
  const redVote = bunkerPollUpdated?.onBunkerPollUpdated.redVote ?? 0;
  const yellowVote = bunkerPollUpdated?.onBunkerPollUpdated.yellowVote ?? 0;
  const yellowPercentage =
    redVote + yellowVote === 0 ? 0.5 : yellowVote / (redVote + yellowVote);
  const bunkerValue = yellowPercentage * 200 - 100;

  const isPenaltyPollActive =
    penaltyPollUpdated?.onPenaltyPollUpdated.isActive === true;
  const yesVote = penaltyPollUpdated?.onPenaltyPollUpdated.yesVote ?? 0;
  const noVote = penaltyPollUpdated?.onPenaltyPollUpdated.noVote ?? 0;
  const yesPercentage =
    yesVote + noVote === 0 ? 0 : yesVote / (noVote + yesVote);
  const value = 220 * (1 - yesPercentage);

  const getLineColor = (): string => {
    if (yesPercentage > 2 / 3) {
      return '#8ad30d';
    }
    if (yesPercentage > 1 / 3) {
      return '#f7df2a';
    }

    return '#bc0101';
  };

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
      {isPenaltyPollActive && (
        <div
          style={{
            position: 'absolute',
            right: '350px',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
            <g>
              <title>Layer 1</title>
              <line
                strokeWidth="17"
                id="svg_2"
                y2="310"
                x2="527.03941"
                y1="310"
                x1="324"
                stroke="#c0cde0"
                fill="none"
              />
              <line
                transform="rotate(90 315.52 254)"
                stroke="#c0cde0"
                strokeWidth="17"
                id="svg_3"
                y2="253.99997"
                x2="514.03944"
                y1="253.99997"
                x1="117.00002"
                fill="none"
              />
              <line
                transform="rotate(90 535.52 254)"
                stroke="#c0cde0"
                strokeWidth="17"
                id="svg_4"
                y2="253.99997"
                x2="734.03944"
                y1="253.99997"
                x1="337.00002"
                fill="none"
              />
              <line
                strokeWidth="18"
                strokeDasharray="5,5"
                stroke={getLineColor()}
                id="svg_5"
                y2="180"
                x2="420"
                y1="500"
                x1="420"
                fill="none"
              >
                <animate
                  attributeName="x2"
                  values={`${420 - value};${420 + value};${420 - value}`}
                  dur="10s"
                  repeatCount="indefinite"
                />
              </line>
              <ellipse
                transform="rotate(-12.1963 427.517 522.577)"
                stroke="#ffffff"
                ry="51.5"
                rx="30.59841"
                id="svg_1"
                cy="522.5771"
                cx="427.51666"
                fill="#ffffff"
              />
            </g>
          </svg>
        </div>
      )}
      {isBunkerPollActive && (
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
              clipPath: `polygon(${bunkerValue}% 100%, 100% ${bunkerValue}%, 100% 100%)`,
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
