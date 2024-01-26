// !!Always import reflect metadata first
import 'reflect-metadata';
import 'dotenv/config';
import { App } from '@libs/core/server';
import { AppLogger } from '@libs/core/logger';
import { Config, ENV_ENUM } from '@config/config';
import { ControllerRoot } from './controllers';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { iocContainer } from '@config/ioc/container';
import { logger } from 'hono/logger';
import { sentry } from '@hono/sentry';
import { swaggerUI } from '@hono/swagger-ui';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

// Initialize Hono
const app = iocContainer.get<App>(SERVICE_IDENTIFIER.App).hono;

// Initialize Config
const config = iocContainer.get<Config>(SERVICE_IDENTIFIER.Config);
config.validateEnv();

// Initialize Logger
const appLogger = iocContainer.get<AppLogger>(SERVICE_IDENTIFIER.Logger);

// Setup sentry
const env = config.get<ENV_ENUM>('ENV');
const sentryPrivate = config.get<string>('SENTRY_DSN');
app.use('*', sentry({
  dsn: sentryPrivate,
  tracesSampleRate: 1.0,
  environment: env,
}));

const withLog = config.get<boolean>('LOGGER');
if (withLog) {
  // Setup Logger for Hono
  const customLogger = (message: any, ...rest: string[]) => {
    appLogger.pino.info(message, ...rest);
  };
  app.use('*', logger(customLogger));
}

if (env === ENV_ENUM.DEV) {

  // Setup swagger
  app.get('/swagger', swaggerUI({
    url: '/doc',
  }));

  // Setup open api
  app.doc('doc', {
    info: {
      title: 'Aecreator Api',
      version: 'v1',
    },
    openapi: '3.1.0',
  });
}

// Setup security
const origin = config.get<string>('ORIGINS').split(',');
app.use('*',
  cors({
    origin,
  })
);
app.use(
  '*',
  csrf({
    origin,
  })
);

// Error Handling
app.onError((err, c) => {
  appLogger.pino.error(err);
  return c.text(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
});

// Setup all routes
const controllerRoot = iocContainer.getNamed<ControllerRoot>(SERVICE_IDENTIFIER.Controller, SERVICE_NAME.controllers.root);
controllerRoot.setup();

// Set the default port to 3000, or use the PORT environment variable
const port = config.get<number>('PORT');

appLogger.pino.info(`Hono 🥟 Server Listening on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
