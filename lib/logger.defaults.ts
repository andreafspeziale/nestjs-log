import { LoggerLevel } from './logger.interfaces';

export const LOGGER_LEVEL = LoggerLevel.Debug;

export const ZOD_LOGGER_CUSTOM_LEVELS_ORDER = 'false';
export const ZOD_LOGGER_PRETTY = 'true';
export const ZOD_LOGGER_COLORIZE = 'true';
export const ZOD_LOGGER_REDACT = '';
export const ZOD_LOGGER_EXCLUDE = '';

export const CLASS_VALIDATOR_LOGGER_CUSTOM_LEVELS_ORDER = false;
export const CLASS_VALIDATOR_LOGGER_PRETTY = true;
export const CLASS_VALIDATOR_LOGGER_COLORIZE = true;
export const CLASS_VALIDATOR_LOGGER_REDACT = [];
export const CLASS_VALIDATOR_LOGGER_EXCLUDE = [];

export const JOI_LOGGER_CUSTOM_LEVELS_ORDER = false;
export const JOI_LOGGER_PRETTY = true;
export const JOI_LOGGER_COLORIZE = true;
export const JOI_LOGGER_REDACT = [];
export const JOI_LOGGER_EXCLUDE = [];

export const loggerModuleOptions = {
  level: LoggerLevel.Debug,
  customLevelsOrder: false,
  pretty: true,
  colorize: true,
  redact: [],
  exclude: [],
};
