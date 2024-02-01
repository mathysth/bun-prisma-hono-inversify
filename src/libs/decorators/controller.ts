import { createRoute } from '@hono/zod-openapi';
import { HonoRequest } from 'hono';

// Find a way to type the option to the following
// <P extends string, R extends Omit<RouteConfig, 'path'> & {path: P;}>;
// At the moment `Zod OpenApi Hono` don't export all type
export function Controller(options: any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
    const originalMethod = descriptor.value;
    descriptor.value = function () {
      // Access to property server from caller
      const server = Reflect.get(this, 'server');
      // Define route
      const route = createRoute(options);

      return server.hono.openapi(route, (ctx: HonoRequest) => {
        return originalMethod.call(this, ctx);
      });
    };
    // Return descriptor
    return descriptor;
  };
}
