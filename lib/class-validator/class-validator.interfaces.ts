import { LoggerLevel } from '../logger.interfaces';

export interface ILoggerSchema {
  LOGGER_LEVEL?: LoggerLevel;
  LOGGER_CUSTOM_LEVELS_HIERARCHY?: boolean;
  LOGGER_PRETTY?: boolean;
  LOGGER_COLORIZE?: boolean;
  LOGGER_REDACT?: string[];
  LOGGER_EXCLUDE?: string[];
}
