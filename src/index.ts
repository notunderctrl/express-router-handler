import { Application } from 'express';
import glob from 'glob';

interface RoutesHandlerOptions {
  app: Application;
  routesPath: string;
  basePath?: string;
}

export default class RoutesHandler {
  private _app: Application;
  private _routesPath: string;
  private _basePath: string | undefined;

  constructor({ app, routesPath, basePath }: RoutesHandlerOptions) {
    this._app = app;
    this._routesPath = routesPath;
    this._basePath = basePath;
    this._init();
  }

  private _init() {
    glob(
      this._routesPath + '/**/*.{ts,js}',
      (err: Error | null, files: string[]) => {
        if (err) {
          return console.log(`Error: ${err}`);
        }

        for (const file of files) {
          const fileCallback = require(file);
          const requestMethod = file
            .split('/')
            .pop()
            ?.split('.')[0]
            .toLowerCase();

          let supportedMethods = ['get', 'post', 'put', 'delete', 'patch'];

          if (!supportedMethods.includes(requestMethod as string)) {
            console.log(
              `Ignoring file: ${file} as method "${requestMethod}" is not supported.`
            );
            continue;
          }

          let routePath =
            (this._basePath || '') +
            file.split(this._routesPath)[1].split('/').slice(0, -1).join('/');

          switch (requestMethod) {
            case 'get':
              this._app.get(routePath, fileCallback);
              break;

            case 'post':
              this._app.post(routePath, fileCallback);
              break;

            case 'put':
              this._app.put(routePath, fileCallback);
              break;

            case 'delete':
              this._app.delete(routePath, fileCallback);
              break;

            case 'patch':
              this._app.patch(routePath, fileCallback);
              break;
          }
        }
      }
    );
  }
}
