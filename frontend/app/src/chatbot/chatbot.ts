/* eslint-disable complexity */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import tmi, { ChatUserstate } from 'tmi.js';

// Define configuration options
const opts = {
  options: { debug: true },
  channels: ['sc0ra'],
};

let bunkerId: string | undefined = undefined;

// Create a client with our options
const client = new tmi.client(opts);

// Called every time a message comes in
const onMessageHandler = (
  target: string,
  context: ChatUserstate,
  msg: string,
  self: boolean,
) => {
  // Ignore messages from the bot
  if (self) {
    return;
  }

  console.log({ target, context });

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
      void fetch(`http://api.com/bunker/${bunkerId}/start`);
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

      void fetch(`http://api.com/bunker/${bunkerId}/end`);
      bunkerId = undefined;
      break;
    }
    default: {
      if (msg.toLocaleLowerCase().includes('jaune')) {
        if (bunkerId === undefined) {
          console.log('* No bunker to vote');
          break;
        }
        void fetch(`http://api.com/bunker/${bunkerId}/vote/yellow`);
        break;
      }

      if (msg.toLocaleLowerCase().includes('rouge')) {
        if (bunkerId === undefined) {
          console.log('* No bunker to vote');
          break;
        }
        void fetch(`http://api.com/bunker/${bunkerId}/vote/red`);
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
