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
    next(e);
  }
};
