import { swaggerUI } from '@hono/swagger-ui';
import { createRoute, z } from '@hono/zod-openapi';
import { iocContainer } from './config/inversify/inversify.config';
import { TYPES } from './config/inversify/inversify.type';
import { ControllerRoot } from './controllers';
import { App } from './libs/server/server';

// Initialize Hono
const app = iocContainer.get<App>(TYPES.App).hono;
app.openapi(
  createRoute({
    method: 'get',
    path: '/hello',
    responses: {
      200: {
        description: 'Respond a message',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string()
            })
          }
        }
      }
    }
  }),
  (c) => {
    return c.jsonT({
      message: 'hello'
    });
  }
);

app.get('/ui', swaggerUI({
  url: '/doc',
}));

app.doc('/doc', {
  info: {
    title: 'An API',
    version: 'v1'
  },
  openapi: '3.1.0'
});


const test = iocContainer.get<ControllerRoot>(TYPES.ControllerRoot);
test.setup();
console.log(app);



// Set the default port to 3000, or use the PORT environment variable
const port = process.env.PORT || 3000;

console.log(`Hono 🥟 GraphQL Server Listening on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};