// !!Always import reflect metadata first
import "reflect-metadata";
import 'dotenv/config';
import { App } from '@libs/core/server';
import { Config } from "@config/config";
import { ControllerRoot } from "./controllers";
import { AppLogger } from '@libs/core/logger';
import { SERVICE_IDENTIFIER } from "@config/ioc/service-identifier";
import { iocContainer } from "@config/ioc/container";
import { swaggerUI } from "@hono/swagger-ui";

//TODO: config ESLINT (Le faire fonctionner)
//TODO: ajouter un ORM

// Initialize Hono
const app = iocContainer.get<App>(SERVICE_IDENTIFIER.App).hono;
// Initialize Config
const config = iocContainer.get<Config>(SERVICE_IDENTIFIER.Config);
config.validateEnv();
// Initialize Logger
const logger = iocContainer.get<AppLogger>(SERVICE_IDENTIFIER.Logger);
// Setup swagger
app.get('/swagger', swaggerUI({
  url: '/doc',
}));

// Setup open api
app.doc("doc", {
  info: {
    title: 'Aecreator Api',
    version: 'v1',
  },
  openapi: '3.1.0'
});

// Setup all routes
const controllerRoot = iocContainer.get<ControllerRoot>(SERVICE_IDENTIFIER.ControllerRoot);
controllerRoot.setup();

// Set the default port to 3000, or use the PORT environment variable
const port = config.get<Number>('PORT');

logger.pino.info(`Hono 🥟 GraphQL Server Listening on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};