# Express Router Handler

An Express js routes handler that will automatically generate API routes for you based on the folder structure.

### Folder structure example (as nested as you want it!):

![](https://i.imgur.com/z98NjrW.png)

### `RouterHandler` options:

`app` - your express server instance.

`routesPath` - the path to your routes folder - Use the `path` library to define this.

`prefix` - this changes your API routing. For example: By default your requests could look something like this:

- `http://localhost:3000/users`

Adding a `prefix` like `/api` will change the routing to look like this:

- `http://localhost:3000/api/users`

IMPORTANT: Adding a trailing slash to `prefix` will affect your routing.

### CommonJS Example:

```js
const path = require('path');
const express = require('express');
const RouterHandler = require('express-router-handler').default;

const app = express();
const PORT = 3000;

RouterHandler({
  app,
  // IMPORTANT: Use the path library to define routesPath
  routesPath: path.join(__dirname, 'routes'),
  // prefix: '/api', // optional
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Typescript Example:

```js
import express, { Application } from 'express';
import RouterHandler from 'express-router-handler';
import path from 'path';

const app: Application = express();
const PORT = 3000;

RouterHandler({
  app,
  // IMPORTANT: Use the path library to define routesPath
  routesPath: path.join(__dirname, 'routes'),
  // prefix: '/api', // optional
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Your route file needs to export a function

### CommonJS example:

`/routes/users/:id/get.js`

```js
module.exports = (req, res) => {
  const id = req.params.id;
  res.send(`User id: ${id}`);
};
```

### TypeScript example:

`/routes/users/:id/get.js`

```js
import { Request, Response } from 'express';

export default (req: Request, res: Response) => {
  const id = req.params.id;
  res.send(`User id: ${id}`);
};
```

## Known issues

- The library only works in CommonJS projects due to the nature of import/exports.
