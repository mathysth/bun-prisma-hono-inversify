import { SERVICE_IDENTIFIER } from "@config/ioc/service-identifier";
import { inject, injectable } from "inversify";
import { UserController } from "./user";

export interface IController {
  // Where root will be loaded
  setup(): void;
}

@injectable()
export class ControllerRoot implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.Controller) private userController: UserController
  ) { }

  public setup() {
    this.userController.setup();
  }
}