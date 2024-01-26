## Aecreator

### Setup

Ensure that all project dependencies are installed using:

```powershell
bun install
```

#### Environment Variables

Copy the provided template for environment variables:

```powershell
cp .env.template .env
```

Update the .env file with your specific configuration.

> Ensure to update the Dockerfile to include your new variables.

#### Variable Validation

When introducing new environment variables, validate them in `src/config/config.ts` using the [Zod](https://zod.dev/) library:

```ts
const schema = z.object({
  CUSTOM_VARIABLE: withDevDefault(z.string(), "Default value"),
});
```

This step ensures that all variables adhere to a defined schema, enhancing the reliability of your application.

## ORM

This project utilizes [Prisma](https://www.prisma.io/), an Object-Relational Mapping (ORM) tool, to interact with the database.

Running prisma :

```powershell
bun x prisma
```

For more details, refer to the [Prisma Documentation](https://www.prisma.io/docs).

## IOC

This project utilizes [Inversify](https://inversify.io/), an inversion of control container
for JavaScript & Node.js apps powered by TypeScript.

### Binding
There are several ways to inject classes, in the application we use service identifier binding and name binding.

#### Identifier binding
We use service identifier binding when we need to inject a class that will remain unique within its business context.
```ts 
const container = new Container()
container.bind<AppLogger>(SERVICE_IDENTIFIER.Logger).to(AppLogger).inSingletonScope();
const appLogger = iocContainer.get<AppLogger>(SERVICE_IDENTIFIER.Logger);
```
For more information about name identifier, please refer to the [Wiki](https://github.com/inversify/InversifyJS/blob/master/wiki/classes_as_id.md)

#### Name binding
Nous utilisons le binding par name et identifier dans le cas ou il y a plusieurs classes dans un context. Dans l'application nous regroupons tout les controllers sous le service controller et après elles sont alors identifier par leurs nom dans le service. Il faudra alors ajouter une entrée dans la constant SERVICE_NAME. 

We use named and identifier binding when there are multiple classes within a context. In the application, we group all controllers under the "controller" identifier (`service-identifier.ts`), and then they are identified by their names within the service (`service-name.ts`). You'll need to add an entry in the constant SERVICE_NAME for this.

```ts
// utils/container.ts
const container = new Container():
container.bind<ControllerRoot>(SERVICE_IDENTIFIER.Controller).to(ControllerRoot)
    .whenTargetNamed(SERVICE_NAME.controllers.root);
container.bind<UserController>(SERVICE_IDENTIFIER.Controller).to(UserController)
    .whenTargetNamed(SERVICE_NAME.controllers.user);
container.bind<PostsController>(SERVICE_IDENTIFIER.Controller).to(PostsController)
    .whenTargetNamed(SERVICE_NAME.controllers.posts);

// src/index.ts
const controllerRoot = iocContainer.getNamed<ControllerRoot>(SERVICE_IDENTIFIER.Controller, SERVICE_NAME.controllers.root);
```
For more information about name binding, please refer to the [Wiki](https://github.com/inversify/InversifyJS/blob/master/wiki/named_bindings.md):

You can find all the information about Inversify[Inversify Wiki](https://github.com/inversify/InversifyJS/tree/master/wiki).

## TESTS

This project has adopted Bun Test for running tests.
To run your tests, use the following command:

```powershell
bun test
```

### Writing Tests

Create your test files and place them in the directory named ` src/__tests__` with a `.spec.ts` extension.

```ts
// Example from file logger/index.test.ts
import { SERVICE_IDENTIFIER } from "@config/ioc/service-identifier";
import { expect, describe, it, beforeAll } from "bun:test";
import { Container } from "inversify";
import { AppLogger } from ".";
import { bindContainer } from "@config/utils/container";

describe("AppLogger", () => {
  const container = new Container();

  // ! Should be set in every tests files
  beforeAll(() => {
    bindContainer(container);
  });

  it("Should initialize pino", () => {
    const appLogger = container.get<AppLogger>(SERVICE_IDENTIFIER.Logger);
    expect(appLogger.pino).toBeDefined();
    expect(appLogger.config).toBeDefined();
  });
});
```

For more information on Bun Test and its features, refer to the [Bun Test Documentation.](https://bun.sh/docs/cli/test)

## Error Handling
In the `index.ts` file, there is a custom error handling.
```ts
// Error Handling
app.onError((err, c) => {
  appLogger.pino.error(err);
  return c.text(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
});
```

## Sentry

To set up [Sentry](https://sentry.io/welcome/), we use [Hono Sentry](https://github.com/honojs/middleware/tree/main/packages/sentry). \
To configure [Sentry](https://sentry.io/welcome/), ensure to enhance your environment by updating the `SENTRY_DSN` with your specific DSN.

[Where is my DSN](https://forum.sentry.io/t/where-can-i-find-my-dsn/4877/2)

```ts
// From file: index.ts
// Setup sentry
const sentryPrivate = config.get<string>('SENTRY_DSN');
app.use('*', sentry({
  dsn: sentryPrivate,
  tracesSampleRate: 1.0,
}));
```
## Build and Run

### Using bun bundler

To build your project with Bun bundler, use the following command. This will create a `dist` folder containing the bundled files.

```powershell
bun run build
```

#### Updating the Build

If you need to update the build configuration, you can modify the `scripts/build.js` file. Refer to the [Bun Build Documentation](https://bun.sh/docs/bundler) for guidance on customizing the build process.

### Using docker

Build the Docker image and run the application with the following commands:

```powershell
docker build --pull -t aecreator-bun .
docker run -d -p <host-port>:3000 aecreator-bun  --PORT=3000 ...
```

Don't forget to include each environment variable.

### Other libraries used

- [pino](https://github.com/pinojs/pino)
- [pino-pretty](https://github.com/pinojs/pino-pretty)
- [http-status-codes](https://github.com/prettymuchbryce/http-status-codes)
