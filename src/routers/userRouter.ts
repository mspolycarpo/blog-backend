import { User } from "../models/userModel";
import { Router } from "express";
import * as jwt from "jsonwebtoken";
import { enviroment } from "../common/enviroment";
import { authenticate } from "../security/authHandler";
const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const id = 1 + (await User.collection.count());
    req.body.id = id;
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

router.get("/", authenticate, async (req, res, next) => {
  try {
    const users = await User.find({}, { _id: 0, __v: 0 });
    res.send(users);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const id = req.params.id;
    const users = await User.findOne({ id }, { _id: 0, __v: 0 });
    res.send(users || { message: "Usuário inexistente" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
