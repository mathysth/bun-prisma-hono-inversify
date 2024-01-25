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

When introducing new environment variables, validate them in <strong>src/config/config.ts</strong> using the [Zod](https://zod.dev/) library:

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

To add an identifier, you can do so in the service-identifier.ts file.
Example of calling a class that has been added with an identifier [Wiki](https://github.com/inversify/InversifyJS/blob/master/wiki/classes_as_id.md):
```ts
const controllerRoot = iocContainer.get<ControllerRoot>(SERVICE_IDENTIFIER.Controller);
```

To add a named binding, you can include your names in the service-name.ts file.
Example of calling a class that has been added with a named binding [Wiki](https://github.com/inversify/InversifyJS/blob/master/wiki/named_bindings.md):
```ts
const controllerRoot = iocContainer.getNamed<ControllerRoot>(SERVICE_IDENTIFIER.Controller, SERVICE_NAME.controllers.root);
```

For more details, refer to the [Inversify Wiki](https://github.com/inversify/InversifyJS/tree/master/wiki).
## TESTS

This project has adopted Bun Test for running tests.
To run your tests, use the following command:

```powershell
bun test
```

### Writing Tests

Create your test files and place them in the directory named <strong> src/\_\_tests\_\_</strong> with a <strong>.spec.ts</strong> extension.

```js
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
    const appLogger = container.get < AppLogger > SERVICE_IDENTIFIER.Logger;
    expect(appLogger.pino).toBeDefined();
    expect(appLogger.config).toBeDefined();
  });
});
```

For more information on Bun Test and its features, refer to the [Bun Test Documentation.](https://bun.sh/docs/cli/test)

## Build and Run

### Using bun bundler

To build your project with Bun bundler, use the following command. This will create a <strong>dist</strong> folder containing the bundled files.

```powershell
bun run build
```

#### Updating the Build

If you need to update the build configuration, you can modify the <strong>scripts/build.js</strong> file. Refer to the [Bun Build Documentation](https://bun.sh/docs/bundler) for guidance on customizing the build process.

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
