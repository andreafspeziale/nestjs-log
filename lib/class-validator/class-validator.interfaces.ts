import { LoggerLevel } from '../logger.interfaces';

export interface ILoggerSchema {
  LOGGER_LEVEL?: LoggerLevel;
  LOGGER_REQ_ID?: boolean;
  LOGGER_CUSTOM_LEVELS_HIERARCHY?: boolean;
  LOGGER_PRETTY?: boolean;
  LOGGER_REDACT?: string[];
  LOGGER_IGNORE_ROUTES?: string[];
}
