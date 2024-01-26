import { App } from '@libs/core/server';
import { AppLogger } from '@libs/core/logger';
import { Config } from '@config/config';
import { Container } from 'inversify';
import { ControllerRoot } from '@controller/index';
import { PostsController } from '@controller/posts';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { UserController } from '@controller/user';

export function bindContainer(container: Container): void {
  /* #region Singleton Class */
  container.bind<App>(SERVICE_IDENTIFIER.App).to(App).inSingletonScope();
  container.bind<Config>(SERVICE_IDENTIFIER.Config).to(Config).inSingletonScope();
  container.bind<AppLogger>(SERVICE_IDENTIFIER.Logger).to(AppLogger).inSingletonScope();
  /* #endregion */

  /* #region Controller */
  container.bind<ControllerRoot>(SERVICE_IDENTIFIER.Controller).to(ControllerRoot)
    .whenTargetNamed(SERVICE_NAME.controllers.root);
  container.bind<UserController>(SERVICE_IDENTIFIER.Controller).to(UserController)
    .whenTargetNamed(SERVICE_NAME.controllers.user);
  container.bind<PostsController>(SERVICE_IDENTIFIER.Controller).to(PostsController)
    .whenTargetNamed(SERVICE_NAME.controllers.posts);
  /* #endregion */
}
