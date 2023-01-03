import { Application } from 'express';
import glob from 'glob';

interface RoutesHandlerOptions {
  app: Application;
  routesPath: string;
  prefix?: string;
}
function RouterHandler({ app, routesPath, prefix }: RoutesHandlerOptions) {
  if (!app || !routesPath) {
    throw new Error('app and routesPath are required.');
  }

  glob(routesPath + '/**/*.{ts,js}', (err: Error | null, files: string[]) => {
    if (err) {
      return console.log(`Error: ${err}`);
    }

    for (const file of files) {
      const requestMethod = file.split('/').pop()?.split('.')[0].toLowerCase();

      let supportedMethods = ['get', 'post', 'put', 'delete', 'patch'];

      if (!supportedMethods.includes(requestMethod as string)) {
        console.log(
          `Ignoring file: ${file} as method "${requestMethod}" is not supported.`
        );
        continue;
      }

      let routePath =
        (prefix || '') +
        file.split(routesPath)[1].split('/').slice(0, -1).join('/');

      const fileCallback = require(file);
      switch (requestMethod) {
        case 'get':
          app.get(routePath, fileCallback.default || fileCallback);
          break;
        case 'post':
          app.post(routePath, fileCallback.default || fileCallback);
          break;
        case 'put':
          app.put(routePath, fileCallback.default || fileCallback);
          break;
        case 'delete':
          app.delete(routePath, fileCallback.default || fileCallback);
          break;
        case 'patch':
          app.patch(routePath, fileCallback.default || fileCallback);
          break;
      }
    }
  });
}

export default RouterHandler;
