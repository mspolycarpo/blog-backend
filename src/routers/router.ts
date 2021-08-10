const healthCheckRouter = require("./healthCheckRouter");
const userRouter = require("./userRouter");
import { Application, Router } from "express";

const _routes: [string, Router][] = [
  ["/healthCheck", healthCheckRouter],
  ["/user", userRouter],
];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};
