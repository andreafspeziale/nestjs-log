import Joi from 'joi';
import { LoggerLevel } from '../logger.interfaces';
import {
  JOI_LOGGER_COLORIZE,
  JOI_LOGGER_CUSTOM_LEVELS_ORDER,
  JOI_LOGGER_EXCLUDE,
  JOI_LOGGER_PRETTY,
  JOI_LOGGER_REDACT,
  LOGGER_LEVEL,
} from '../logger.defaults';

const customSchema = Joi.any().custom((value) =>
  value
    .split(',')
    .map((el: string) => el.trim())
    .filter((el: string) => el !== ''),
);

export const loggerSchema = Joi.object({
  LOGGER_LEVEL: Joi.string()
    .valid(...Object.values(LoggerLevel))
    .default(LOGGER_LEVEL),
  LOGGER_CUSTOM_LEVELS_ORDER: Joi.boolean().default(JOI_LOGGER_CUSTOM_LEVELS_ORDER),
  LOGGER_PRETTY: Joi.boolean().default(JOI_LOGGER_PRETTY),
  LOGGER_COLORIZE: Joi.boolean().default(JOI_LOGGER_COLORIZE),
  LOGGER_REDACT: customSchema.default(JOI_LOGGER_REDACT),
  LOGGER_EXCLUDE: customSchema.default(JOI_LOGGER_EXCLUDE),
});
