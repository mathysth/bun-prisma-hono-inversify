import { injectable } from "inversify";
import { SafeParseError, TypeOf, z } from 'zod';

// Permet de fix l'erreur de retour de la librairie zod
function hashError(safeParseReturn: any): safeParseReturn is SafeParseError<any> {
  return safeParseReturn?.error;
}

export enum ENV_ENUM {
  PROD = 'PROD',
  DEV = 'DEV',
}

// Permet de define une valeur par défaut dans l'environnement de dev
// Aucune valeur n'est définie par défaut en prod
const withDevDefault = <T extends z.ZodTypeAny>(
  schema: T,
  val: TypeOf<T>
) => (process.env["ENV"] !== ENV_ENUM.PROD ? schema.default(val) : schema);

@injectable()
export class Config {
  /**
   * Where all app env will be validated
   */
  public async validateEnv() {
    const schema = z.object({
      PORT: withDevDefault(z.string(), '3000').transform(Number),
      ENV: withDevDefault(z.nativeEnum(ENV_ENUM), ENV_ENUM.DEV),
    });

    const parsed = schema.safeParse(process.env);

    if (hashError(parsed)) {
      console.error(
        "❌ Invalid environment variables:",
        JSON.stringify(parsed.error.format(), null, 4)
      );
      process.exit(1);
    }
  }

  /**
   * Get env variables
   */
  public get<T>(value: string): T {
    return process.env[value] as T;
  }
}