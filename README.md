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

//TODO: a faire lorsque prisma sera setup sur le projet

For more details, refer to the [Prisma Documentation](https://www.prisma.io/docs).

## TESTS

This project has adopted Bun Test for running tests.
To run your tests, use the following command:

```powershell
bun test
```

### Writing Tests

Create your test files and place them in the directory named \***\*tests\*\*** with a .spec.ts extension.

```js
// TODO: mettre un exemple avec inversify

import { expect, test } from "bun:test";

test("2 + 2", () => {
  expect(2 + 2).toBe(4);
});
```

For more information on Bun Test and its features, refer to the [Bun Test Documentation.](https://bun.sh/docs/cli/test)

## Build and Run

### Using bun bundler

To build your project with Bun bundler, use the following command. This will create a <strong>dist</strong> folder containing the bundled files.

```powershell
bun run build
```

### Updating the Build

If you need to update the build configuration, you can modify the <strong>scripts/build.js</strong> file. Refer to the [Bun Build Documentation](https://bun.sh/docs/bundler) for guidance on customizing the build process. Make sure to review the documentation for any specific details on configuring builds with Bun.

### Using docker

Build the Docker image and run the application with the following commands:

```powershell
docker build --pull -t aecreator-bun .
docker run -d -p 8080:3000 aecreator-bun --env PORT=3000
```

Ensure to replace PORT with the actual port number your application should run on. The -p flag maps the port exposed by the container to a port on your host machine. In this example, the application is accessible on http://localhost:8080 of your host machine. Adjust the port number (8080) as needed.

```powershell
docker run -d -p <host-port>:3000 aecreator-bun --env PORT=3000
```
