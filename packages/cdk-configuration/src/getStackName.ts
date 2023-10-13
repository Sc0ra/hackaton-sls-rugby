import { CdkDeploymentError } from 'customErrors';
import { AppStage } from 'getAppStage';

export const getStackName = (serviceName: string, stage: AppStage): string => {
  if (stage !== 'dev') {
    return `${serviceName}-${stage}`;
  }

  const devName = process.env.DEV_NAME;
  if (devName === undefined || devName === '') {
    throw new CdkDeploymentError(
      'DEV_NAME must be defined in the environment when deploying to dev',
    );
  }

  return `${devName}-${serviceName}-${stage}`;
};
