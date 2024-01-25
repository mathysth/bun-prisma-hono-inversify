import { Config } from '@config/config';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { ControllerRoot } from '@controller/index';
import { UserController } from '@controller/user';
import { AppLogger } from '@libs/core/logger';
import { App } from '@libs/core/server';
import { Container } from 'inversify';

export function bindContainer(container: Container): void {
  /* #region Singleton Class */
  container.bind<App>(SERVICE_IDENTIFIER.App).to(App).inSingletonScope();
  container.bind<Config>(SERVICE_IDENTIFIER.Config).to(Config).inSingletonScope();
  container.bind<AppLogger>(SERVICE_IDENTIFIER.Logger).to(AppLogger).inSingletonScope();
  /* #endregion */

  /* #region Controller */
  container.bind<ControllerRoot>(SERVICE_IDENTIFIER.ControllerRoot).to(ControllerRoot);
  container.bind<UserController>(SERVICE_IDENTIFIER.Controller).to(UserController);
  /* #endregion */
}
