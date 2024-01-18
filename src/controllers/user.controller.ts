import { inject, injectable } from "inversify";
import { IController } from ".";
import { TYPES } from "../config/inversify/inversify.type";
import { App } from "../libs/server/server";


@injectable()
export class UserController implements IController {
  constructor(
    @inject(TYPES.App) private server: App
  ) { }

  public setup() {
    this.server.hono.get('/', (c) => {
      return c.text('salut');
    });
  }
}

