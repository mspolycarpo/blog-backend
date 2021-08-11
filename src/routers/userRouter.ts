import { User } from "../models/userModel";
import { Router } from "express";
import * as jwt from "jsonwebtoken";
import { enviroment } from "../common/enviroment";
const router = Router();

router.post("/", async (req, res, next) => {
  try {
    await User.create(req.body);
    const token = jwt.sign(
      {
        sub: req.body.email,
        iss: enviroment.app.name,
      },
      enviroment.security.apiSecret
    );
    res.status(201).send({ token });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
