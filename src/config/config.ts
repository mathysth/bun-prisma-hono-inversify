import { injectable } from "inversify";
import z, { SafeParseError } from "zod";

function hashError(safeParseReturn: any): safeParseReturn is SafeParseError<any> {
  return safeParseReturn?.error;
}

@injectable()
export class Config {
  /**
   * Where all app env will be validated
   */
  public async validateEnv() {
    const schema = z.object({
      ma_variable: z.string(),
      ma_variable2: z.string().transform(Number),
      ma_variable3: z.string().transform(Boolean),
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
}