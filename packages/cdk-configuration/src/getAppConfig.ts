import type { Construct } from 'constructs';

import { AppStage, getAppStage } from './getAppStage';

export interface AppConfig {
  restApiConfig: {
    allowedOrigins: string[];
  };
  apiName: string;
}

/**
 * A set of shared parameters, scoped by stage. You can extend them to add other shared parameters between services.
 *
 */

const appConfigMap: Record<AppStage, AppConfig> = {
  dev: {
    restApiConfig: {
      allowedOrigins: ['http://localhost:3000'],
    },
    apiName: `${process.env.DEV_NAME ?? 'dev-name'}-rugby`,
  },
  staging: {
    restApiConfig: {
      allowedOrigins: ['https://staging.my-domain.com'],
    },
    apiName: 'rugby',
  },
  production: {
    restApiConfig: {
      allowedOrigins: ['https://www.my-domain.com'],
    },
    apiName: '-rugby',
  },
};

export const getAppConfig = (scope: Construct): AppConfig => {
  const stage = getAppStage(scope);

  return appConfigMap[stage];
};
