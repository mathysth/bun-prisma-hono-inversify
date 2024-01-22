import { Container } from "inversify";
import { ControllerRoot } from "../../controllers";
import { UserController } from "../../controllers/user.controller";
import { App } from "../../libs/server/server";
import { Config } from "../config";
import { TYPES } from "./types";

const iocContainer = new Container({ autoBindInjectable: true });
/* #region Singleton Class */
iocContainer.bind<App>(TYPES.App).to(App).inSingletonScope();
iocContainer.bind<Config>(TYPES.Config).to(Config).inSingletonScope();
/* #endregion */

/* #region Controller */
iocContainer.bind<ControllerRoot>(TYPES.ControllerRoot).to(ControllerRoot);
iocContainer.bind<UserController>(TYPES.Controller).to(UserController);
/* #endregion */

export { iocContainer };
