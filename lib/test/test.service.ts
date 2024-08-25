import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  InjectLogger,
  InjectLoggerModuleOptions,
  LoggerModuleOptions,
  LoggerService,
  LoggerClient,
} from '../';

@Injectable()
export class TestService {
  constructor(
    @InjectLoggerModuleOptions()
    private readonly loggerModuleOptions: LoggerModuleOptions,
    @InjectLogger() private readonly loggerClient: LoggerClient,
    @Inject(forwardRef(() => LoggerService))
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(TestService.name);
  }

  getConfig(): LoggerModuleOptions {
    return this.loggerModuleOptions;
  }

  getClient(): LoggerClient {
    return this.loggerClient;
  }

  getService(): LoggerService {
    return this.logger;
  }
}
