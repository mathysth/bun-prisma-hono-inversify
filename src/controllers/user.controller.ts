import { createRoute, z } from "@hono/zod-openapi";
import { TYPES } from "config/ioc/ioc.type";
import { inject, injectable } from "inversify";
import { IController } from ".";
import { App } from "../libs/server/server";


@injectable()
export class UserController implements IController {
  constructor(
    @inject(TYPES.App) private server: App
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

