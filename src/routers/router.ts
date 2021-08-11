const healthCheckRouter = require("./healthCheckRouter");
const userRouter = require("./userRouter");
const loginRouter = require("./loginRouter");
const postRouter = require("./postRouter");
import { Application, Router } from "express";

const _routes: [string, Router][] = [
  ["/healthCheck", healthCheckRouter],
  ["/user", userRouter],
  ["/login", loginRouter],
  ["/post", postRouter],
];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};
