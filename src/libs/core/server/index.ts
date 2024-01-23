import { OpenAPIHono } from '@hono/zod-openapi';
import { Env } from 'hono';
import { injectable } from 'inversify';

@injectable()
export class App {
  private _hono = new OpenAPIHono();
  get hono(): OpenAPIHono<Env, {}, '/'> {
    return this._hono;
  }
}
