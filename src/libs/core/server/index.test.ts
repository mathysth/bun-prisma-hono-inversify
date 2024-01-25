import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { expect, describe, it, beforeAll } from 'bun:test';
import { Container } from 'inversify';
import { App } from '.';
import { bindContainer } from '@config/utils/container';

describe('App', () => {
  const container = new Container();

  beforeAll(() => {
    bindContainer(container);
  });

  it('Should initialize hono', () => {
    const app = container.get<App>(SERVICE_IDENTIFIER.App);
    expect(app.hono).toBeDefined();
  });
});
