import { z } from 'zod';
import { LoggerLevel } from '../logger.interfaces';
import {
  LOGGER_LEVEL,
  ZOD_LOGGER_PRETTY,
  ZOD_LOGGER_CUSTOM_LEVELS_ORDER,
} from '../logger.defaults';

export const loggerSchema = z.object({
  LOGGER_LEVEL: z.nativeEnum(LoggerLevel).default(LOGGER_LEVEL),
  LOGGER_CUSTOM_LEVELS_ORDER: z
    .enum(['true', 'false'])
    .transform((value) => value === 'true')
    .optional()
    .default(ZOD_LOGGER_CUSTOM_LEVELS_ORDER),
  LOGGER_PRETTY: z
    .enum(['true', 'false'])
    .transform((value) => value === 'true')
    .optional()
    .default(ZOD_LOGGER_PRETTY),
  LOGGER_REDACT: z.preprocess((val) => (val as string).split(','), z.string().array()).optional(),
});
