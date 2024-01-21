import { TYPES } from 'config/ioc/ioc.type';
import { inject, injectable } from "inversify";
import { UserController } from "./user.controller";

export interface IController {
  // Where root will be loaded
  setup(): void;
}

@injectable()
export class ControllerRoot implements IController {
  constructor(
    @inject(TYPES.Controller) private cc: UserController
  ) { }

  public setup() {
    this.cc.setup();
  }
}