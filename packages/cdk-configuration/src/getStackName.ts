import { AppStage } from 'getAppStage';

export const getStackName = (serviceName: string, stage: AppStage): string => {
  const prepend = stage === 'dev' ? `${process.env.DEV_NAME!}-` : '';

  return `${prepend}${serviceName}-${stage}`;
};
