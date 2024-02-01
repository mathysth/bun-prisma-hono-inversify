
import { inject, injectable } from 'inversify';
import { z } from 'zod';
import { IController } from '..';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { App } from '@libs/core/server';
import { Controller } from '@libs/decorators/controller';
import * as hono from 'hono';
import { isContextDefined } from '@libs/core/helpers/context';

@injectable()
export class PostsController implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.App) private server: App,
  ) { }

  @Controller({
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
  })
  public setup(ctx?: hono.Context): any {
    isContextDefined(ctx);
    if (ctx) {
      return ctx.json({
        age: 20,
        name: 'body: hello',
      });
    };
  }

}

