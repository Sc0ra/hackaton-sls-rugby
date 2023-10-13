import { App } from 'aws-cdk-lib';

import {
  getAppStage,
  getStackName,
  region,
} from '@hackaton-rugby/cdk-configuration';

import { BackendStack } from './stack';

import 'dotenv/config';

const app = new App();

const stage = getAppStage(app);

new BackendStack(app, getStackName('backend', stage), {
  env: { region },
});
