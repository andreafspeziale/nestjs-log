import { DynamicModule, Global, Provider } from '@nestjs/common';
import {
  LoggerModuleAsyncOptions,
  LoggerModuleOptions,
  LoggerModuleOptionsFactory,
  LoggerClient,
} from './logger.interfaces';
import { LoggerService } from './logger.service';
import {
  createLoggerClient,
  getLoggerClientToken,
  getLoggerModuleOptionsToken,
} from './logger.utils';

@Global()
export class LoggerModule {
  public static forRoot(options: LoggerModuleOptions): DynamicModule {
    const optionsProvider: Provider = {
      provide: getLoggerModuleOptionsToken(),
      useValue: options,
    };

    const clientProvider: Provider = {
      provide: getLoggerClientToken(),
      useValue: createLoggerClient(options),
    };

    return {
      module: LoggerModule,
      providers: [optionsProvider, clientProvider, LoggerService],
      exports: [optionsProvider, clientProvider, LoggerService],
    };
  }

  static register(options: LoggerModuleOptions): DynamicModule {
    return LoggerModule.forRoot(options);
  }

  public static forRootAsync(options: LoggerModuleAsyncOptions): DynamicModule {
    const loggerClientProvider: Provider = {
      provide: getLoggerClientToken(),
      useFactory: (opts: LoggerModuleOptions): LoggerClient => createLoggerClient(opts),
      inject: [getLoggerModuleOptionsToken()],
    };

    return {
      module: LoggerModule,
      providers: [...this.createAsyncProviders(options), loggerClientProvider, LoggerService],
      exports: [...this.createAsyncProviders(options), loggerClientProvider, LoggerService],
    };
  }

  static registerAsync(options: LoggerModuleAsyncOptions): DynamicModule {
    return LoggerModule.forRootAsync(options);
  }

  private static createAsyncProviders(options: LoggerModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    if (options.useClass === undefined) {
      throw new Error('Options "useClass" is undefined');
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: LoggerModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: getLoggerModuleOptionsToken(),
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    if (options.useClass === undefined) {
      throw new Error('Options "useClass" is undefined');
    }

    return {
      provide: getLoggerModuleOptionsToken(),
      useFactory: async (
        optionsFactory: LoggerModuleOptionsFactory,
      ): Promise<LoggerModuleOptions> => await optionsFactory.createLoggerModuleOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
