import { format as wFormat, createLogger as wCreateLogger, transports } from 'winston';
import { fastifyMiddleware, expressMiddleware } from 'cls-rtracer';
import { LoggerModuleOptions, LoggerLevel, LoggerClient } from './logger.interfaces';
import { loggerModuleOptions } from './logger.defaults';
import {
  CUSTOM_LEVELS_ORDER,
  LOGGER_MODULE_OPTIONS_TOKEN,
  LOGGER_CLIENT_TOKEN,
} from './logger.constants';

export const getLoggerModuleOptionsToken = (): string => LOGGER_MODULE_OPTIONS_TOKEN;
export const getLoggerClientToken = (): string => LOGGER_CLIENT_TOKEN;

export const createLoggerClient = (config: LoggerModuleOptions = {}): LoggerClient => {
  const c = { ...loggerModuleOptions, ...config };

  const formats = [wFormat.timestamp(), wFormat.json()];

  if (c.pretty) {
    formats.push(wFormat.prettyPrint(c.colorize ? { colorize: c.colorize } : { colorize: true }));
  }

  return wCreateLogger({
    level: c.level,
    ...(c.customLevelsOrder ? { levels: CUSTOM_LEVELS_ORDER } : {}),
    format: wFormat.combine(...formats),
    transports: [new transports.Console()],
    silent: c.level === LoggerLevel.Silent,
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
