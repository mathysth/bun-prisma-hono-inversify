import { inject, injectable } from "inversify";
import { TYPES } from "../config/inversify/inversify.type";
import { UserController } from "./user.controller";

export interface IController {
  // Where root will be loaded
  setup(): void;
}

@injectable()
export class ControllerRoot {
  constructor(
    @inject(TYPES.Controller) private cc: UserController
  ) {
    console.log(this.cc);
  }

  public test() {
    this.cc.setup();
  }
}