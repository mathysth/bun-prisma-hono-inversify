import { Config } from '@config/config';
import { ControllerRoot } from '@controller/index';
import { UserController } from '@controller/user';
import { Container } from 'inversify';
import { SERVICE_IDENTIFIER } from './service-identifier';
import { AppLogger } from '@libs/core/logger';
import { App } from '@libs/core/server';

const iocContainer = new Container();
/* #region Singleton Class */
iocContainer.bind<App>(SERVICE_IDENTIFIER.App).to(App).inSingletonScope();
iocContainer.bind<Config>(SERVICE_IDENTIFIER.Config).to(Config).inSingletonScope();
iocContainer.bind<AppLogger>(SERVICE_IDENTIFIER.Logger).to(AppLogger).inSingletonScope();
/* #endregion */

/* #region Controller */
iocContainer.bind<ControllerRoot>(SERVICE_IDENTIFIER.ControllerRoot).to(ControllerRoot);
iocContainer.bind<UserController>(SERVICE_IDENTIFIER.Controller).to(UserController);
/* #endregion */

export { iocContainer };
