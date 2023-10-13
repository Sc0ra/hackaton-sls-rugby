import { App } from 'aws-cdk-lib';

import {
  getAppStage,
  getStackName,
  region,
} from '@hackaton-rugby/cdk-configuration';

import { BackendStack } from './stack';

const app = new App();

const stage = getAppStage(app);

new BackendStack(app, getStackName('backend', stage), {
  env: { region },
});
