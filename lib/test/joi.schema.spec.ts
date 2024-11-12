import { loggerSchema } from '../joi';
import {
  JOI_LOGGER_COLORIZE,
  JOI_LOGGER_CUSTOM_LEVELS_ORDER,
  JOI_LOGGER_EXCLUDE,
  JOI_LOGGER_PRETTY,
  JOI_LOGGER_REDACT,
  LOGGER_LEVEL,
} from '../logger.defaults';
import { LoggerLevel } from '../logger.interfaces';

describe('joi: loggerSchema (spec)', () => {
  // Joi type coercion by default
  // Fails asap
  [
    {
      description: 'Should fail if LOGGER_LEVEL is unknown',
      env: {
        LOGGER_LEVEL: 'whatever',
      },
      expected: `"LOGGER_LEVEL" must be one of [${Object.values(LoggerLevel).join(', ')}]`,
    },
    {
      description: 'Should fail if LOGGER_CUSTOM_LEVELS_ORDER is not a valid bool',
      env: {
        LOGGER_CUSTOM_LEVELS_ORDER: 'whatever',
      },
      expected: '"LOGGER_CUSTOM_LEVELS_ORDER" must be a boolean',
    },
    {
      description: 'Should fail if LOGGER_PRETTY is not a valid bool',
      env: {
        LOGGER_PRETTY: 'whatever',
      },
      expected: '"LOGGER_PRETTY" must be a boolean',
    },
    {
      description: 'Should fail if LOGGER_COLORIZE is not a valid bool',
      env: {
        LOGGER_COLORIZE: 'whatever',
      },
      expected: '"LOGGER_COLORIZE" must be a boolean',
    },
    {
      description: 'Should fail if LOGGER_REDACT is invalid',
      env: {
        LOGGER_REDACT: 'whatever,',
      },
      expected: undefined,
    },
    {
      description: 'Should fail if LOGGER_EXCLUDE is invalid',
      env: {
        LOGGER_EXCLUDE: 'whatever,',
      },
      expected: undefined,
    },
  ].forEach(({ description, env, expected }) =>
    it(`${description}`, () => {
      const r = loggerSchema.validate(env);

      expect(r.error?.details[0]?.message).toStrictEqual(expected);
    }),
  );

  [
    {
      description: 'Should NOT fail if NO env is provided',
      env: {},
      expected: {
        LOGGER_LEVEL: LOGGER_LEVEL,
        LOGGER_CUSTOM_LEVELS_ORDER: JOI_LOGGER_CUSTOM_LEVELS_ORDER,
        LOGGER_PRETTY: JOI_LOGGER_PRETTY,
        LOGGER_COLORIZE: JOI_LOGGER_COLORIZE,
        LOGGER_REDACT: JOI_LOGGER_REDACT,
        LOGGER_EXCLUDE: JOI_LOGGER_EXCLUDE,
      },
    },
    {
      description: 'Should NOT fail if LOGGER_CUSTOM_LEVELS_ORDER is a valid bool string',
      env: {
        LOGGER_CUSTOM_LEVELS_ORDER: 'true',
      },
      expected: {
        LOGGER_LEVEL: LOGGER_LEVEL,
        LOGGER_CUSTOM_LEVELS_ORDER: true,
        LOGGER_PRETTY: JOI_LOGGER_PRETTY,
        LOGGER_COLORIZE: JOI_LOGGER_COLORIZE,
        LOGGER_REDACT: JOI_LOGGER_REDACT,
        LOGGER_EXCLUDE: JOI_LOGGER_EXCLUDE,
      },
    },
    {
      description: 'Should fail if LOGGER_PRETTY is a valid bool string',
      env: {
        LOGGER_PRETTY: 'false',
      },
      expected: {
        LOGGER_LEVEL: LOGGER_LEVEL,
        LOGGER_CUSTOM_LEVELS_ORDER: JOI_LOGGER_CUSTOM_LEVELS_ORDER,
        LOGGER_PRETTY: false,
        LOGGER_COLORIZE: JOI_LOGGER_COLORIZE,
        LOGGER_REDACT: JOI_LOGGER_REDACT,
        LOGGER_EXCLUDE: JOI_LOGGER_EXCLUDE,
      },
    },
    {
      description: 'Should fail if LOGGER_COLORIZE is a valid bool string',
      env: {
        LOGGER_COLORIZE: 'false',
      },
      expected: {
        LOGGER_LEVEL: LOGGER_LEVEL,
        LOGGER_CUSTOM_LEVELS_ORDER: JOI_LOGGER_CUSTOM_LEVELS_ORDER,
        LOGGER_PRETTY: JOI_LOGGER_PRETTY,
        LOGGER_COLORIZE: false,
        LOGGER_REDACT: JOI_LOGGER_REDACT,
        LOGGER_EXCLUDE: JOI_LOGGER_EXCLUDE,
      },
    },
    {
      description: 'Should NOT fail if LOGGER_REDACT is an empty string',
      env: {
        LOGGER_REDACT: '',
      },
      expected: {
        LOGGER_LEVEL: LOGGER_LEVEL,
        LOGGER_CUSTOM_LEVELS_ORDER: JOI_LOGGER_CUSTOM_LEVELS_ORDER,
        LOGGER_PRETTY: JOI_LOGGER_PRETTY,
        LOGGER_COLORIZE: JOI_LOGGER_COLORIZE,
        LOGGER_REDACT: JOI_LOGGER_REDACT,
        LOGGER_EXCLUDE: JOI_LOGGER_EXCLUDE,
      },
    },
    {
      description: 'Should NOT fail if LOGGER_EXCLUDE is an empty string',
      env: {
        LOGGER_EXCLUDE: '',
      },
      expected: {
        LOGGER_LEVEL: LOGGER_LEVEL,
        LOGGER_CUSTOM_LEVELS_ORDER: JOI_LOGGER_CUSTOM_LEVELS_ORDER,
        LOGGER_PRETTY: JOI_LOGGER_PRETTY,
        LOGGER_COLORIZE: JOI_LOGGER_COLORIZE,
        LOGGER_REDACT: JOI_LOGGER_REDACT,
        LOGGER_EXCLUDE: JOI_LOGGER_EXCLUDE,
      },
    },
  ].forEach(({ description, env, expected }) =>
    it(`${description}`, () => {
      const r = loggerSchema.validate(env);

      expect(r.value).toStrictEqual(expected);
      expect(r.error?.details).toStrictEqual(undefined);
    }),
  );
});
