import { Config } from "@config/config";
import { ControllerRoot } from "@controller/index";
import { UserController } from "@controller/user";
import { App } from "@libs/server/server";
import { Container } from "inversify";
import { TYPES } from "./types";

const iocContainer = new Container();
/* #region Singleton Class */
iocContainer.bind<App>(TYPES.App).to(App).inSingletonScope();
iocContainer.bind<Config>(TYPES.Config).to(Config).inSingletonScope();
/* #endregion */

/* #region Controller */
iocContainer.bind<ControllerRoot>(TYPES.ControllerRoot).to(ControllerRoot);
iocContainer.bind<UserController>(TYPES.Controller).to(UserController);
/* #endregion */

export { iocContainer };
