import 'reflect-metadata';
import { AppLogger } from '.';
import { Container } from 'inversify';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { bindContainer } from '@config/utils/container';
import { expect, describe, it, beforeAll } from 'bun:test';

describe('AppLogger', () => {
  const container = new Container();

  beforeAll(() => {
    bindContainer(container);
  });

  it('Should initialize pino', () => {
    const appLogger = container.get<AppLogger>(SERVICE_IDENTIFIER.Logger);
    expect(appLogger.pino).toBeDefined();
    expect(appLogger.config).toBeDefined();
  });
});
