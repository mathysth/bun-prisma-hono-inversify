
import { createRoute } from '@hono/zod-openapi';
import {
  ReasonPhrases,
  StatusCodes
} from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { z } from 'zod';
import { IController } from '..';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { App } from '@libs/core/server';

@injectable()
export class PostsController implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.App) private server: App,
  ) { }

  public setup(): void {
    this.server.hono.openapi(
      createRoute({
        method: 'get',
        path: '/posts',
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
        c.status(StatusCodes.CONFLICT);
        return c.json({
          message: ReasonPhrases.CONFLICT,
        });
      }
    );
  }

}

