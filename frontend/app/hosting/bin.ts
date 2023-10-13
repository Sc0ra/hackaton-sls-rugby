import { App } from 'aws-cdk-lib';

import {
  getAppStage,
  getStackName,
  region,
} from '@hackaton-rugby/cdk-configuration';

import { FrontendStack } from './stack';

import 'dotenv/config';

const app = new App();

const stage = getAppStage(app);

new FrontendStack(app, getStackName('frontend', stage), {
  env: { region },
});
