import { Application } from 'express';
import glob from 'glob';
import path from 'path';

interface RoutesHandlerOptions {
  app: Application;
  routesPath: string;
  basePath?: string;
}

export = class RoutesHandler {
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

          let supportedMethods = ['get', 'post', 'put', 'delete'];

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
              this._app.get(routePath, fileCallback.default);
              break;

            case 'post':
              this._app.post(routePath, fileCallback.default);
              break;

            case 'put':
              this._app.put(routePath, fileCallback.default);
              break;

            case 'delete':
              this._app.delete(routePath, fileCallback.default);
              break;
          }
        }
      }
    );
  }
};
