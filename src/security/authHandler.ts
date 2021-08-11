import * as jwt from "jsonwebtoken";
import { enviroment } from "../common/enviroment";
import { Request, Response, NextFunction } from "express";
const AUTH_ERROR = "AuthError";
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;
  try {
    if (auth) {
      const token = auth.split(" ")[1];
      const decoded = jwt.verify(token, enviroment.security.apiSecret);
      req.body.thisEmail = decoded.sub;
      next();
    } else {
      let e = new Error("Token não encontrado");
      e.name = AUTH_ERROR;
      throw e;
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const validate = (email, password) => {
  let e = new Error();
  e.name = "UnauthorizedError";

  if (email === undefined) {
    e.message = "'email' is required";
    throw e;
  } else if (email === "") {
    e.message = "'email' is not allowed to be empty";
  }
  if (password === undefined) {
    e.message = "'password' is required";
    throw e;
  } else if (password === "") {
    e.message = "'email' is not allowed to be empty";
    throw e;
  }
};
