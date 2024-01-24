import 'reflect-metadata';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { expect, describe, it } from 'bun:test';
import { Container } from 'inversify';
import { AppLogger } from '.';
import { Config } from '@config/config';

describe('Config', () => {
  it('Should initialize pino', () => {
    // TODO: check if it's possible to setup a global container binding before each test in the app
    const container = new Container();
    container.bind<AppLogger>(SERVICE_IDENTIFIER.Logger).to(AppLogger);
    container.bind<Config>(SERVICE_IDENTIFIER.Config).to(Config);
    const appLogger = container.get<AppLogger>(SERVICE_IDENTIFIER.Logger);
    expect(appLogger.pino).toBeDefined();
    expect(appLogger.config).toBeDefined();
  });
});
