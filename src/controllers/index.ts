import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { UserController } from './user';
import { inject, injectable, named } from 'inversify';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { PostsController } from './posts';

export interface IController {
  // Where root will be loaded
  setup(): void;
}

@injectable()
export class ControllerRoot implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.Controller) @named(SERVICE_NAME.controllers.posts) private postsController: PostsController,
    @inject(SERVICE_IDENTIFIER.Controller) @named(SERVICE_NAME.controllers.user) private userController: UserController,
  ) { }

  public setup(): void {
    this.userController.setup();
    this.postsController.setup();
  }
}
