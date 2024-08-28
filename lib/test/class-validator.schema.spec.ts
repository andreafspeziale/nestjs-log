import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { LoggerSchema } from '../class-validator';

describe('OSLocalSchema (spec)', () => {
  [
    {
      description: 'Should fail if LOGGER_CUSTOM_LEVELS cannot be parsed',
      scenarios: [
        {
          env: {
            LOGGER_CUSTOM_LEVELS_ORDER: 'whatever',
          },
          expected: [
            {
              property: 'LOGGER_CUSTOM_LEVELS_ORDER',
              constraints: {
                isBoolean: 'LOGGER_CUSTOM_LEVELS_ORDER must be a boolean value',
              },
            },
          ],
        },
      ],
    },
  ].forEach(({ description, scenarios }) =>
    scenarios.forEach(({ env, expected }) =>
      it(`${description}`, async () => {
        const envSchemaInstance = plainToInstance(LoggerSchema, env);

        const errors = validateSync(envSchemaInstance);

        errors.forEach((e, i) => {
          expect(e.property).toBe(expected[i]?.property);
          expect(e.constraints).toEqual(expected[i]?.constraints);
        });
      }),
    ),
  );
});