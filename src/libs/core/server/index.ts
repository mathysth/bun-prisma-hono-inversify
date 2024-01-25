import { Env } from 'hono';
import { OpenAPIHono } from '@hono/zod-openapi';
import { injectable } from 'inversify';

@injectable()
export class App {
  private _hono = new OpenAPIHono();
  get hono(): OpenAPIHono<Env, {}, '/'> {
    return this._hono;
  }
}
