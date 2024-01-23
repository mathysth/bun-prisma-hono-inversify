import pino, { Logger } from 'pino';
import pretty from 'pino-pretty';
import { inject, injectable } from "inversify";
import { Config, ENV_ENUM } from '@config/config';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';

@injectable()
export class AppLogger {
  private _pino: Logger<never>;

  public constructor(
    @inject(SERVICE_IDENTIFIER.Config) public config: Config,
  ) {
    this.setPinoConfig();
  }

  get pino() {
    return this._pino;
  }

  private set pino(pino: Logger<never>) {
    this._pino = pino;
  }

  private setPinoConfig(): void {
    const env = this.config.get<ENV_ENUM>('ENV');
    if (env === ENV_ENUM.DEV) {
      this._pino = pino(pretty({
        colorize: true
      }));
    } else {
      this._pino = pino();
    }
  }
}