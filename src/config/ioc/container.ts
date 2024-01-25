import { Container } from 'inversify';
import { bindContainer } from '@config/utils/container';

const iocContainer = new Container();

// Bind Container to ioContainer
bindContainer(iocContainer);

export { iocContainer };
