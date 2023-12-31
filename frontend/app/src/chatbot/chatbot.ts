/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import tmi, { ChatUserstate } from 'tmi.js';

import { graphql } from 'graphql';

import { getClient } from '../client/client';

// Define configuration options
const opts = {
  options: { debug: true },
  channels: ['sc0ra'],
};

let bunkerId: string | undefined = undefined;
let penaltyId: string | undefined = undefined;

// Create a client with our options
const client = new tmi.client(opts);

const CREATE_BUNKER_POLL = graphql(/* GraphQL */ `
  mutation CreateBunkerPoll($bunkerId: String!) {
    createBunkerPoll(id: $bunkerId) {
      id
      yellowVote
      redVote
      isActive
    }
  }
`);

const STOP_BUNKER_POLL = graphql(/* GraphQL */ `
  mutation StopBunkerPoll($bunkerId: String!) {
    stopBunkerPoll(id: $bunkerId) {
      id
      yellowVote
      redVote
      isActive
    }
  }
`);

const VOTE_BUNKER_POLL = graphql(/* GraphQL */ `
  mutation VoteBunkerPoll($bunkerId: String!, $vote: String!) {
    voteBunkerPoll(id: $bunkerId, vote: $vote) {
      id
      yellowVote
      redVote
      isActive
    }
  }
`);

const CREATE_PENALTY_POLL = graphql(/* GraphQL */ `
  mutation CreatePenaltyPoll($penaltyId: String!) {
    createPenaltyPoll(id: $penaltyId) {
      id
      yesVote
      noVote
      isActive
    }
  }
`);

const STOP_PENALTY_POLL = graphql(/* GraphQL */ `
  mutation StopPenaltyPoll($penaltyId: String!) {
    stopPenaltyPoll(id: $penaltyId) {
      id
      yesVote
      noVote
      isActive
    }
  }
`);

const VOTE_PENALTY_POLL = graphql(/* GraphQL */ `
  mutation VotePenaltyPoll($penaltyId: String!, $vote: String!) {
    votePenaltyPoll(id: $penaltyId, vote: $vote) {
      id
      yesVote
      noVote
      isActive
    }
  }
`);

// Called every time a message comes in
const onMessageHandler = (
  _target: string,
  context: ChatUserstate,
  msg: string,
  self: boolean,
) => {
  const apolloClient = getClient();

  // Ignore messages from the bot
  if (self) {
    return;
  }

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  switch (commandName) {
    case '!bunker': {
      if (context.username !== 'sc0ra') {
        console.log('* Not allowed to start a bunker');
        break;
      }
      bunkerId = window.crypto.randomUUID();
      void apolloClient?.mutate({
        mutation: CREATE_BUNKER_POLL,
        variables: { bunkerId },
      });
      break;
    }
    case '!penalty': {
      if (context.username !== 'sc0ra') {
        console.log('* Not allowed to start a bunker');
        break;
      }
      penaltyId = window.crypto.randomUUID();
      void apolloClient?.mutate({
        mutation: CREATE_PENALTY_POLL,
        variables: { penaltyId },
      });
      break;
    }
    case '!bunker-end': {
      if (context.username !== 'sc0ra') {
        console.log('* Not allowed to start a bunker');
        break;
      }

      if (bunkerId === undefined) {
        console.log('* No bunker to end');
        break;
      }

      void apolloClient?.mutate({
        mutation: STOP_BUNKER_POLL,
        variables: { bunkerId },
      });
      bunkerId = undefined;
      break;
    }
    case '!penalty-end': {
      if (context.username !== 'sc0ra') {
        console.log('* Not allowed to start a bunker');
        break;
      }

      if (penaltyId === undefined) {
        console.log('* No bunker to end');
        break;
      }

      void apolloClient?.mutate({
        mutation: STOP_PENALTY_POLL,
        variables: { penaltyId },
      });
      penaltyId = undefined;
      break;
    }
    default: {
      if (msg.toLocaleLowerCase().includes('jaune')) {
        if (bunkerId === undefined) {
          console.log('* No bunker to vote');
          break;
        }
        void apolloClient?.mutate({
          mutation: VOTE_BUNKER_POLL,
          variables: { bunkerId, vote: 'yellow' },
        });
        break;
      }

      if (msg.toLocaleLowerCase().includes('rouge')) {
        if (bunkerId === undefined) {
          console.log('* No bunker to vote');
          break;
        }
        void apolloClient?.mutate({
          mutation: VOTE_BUNKER_POLL,
          variables: { bunkerId, vote: 'red' },
        });
        break;
      }
      if (msg.toLocaleLowerCase().includes('oui')) {
        if (penaltyId === undefined) {
          console.log('* No penalty to vote');
          break;
        }
        void apolloClient?.mutate({
          mutation: VOTE_PENALTY_POLL,
          variables: { penaltyId, vote: 'yes' },
        });
        break;
      }

      if (msg.toLocaleLowerCase().includes('non')) {
        if (penaltyId === undefined) {
          console.log('* No penalty to vote');
          break;
        }
        void apolloClient?.mutate({
          mutation: VOTE_PENALTY_POLL,
          variables: { penaltyId, vote: 'no' },
        });
        break;
      }

      console.log(`* Unknown command ${commandName}`);
      break;
    }
  }
};

// Called every time the bot connects to Twitch chat
const onConnectedHandler = (addr: string, port: number) => {
  console.log(`* Connected to ${addr}:${port}`);
};

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

export const startChatBot = (): void => {
  // Connect to Twitch:
  void client.connect();
};
