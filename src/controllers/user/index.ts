import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { createRoute, z } from '@hono/zod-openapi';
import { inject, injectable } from 'inversify';
import { IController } from '..';
import { App } from '@libs/core/server';
import {
  ReasonPhrases,
  StatusCodes
} from 'http-status-codes';

@injectable()
export class UserController implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.App) private server: App,
  ) { }

  public setup(): void {
    this.server.hono.openapi(
      createRoute({
        method: 'get',
        path: '/user',
        responses: {
          200: {
            description: 'Respond a message',
            content: {
              'application/json': {
                schema: z.object({
                  message: z.string(),
                }),
              },
            },
          },
        },
      }),
      (c) => {
        c.status(StatusCodes.OK);
        return c.json({
          message: ReasonPhrases.OK,
        });
      }
    );
  }

}

