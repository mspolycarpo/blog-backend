import { User } from "../models/userModel";
import { Router } from "express";
import * as jwt from "jsonwebtoken";
import { enviroment } from "../common/enviroment";
const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    credentialsValidation(email, password);

    const user: User = await User.findByEmail(email, "+password");
    if (user && user.matches(password)) {
      const token = jwt.sign(
        {
          sub: user.email,
          iss: enviroment.app.name,
        },
        enviroment.security.apiSecret
      );
      res.send({
        token,
      });
    } else {
      let e = Error("Campos invalidos");
      e.name = "UnauthorizedError";
      throw e;
    }
  } catch (e) {
    next(e);
  }
});

const credentialsValidation = (email, password) => {
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

module.exports = router;
