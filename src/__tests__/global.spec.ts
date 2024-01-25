import 'reflect-metadata';
import { beforeAll, describe, expect, it } from 'bun:test';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { AppLogger } from '@libs/core/logger';
import { Container } from 'inversify';
import { bindContainer } from '@config/utils/container';

/**
 * Bind class and check if inversify can resolve them
 */
describe('Binding', () => {
  const container = new Container();

  // Bind containers for every tests
  beforeAll(() => {
    bindContainer(container);
  });

  it('Should check if appLogger is binded', () => {
    const appLogger = container.get<AppLogger>(SERVICE_IDENTIFIER.Logger);
    expect(appLogger).toBeDefined();
  });
});
