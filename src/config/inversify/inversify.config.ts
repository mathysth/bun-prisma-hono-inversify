import { Container } from "inversify";
import { ControllerRoot } from "../../controllers";
import { UserController } from "../../controllers/user.controller";
import { App } from "../../libs/server/server";
import { TYPES } from "./inversify.type";

const iocContainer = new Container();
iocContainer.bind<App>(TYPES.App).to(App).inSingletonScope();
iocContainer.bind<UserController>(TYPES.Controller).to(UserController);
iocContainer.bind<ControllerRoot>(TYPES.ControllerRoot).to(ControllerRoot);

export { iocContainer };
