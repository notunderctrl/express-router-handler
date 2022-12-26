# Express Router Handler

An Express js routes handler that will automatically generate API routes for you based on the folder structure.

Folder structure example (as nested as you want it!):

![](https://i.imgur.com/z98NjrW.png)

Example:

```js
import express from 'express';
import RoutesHandler from 'express-routes-handler';
import path from 'path';

const app = express();
const PORT = 3000;

new RoutesHandler({
  app,
  routesPath: path.join(__dirname, 'routes'),
  basePath: '/api', // optional
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Your route file example (/routes/users/:id/get.js)

```js
export default = (req, res) => {
  const id = req.params.id;
  res.send(`User id: ${id}`);
};
```
