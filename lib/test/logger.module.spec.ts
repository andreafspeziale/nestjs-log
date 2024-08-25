import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { Logger } from 'winston';
import { LoggerService, LoggerModule, LoggerConfig, LoggerLevel, LoggerModuleOptions } from '../';
import { TestService } from './test.service';

const loggerModuleoptions: LoggerModuleOptions = {
  level: LoggerLevel.Silent,
  pretty: false,
  redact: ['password'],
};

const returnConfig = (): LoggerConfig => ({ logger: loggerModuleoptions });

describe('LoggerModule (spec)', () => {
  it('Should correctly instantiate LoggerModule and LoggerService ', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [returnConfig],
        }),
        LoggerModule.forRootAsync({
          useFactory: (configService: ConfigService<LoggerConfig, true>) =>
            configService.get<LoggerModuleOptions>('logger'),
          inject: [ConfigService],
        }),
      ],
      providers: [TestService],
    }).compile();

    const loggerModule = await moduleRef.resolve(LoggerModule);
    const loggerService = await moduleRef.resolve(LoggerService);

    expect(loggerModule).toBeInstanceOf(LoggerModule);
    expect(loggerService).toBeInstanceOf(LoggerService);

    const testService = moduleRef.get(TestService);

    const loggerModuleOptions = testService.getConfig();
    const loggerClient = testService.getClient();
    const logger = testService.getService();

    expect(logger['context']).toBe('TestService');
    expect(logger).toBeInstanceOf(LoggerService);

    expect(loggerClient).toBeInstanceOf(Logger);
    expect(loggerModuleOptions).toEqual(loggerModuleOptions);
  });
});
