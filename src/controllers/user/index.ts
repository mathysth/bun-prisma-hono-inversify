import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { z } from '@hono/zod-openapi';
import { inject, injectable } from 'inversify';
import { IController } from '..';
import { App } from '@libs/core/server';
import { Controller } from '@libs/decorators/controller';
import * as hono from 'hono';
import { isContextDefined } from '@libs/core/helpers/context';

@injectable()
export class UserController implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.App) private server: App,
  ) { }

  @Controller({
    method: 'post',
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
  })
  public async setup(ctx?: hono.Context): Promise<any> {
    isContextDefined(ctx);
    if (ctx) {
      const body = await ctx.req.raw.json();
      return ctx.json({
        age: 20,
        name: `body: ${body}`,
      });
    };

  }
}
