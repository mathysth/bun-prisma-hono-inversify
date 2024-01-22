import { SERVICE_IDENTIFIER } from "@config/ioc/service-identifier";
import { createRoute, z } from "@hono/zod-openapi";
import { inject, injectable } from "inversify";
import { IController } from "..";
import { Config } from '@config/config';
import { App } from '@libs/core/server';

@injectable()
export class UserController implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.App) private server: App,
    @inject(SERVICE_IDENTIFIER.Config) private config: Config
  ) { }

  public setup() {
    this.server.hono.openapi(
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
  }

}

