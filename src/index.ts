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
import { swaggerUI } from '@hono/swagger-ui';

// Initialize Hono
const app = iocContainer.get<App>(SERVICE_IDENTIFIER.App).hono;
// Initialize Config
const config = iocContainer.get<Config>(SERVICE_IDENTIFIER.Config);
config.validateEnv();
// Initialize Logger
const appLogger = iocContainer.get<AppLogger>(SERVICE_IDENTIFIER.Logger);

const env = config.get<ENV_ENUM>('ENV');
if (env === ENV_ENUM.DEV) {
  // Setup Logger for Hono
  const customLogger = (message: any, ...rest: string[]) => {
    appLogger.pino.info(message, ...rest);
  };
  app.use('*', logger(customLogger));

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

if (env === ENV_ENUM.PROD) {
  const origin = ['https://mydomains.com'];
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
}

// Setup all routes
const controllerRoot = iocContainer.get<ControllerRoot>(SERVICE_IDENTIFIER.ControllerRoot);
controllerRoot.setup();

// Set the default port to 3000, or use the PORT environment variable
const port = config.get<number>('PORT');

appLogger.pino.info(`Hono 🥟 Server Listening on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
