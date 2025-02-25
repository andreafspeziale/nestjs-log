import { IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { LoggerLevel } from '../logger.interfaces';
import {
  CLASS_VALIDATOR_LOGGER_PRETTY,
  CLASS_VALIDATOR_LOGGER_CUSTOM_LEVELS_ORDER,
  CLASS_VALIDATOR_LOGGER_REDACT,
  CLASS_VALIDATOR_LOGGER_EXCLUDE,
  CLASS_VALIDATOR_LOGGER_COLORIZE,
} from '../logger.defaults';
import { ILoggerSchema } from './class-validator.interfaces';

export class LoggerSchema implements ILoggerSchema {
  @IsOptional()
  @IsEnum(LoggerLevel)
  LOGGER_LEVEL?: LoggerLevel = LoggerLevel.Debug;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }: { value: string }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  LOGGER_CUSTOM_LEVELS_ORDER?: boolean = CLASS_VALIDATOR_LOGGER_CUSTOM_LEVELS_ORDER;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }: { value: string }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  LOGGER_PRETTY?: boolean = CLASS_VALIDATOR_LOGGER_PRETTY;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }: { value: string }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  LOGGER_COLORIZE?: boolean = CLASS_VALIDATOR_LOGGER_COLORIZE;

  @IsOptional()
  @Transform(({ value }: { value: string }) => (Array.isArray(value) ? value : value.split(',')), {
    toClassOnly: true,
  })
  LOGGER_REDACT?: string[] = CLASS_VALIDATOR_LOGGER_REDACT;

  @IsOptional()
  @Transform(({ value }: { value: string }) => (Array.isArray(value) ? value : value.split(',')), {
    toClassOnly: true,
  })
  LOGGER_EXCLUDE?: string[] = CLASS_VALIDATOR_LOGGER_EXCLUDE;
}
