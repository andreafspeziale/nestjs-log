import { format as wFormat, createLogger as wCreateLogger, transports } from 'winston';
import { fastifyMiddleware, expressMiddleware } from 'cls-rtracer';
import {
  CUSTOM_LEVELS_ORDER,
  LOGGER_MODULE_OPTIONS_TOKEN,
  LOGGER_CLIENT_TOKEN,
} from './logger.constants';
import { LoggerModuleOptions, LoggerLevel, LoggerClient } from './logger.interfaces';

export const getLoggerModuleOptionsToken = (): string => LOGGER_MODULE_OPTIONS_TOKEN;
export const getLoggerClientToken = (): string => LOGGER_CLIENT_TOKEN;

export const createLoggerClient = (config: LoggerModuleOptions): LoggerClient => {
  const formats = [wFormat.timestamp(), wFormat.json()];
  if (config.pretty) {
    formats.push(wFormat.prettyPrint({ colorize: true }));
  }

  return wCreateLogger({
    level: config.level,
    ...(config.customLevelsOrder ? { levels: CUSTOM_LEVELS_ORDER } : {}),
    format: wFormat.combine(...formats),
    transports: [new transports.Console()],
    silent: config.level === LoggerLevel.Silent,
  });
};

export const isKeyValueObject = (value: unknown): boolean =>
  value !== null &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  !(value instanceof Date) &&
  !(value instanceof RegExp) &&
  !(value instanceof String) &&
  !(value instanceof Number) &&
  !(value instanceof Boolean);

export const rTracerExpressMiddleware = expressMiddleware;
export const rTracerFastifyMiddleware = fastifyMiddleware;
