import vine, { BaseLiteralType } from "@vinejs/vine";
import { injectable } from "inversify";
import z from "zod";

//TODO: vérifier si j'utilise vine ou zod pour valider les donner
//TODO: Ne pas oublier de supprimer les librairies une fois le choix fait
enum ValidationTypeEnum {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
}

const ENV_VARIABLE: { [key: string]: ValidationTypeEnum; } = {
  ma_variable: ValidationTypeEnum.STRING,
  ma_variable2: ValidationTypeEnum.NUMBER,
  ma_variable3: ValidationTypeEnum.BOOLEAN,
};

/**
 * 
 */
const VALIDATION_MAPPING: { [key: string]: BaseLiteralType<any, any>; } = {
  [ValidationTypeEnum.STRING]: vine.string(),
  [ValidationTypeEnum.BOOLEAN]: vine.boolean(),
  [ValidationTypeEnum.NUMBER]: vine.number(),
};


@injectable()
export class Config {

  public async validateEnv() {
    // for (const [envKey, envValue] of Object.entries(process.env)) {
    //   if (ENV_VARIABLE[envKey]) {
    //     console.log(envValue);
    //     console.log(typeof envValue);
    //     const schema = vine.object({
    //       [envKey]: VALIDATION_MAPPING[ENV_VARIABLE[envKey]]
    //     });

    //     const data = {
    //       [envKey]: envValue
    //     };

    //     // await vine.validate({
    //     //   schema,
    //     //   data
    //     // });
    //   } else {
    //     // console.error(`Missing property ${envKey} from env`);
    //     // process.exit();
    //   }
    // }
    const envSchema = z.object({
      ma_variable: z.string(),
      ma_variable2: z.number(),
      ma_variable3: z.string(),
    });

    const env = envSchema.parse(process.env);
    console.log(env);
  }
}