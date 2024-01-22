import { TYPES } from "@config/ioc/types";
import { inject, injectable } from "inversify";
import { UserController } from "./user";

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