import pino, { Logger } from 'pino';
import pretty from 'pino-pretty';
import { Config, ENV_ENUM } from '@config/config';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { inject, injectable } from 'inversify';

type PinoType = Logger<never>;

@injectable()
export class AppLogger {
  private _pino: PinoType;

  public constructor(
    @inject(SERVICE_IDENTIFIER.Config) public config: Config,
  ) {
    const env = this.config.get<ENV_ENUM>('ENV');
    if (env === ENV_ENUM.DEV) {
      this._pino = pino(pretty({
        colorize: true,
      }));
    } else {
      this._pino = pino();
    }
  }

  get pino(): PinoType {
    return this._pino;
  }

  private set pino(logger: PinoType) {
    this._pino = logger;
  }
}
