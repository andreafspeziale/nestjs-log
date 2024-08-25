import { Test } from '@nestjs/testing';
import { LoggerService, LoggerModule, LoggerLevel } from '..';

describe('LoggerService (spec)', () => {
  let loggerService: LoggerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        LoggerModule.forRoot({
          level: LoggerLevel.Silent,
          pretty: false,
          redact: ['password'],
        }),
      ],
    }).compile();

    loggerService = await moduleRef.resolve<LoggerService>(LoggerService);
  });

  describe('log', () => {
    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message THEN calls logger.info with the proper arguments`, () => {
      const info = jest.spyOn(loggerService['logger'], 'info');

      loggerService.setContext('LoggerService');
      loggerService.log('Info message');

      expect(info).toHaveBeenCalledTimes(1);
      expect(info).toHaveBeenNthCalledWith(1, 'Info message', {
        context: 'LoggerService',
      });
    });

    it(`GIVEN a transient-scoped instance AND no instance context
        WHEN it receives a message THEN calls logger.info with the proper arguments`, () => {
      const info = jest.spyOn(loggerService['logger'], 'info');

      loggerService.log('Info message');

      expect(info).toHaveBeenCalledTimes(1);
      expect(info).toHaveBeenNthCalledWith(1, 'Info message', {
        context: 'N/A',
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message and a context THEN calls logger.info with the proper arguments`, () => {
      const info = jest.spyOn(loggerService['logger'], 'info');

      loggerService.setContext('LoggerService');
      loggerService.log('Info message', 'Log');

      expect(info).toHaveBeenCalledTimes(1);
      expect(info).toHaveBeenNthCalledWith(1, 'Info message', {
        context: 'LoggerService:Log',
      });
    });

    it(`GIVEN a transient-scoped instance AND no instance context
        WHEN it receives a message and a context THEN calls logger.info with the proper arguments`, () => {
      const info = jest.spyOn(loggerService['logger'], 'info');

      loggerService.log('Info message', 'LoggerService:Log');

      expect(info).toHaveBeenCalledTimes(1);
      expect(info).toHaveBeenNthCalledWith(1, 'Info message', {
        context: 'LoggerService:Log',
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message and metadata THEN calls logger.info with the proper arguments`, () => {
      const info = jest.spyOn(loggerService['logger'], 'info');
      const metadata = {
        fn: 'log',
        data: { foo: 42 },
      };

      loggerService.setContext('LoggerService');
      loggerService.log('Info message', metadata);

      expect(info).toHaveBeenCalledTimes(1);
      expect(info).toHaveBeenNthCalledWith(1, 'Info message', {
        context: 'LoggerService',
        ...metadata,
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message, metadata and a context THEN calls logger.info with the proper arguments`, () => {
      const info = jest.spyOn(loggerService['logger'], 'info');
      const metadata = {
        fn: 'log',
        data: { foo: 42 },
      };

      loggerService.setContext('LoggerService');
      loggerService.log('Info message', metadata, 'Log');

      expect(info).toHaveBeenCalledTimes(1);
      expect(info).toHaveBeenNthCalledWith(1, 'Info message', {
        context: 'LoggerService:Log',
        ...metadata,
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context AND a config array of properties to redact
        WHEN it receives a message and metadata with sensitive information
        THEN hides the sensitive data AND calls logger.info with the proper arguments`, () => {
      const info = jest.spyOn(loggerService['logger'], 'info');
      const metadata = {
        fn: 'log',
        data: {
          email: 'john.doe@test.com',
          password: 'secret',
        },
      };

      loggerService.setContext('LoggerService');
      loggerService.log('Info message', metadata);

      expect(info).toHaveBeenCalledTimes(1);
      expect(info).toHaveBeenNthCalledWith(1, 'Info message', {
        context: 'LoggerService',
        ...metadata,
        data: {
          email: 'john.doe@test.com',
          password: '*******',
        },
      });
    });
  });

  describe('error', () => {
    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message THEN calls logger.error with the proper arguments`, () => {
      const error = jest.spyOn(loggerService['logger'], 'error');

      loggerService.setContext('LoggerService');
      loggerService.error('Error message');

      expect(error).toHaveBeenCalledTimes(1);
      expect(error).toHaveBeenNthCalledWith(1, 'Error message', {
        context: 'LoggerService',
      });
    });

    it(`GIVEN a transient-scoped instance AND no instance context
        WHEN it receives a message THEN calls logger.error with the proper arguments`, () => {
      const error = jest.spyOn(loggerService['logger'], 'error');

      loggerService.error('Error message');

      expect(error).toHaveBeenCalledTimes(1);
      expect(error).toHaveBeenNthCalledWith(1, 'Error message', {
        context: 'N/A',
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message and an error stack THEN calls logger.error with the proper arguments`, () => {
      const error = jest.spyOn(loggerService['logger'], 'error');

      loggerService.setContext('LoggerService');
      loggerService.error('Error message', 'Error stack');

      expect(error).toHaveBeenCalledTimes(1);
      expect(error).toHaveBeenNthCalledWith(1, 'Error message', {
        context: 'LoggerService',
        stack: ['Error stack'],
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message, an error stack and a context THEN calls logger.error with the proper arguments`, () => {
      const error = jest.spyOn(loggerService['logger'], 'error');

      loggerService.setContext('LoggerService');
      loggerService.error('Error message', 'Error stack', 'Error');

      expect(error).toHaveBeenCalledTimes(1);
      expect(error).toHaveBeenNthCalledWith(1, 'Error message', {
        context: 'LoggerService:Error',
        stack: ['Error stack'],
      });
    });

    it(`GIVEN a transient-scoped instance AND no instance context
        WHEN it receives a message, an error stack and a context THEN calls logger.error with the proper arguments`, () => {
      const error = jest.spyOn(loggerService['logger'], 'error');

      loggerService.error('Error message', 'Error stack', 'LoggerService:Error');

      expect(error).toHaveBeenCalledTimes(1);
      expect(error).toHaveBeenNthCalledWith(1, 'Error message', {
        context: 'LoggerService:Error',
        stack: ['Error stack'],
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message and metadata THEN calls logger.error with the proper arguments`, () => {
      const error = jest.spyOn(loggerService['logger'], 'error');
      const metadata = {
        fn: 'error',
        data: { foo: 42 },
      };

      loggerService.setContext('LoggerService');
      loggerService.error('Error message', metadata);

      expect(error).toHaveBeenCalledTimes(1);
      expect(error).toHaveBeenNthCalledWith(1, 'Error message', {
        context: 'LoggerService',
        ...metadata,
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message, metadata and an error stack THEN calls logger.error with the proper arguments`, () => {
      const error = jest.spyOn(loggerService['logger'], 'error');
      const metadata = {
        fn: 'error',
        data: { foo: 42 },
      };

      loggerService.setContext('LoggerService');
      loggerService.error('Error message', metadata, 'Error stack');

      expect(error).toHaveBeenCalledTimes(1);
      expect(error).toHaveBeenNthCalledWith(1, 'Error message', {
        context: 'LoggerService',
        ...metadata,
        stack: ['Error stack'],
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message, metadata, an error stack and a context THEN calls logger.error with the proper arguments`, () => {
      const error = jest.spyOn(loggerService['logger'], 'error');
      const metadata = {
        fn: 'error',
        data: { foo: 42 },
      };

      loggerService.setContext('LoggerService');
      loggerService.error('Error message', metadata, 'Error stack', 'Error');

      expect(error).toHaveBeenCalledTimes(1);
      expect(error).toHaveBeenNthCalledWith(1, 'Error message', {
        context: 'LoggerService:Error',
        ...metadata,
        stack: ['Error stack'],
      });
    });
  });

  describe('warn', () => {
    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message THEN calls logger.warn with the proper arguments`, () => {
      const warn = jest.spyOn(loggerService['logger'], 'warn');

      loggerService.setContext('LoggerService');
      loggerService.warn('Warn message');

      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn).toHaveBeenNthCalledWith(1, 'Warn message', {
        context: 'LoggerService',
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message and a context THEN calls logger.warn with the proper arguments`, () => {
      const warn = jest.spyOn(loggerService['logger'], 'warn');

      loggerService.setContext('LoggerService');
      loggerService.warn('Warn message', 'Warn');

      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn).toHaveBeenNthCalledWith(1, 'Warn message', {
        context: 'LoggerService:Warn',
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message and metadata THEN calls logger.warn with the proper arguments`, () => {
      const warn = jest.spyOn(loggerService['logger'], 'warn');
      const metadata = {
        fn: 'warn',
        data: { foo: 42 },
      };

      loggerService.setContext('LoggerService');
      loggerService.warn('Warn message', metadata);

      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn).toHaveBeenNthCalledWith(1, 'Warn message', {
        context: 'LoggerService',
        ...metadata,
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message, metadata and a context THEN calls logger.warn with the proper arguments`, () => {
      const warn = jest.spyOn(loggerService['logger'], 'warn');
      const metadata = {
        fn: 'warn',
        data: { foo: 42 },
      };

      loggerService.setContext('LoggerService');
      loggerService.warn('Warn message', metadata, 'Warn');

      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn).toHaveBeenNthCalledWith(1, 'Warn message', {
        context: 'LoggerService:Warn',
        ...metadata,
      });
    });
  });

  describe('http', () => {
    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message THEN calls logger.http with the proper arguments`, () => {
      const http = jest.spyOn(loggerService['logger'], 'http');

      loggerService.setContext('LoggerService');
      loggerService.http('Http message');

      expect(http).toHaveBeenCalledTimes(1);
      expect(http).toHaveBeenNthCalledWith(1, 'Http message', {
        context: 'LoggerService',
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message and a context THEN calls logger.http with the proper arguments`, () => {
      const http = jest.spyOn(loggerService['logger'], 'http');

      loggerService.setContext('LoggerService');
      loggerService.http('Http message', 'Http');

      expect(http).toHaveBeenCalledTimes(1);
      expect(http).toHaveBeenNthCalledWith(1, 'Http message', {
        context: 'LoggerService:Http',
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message and metadata THEN calls logger.http with the proper arguments`, () => {
      const http = jest.spyOn(loggerService['logger'], 'http');
      const metadata = {
        fn: 'http',
        data: { foo: 42 },
      };

      loggerService.setContext('LoggerService');
      loggerService.http('Http message', metadata);

      expect(http).toHaveBeenCalledTimes(1);
      expect(http).toHaveBeenNthCalledWith(1, 'Http message', {
        context: 'LoggerService',
        ...metadata,
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message, metadata and a context THEN calls logger.http with the proper arguments`, () => {
      const http = jest.spyOn(loggerService['logger'], 'http');
      const metadata = {
        fn: 'http',
        data: { foo: 42 },
      };

      loggerService.setContext('LoggerService');
      loggerService.http('Http message', metadata, 'Http');

      expect(http).toHaveBeenCalledTimes(1);
      expect(http).toHaveBeenNthCalledWith(1, 'Http message', {
        context: 'LoggerService:Http',
        ...metadata,
      });
    });
  });

  describe('verbose', () => {
    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message THEN calls logger.verbose with the proper arguments`, () => {
      const verbose = jest.spyOn(loggerService['logger'], 'verbose');

      loggerService.setContext('LoggerService');
      loggerService.verbose('Verbose message');

      expect(verbose).toHaveBeenCalledTimes(1);
      expect(verbose).toHaveBeenNthCalledWith(1, 'Verbose message', {
        context: 'LoggerService',
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message and a context THEN calls logger.verbose with the proper arguments`, () => {
      const verbose = jest.spyOn(loggerService['logger'], 'verbose');

      loggerService.setContext('LoggerService');
      loggerService.verbose('Verbose message', 'Verbose');

      expect(verbose).toHaveBeenCalledTimes(1);
      expect(verbose).toHaveBeenNthCalledWith(1, 'Verbose message', {
        context: 'LoggerService:Verbose',
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message and metadata THEN calls logger.verbose with the proper arguments`, () => {
      const verbose = jest.spyOn(loggerService['logger'], 'verbose');
      const metadata = {
        fn: 'verbose',
        data: { foo: 42 },
      };

      loggerService.setContext('LoggerService');
      loggerService.verbose('Verbose message', metadata);

      expect(verbose).toHaveBeenCalledTimes(1);
      expect(verbose).toHaveBeenNthCalledWith(1, 'Verbose message', {
        context: 'LoggerService',
        ...metadata,
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message, metadata and a context THEN calls logger.verbose with the proper arguments`, () => {
      const verbose = jest.spyOn(loggerService['logger'], 'verbose');
      const metadata = {
        fn: 'verbose',
        data: { foo: 42 },
      };

      loggerService.setContext('LoggerService');
      loggerService.verbose('Verbose message', metadata, 'Verbose');

      expect(verbose).toHaveBeenCalledTimes(1);
      expect(verbose).toHaveBeenNthCalledWith(1, 'Verbose message', {
        context: 'LoggerService:Verbose',
        ...metadata,
      });
    });
  });

  describe('debug', () => {
    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message THEN calls logger.debug with the proper arguments`, () => {
      const debug = jest.spyOn(loggerService['logger'], 'debug');

      loggerService.setContext('LoggerService');
      loggerService.debug('Debug message');

      expect(debug).toHaveBeenCalledTimes(1);
      expect(debug).toHaveBeenNthCalledWith(1, 'Debug message', {
        context: 'LoggerService',
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message and a context THEN calls logger.debug with the proper arguments`, () => {
      const debug = jest.spyOn(loggerService['logger'], 'debug');

      loggerService.setContext('LoggerService');
      loggerService.debug('Debug message', 'Debug');

      expect(debug).toHaveBeenCalledTimes(1);
      expect(debug).toHaveBeenNthCalledWith(1, 'Debug message', {
        context: 'LoggerService:Debug',
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message and metadata THEN calls logger.debug with the proper arguments`, () => {
      const debug = jest.spyOn(loggerService['logger'], 'debug');
      const metadata = {
        fn: 'debug',
        data: { foo: 42 },
      };

      loggerService.setContext('LoggerService');
      loggerService.debug('Debug message', metadata);

      expect(debug).toHaveBeenCalledTimes(1);
      expect(debug).toHaveBeenNthCalledWith(1, 'Debug message', {
        context: 'LoggerService',
        ...metadata,
      });
    });

    it(`GIVEN a transient-scoped instance AND an instance context
        WHEN it receives a message, metadata and a context THEN calls logger.debug with the proper arguments`, () => {
      const debug = jest.spyOn(loggerService['logger'], 'debug');
      const metadata = {
        fn: 'debug',
        data: { foo: 42 },
      };

      loggerService.setContext('LoggerService');
      loggerService.debug('Debug message', metadata, 'Debug');

      expect(debug).toHaveBeenCalledTimes(1);
      expect(debug).toHaveBeenNthCalledWith(1, 'Debug message', {
        context: 'LoggerService:Debug',
        ...metadata,
      });
    });
  });
});
