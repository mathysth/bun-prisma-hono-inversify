import { iocContainer } from '@config/ioc/container';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { Context } from 'hono';
import { AppLogger } from '../logger';

export function isContextDefined(ctx: Context | undefined): void | Error {
  if (ctx) return;
  const appLogger = iocContainer.get<AppLogger>(SERVICE_IDENTIFIER.Logger);
  appLogger.pino.error(new Error('Context is not defined'));
}
