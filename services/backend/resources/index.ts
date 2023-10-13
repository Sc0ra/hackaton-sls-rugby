import { App } from 'aws-cdk-lib';

import {
  getAppStage,
  projectName,
  region,
} from '@hackaton-rugby/cdk-configuration';

import { BackendStack } from './stack';

const app = new App();

const stage = getAppStage(app);

new BackendStack(app, `${projectName}-backend-${stage}`, {
  env: { region },
});
