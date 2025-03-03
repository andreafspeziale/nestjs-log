import { ModuleMetadata, Type } from '@nestjs/common';
import { Logger as WLogger } from 'winston';

export type LoggerClient = WLogger;

export enum LoggerLevel {
  Silent = 'silent',
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Http = 'http',
  Verbose = 'verbose',
  Debug = 'debug',
}

export interface LogMetadata {
  fn: string;
  [key: string]: unknown;
}

export type LogLevel = Exclude<LoggerLevel, LoggerLevel.Silent>;

export interface LogInfo extends LogMetadata {
  context: string;
  reqId?: string;
  level: LogLevel;
  message: string;
  timestamp: string;
}

export interface LoggerModuleOptions {
  level?: LoggerLevel;
  customLevelsOrder?: boolean;
  pretty?: boolean;
  colorize?: boolean;
  redact?: string[];
  exclude?: string[];
}

export interface LoggerConfig {
  logger?: LoggerModuleOptions;
}

export interface LoggerModuleOptionsFactory {
  createLoggerModuleOptions(): Promise<LoggerModuleOptions> | LoggerModuleOptions;
}

export interface LoggerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<LoggerModuleOptionsFactory>;
  useClass?: Type<LoggerModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<LoggerModuleOptions> | LoggerModuleOptions;
  inject?: any[];
}
