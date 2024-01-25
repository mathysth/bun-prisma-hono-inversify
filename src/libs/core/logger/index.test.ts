import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { expect, describe, it } from 'bun:test';
import { Container } from 'inversify';
import { AppLogger } from '.';
import { Config } from '@config/config';

describe('Config', () => {
  const container = new Container();

  it('Should initialize pino', () => {
    container.bind<AppLogger>(SERVICE_IDENTIFIER.Logger).to(AppLogger);
    container.bind<Config>(SERVICE_IDENTIFIER.Config).to(Config);
    const appLogger = container.get<AppLogger>(SERVICE_IDENTIFIER.Logger);
    expect(appLogger.pino).toBeDefined();
    expect(appLogger.config).toBeDefined();
  });
});
