const healthCheckRouter = require("./healthCheckRouter");
const userRouter = require("./userRouter");
const loginRouter = require("./loginRouter");
import { Application, Router } from "express";

const _routes: [string, Router][] = [
  ["/healthCheck", healthCheckRouter],
  ["/user", userRouter],
  ["/login", loginRouter],
];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};
