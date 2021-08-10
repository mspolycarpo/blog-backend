import { User } from "../models/userModel";
import { Router } from "express";
const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).send("ok");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
