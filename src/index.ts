import { swaggerUI } from "@hono/swagger-ui";
import 'dotenv/config';
import "reflect-metadata";
import { Config } from "./config/config";
import { iocContainer } from './config/ioc/config';
import { TYPES } from "./config/ioc/types";
import { ControllerRoot } from './controllers';
import { App } from './libs/server/server';
//TODO: config ESLINT (Le faire fonctionner)
// Initialize Hono
const app = iocContainer.get<App>(TYPES.App).hono;
const config = iocContainer.get<Config>(TYPES.Config);
config.validateEnv();

app.get('/swagger', swaggerUI({
  url: '/doc',
}));

app.doc("doc", {
  info: {
    title: 'An API',
    version: 'v1'
  },
  openapi: '3.1.0'
});

const test = iocContainer.get<ControllerRoot>(TYPES.ControllerRoot);
test.setup();
// Set the default port to 3000, or use the PORT environment variable
const port = process.env.PORT || 3000;

console.log(`Hono 🥟 GraphQL Server Listening on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};