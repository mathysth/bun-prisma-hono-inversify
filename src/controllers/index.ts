import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../config/inversify/inversify.type";
import { UserController } from "./user.controller";

export abstract class ControllerAbsract {
  // Where root will be loaded
  public setup(): void { };
  private get(): void { };
  private post(): void { };
  private update(): void { };
  private patch(): void { };
}

@injectable()
export class ControllerRoot {
  constructor(
    @inject(TYPES.Controller) private cc: UserController
  ) { }

  public setup() {
    this.cc.setup();
  }
}