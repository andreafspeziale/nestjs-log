import { Inject } from '@nestjs/common';
import { getLoggerModuleOptionsToken, getLoggerClientToken } from './logger.utils';

export const InjectLoggerModuleOptions = (): ReturnType<typeof Inject> => {
  return Inject(getLoggerModuleOptionsToken());
};

export const InjectLogger = (): ReturnType<typeof Inject> => {
  return Inject(getLoggerClientToken());
};
