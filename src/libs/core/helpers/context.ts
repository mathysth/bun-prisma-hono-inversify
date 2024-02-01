import { Context } from 'hono';

export function isContextDefined(ctx: Context | undefined): void | Error {
  if (ctx) return;
  throw new Error('Context is not defined');
}
