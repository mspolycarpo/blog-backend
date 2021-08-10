import { User } from "../models/userModel";
import { Router } from "express";
const router = Router();

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const newUser = await User.create(req.body);
    console.log(newUser);
    res.send("ok");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
