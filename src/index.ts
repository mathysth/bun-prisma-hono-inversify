import { Config } from "@config/config";
import { iocContainer } from "@config/ioc/container";
import { TYPES } from "@config/ioc/types";
import { swaggerUI } from "@hono/swagger-ui";
import { App } from "@libs/server/server";
import 'dotenv/config';
import "reflect-metadata";
import { ControllerRoot } from "./controllers";
//TODO: config ESLINT (Le faire fonctionner)

// Initialize Hono
const app = iocContainer.get<App>(TYPES.App).hono;
const config = iocContainer.get<Config>(TYPES.Config);
config.validateEnv();

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
const controllerRoot = iocContainer.get<ControllerRoot>(TYPES.ControllerRoot);
controllerRoot.setup();

// Set the default port to 3000, or use the PORT environment variable
const port = process.env.PORT || 3000;

console.log(`Hono 🥟 GraphQL Server Listening on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};