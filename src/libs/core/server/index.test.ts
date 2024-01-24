import 'reflect-metadata';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { expect, describe, it } from 'bun:test';
import { Container } from 'inversify';
import { App } from '.';

describe('App', () => {
  it('Should initialize hono', () => {
    const container = new Container();
    container.bind<App>(SERVICE_IDENTIFIER.App).to(App);
    const app = container.get<App>(SERVICE_IDENTIFIER.App);
    expect(app.hono).toBeDefined();
  });
});
