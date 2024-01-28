import { DefaultArgs } from '@prisma/client/runtime/library';
import { Prisma, PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';

@injectable()
export class AppOrm {
  private _client = new PrismaClient();

  get client(): PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> {
    return this._client;
  }
}
