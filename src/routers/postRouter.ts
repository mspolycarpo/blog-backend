import { response, Router } from "express";
import * as jwt from "jsonwebtoken";
import { enviroment } from "../common/enviroment";
import { authenticate } from "../security/authHandler";
import { Post } from "../models/postModel";
const moment = require("moment");
const router = Router();

router.post("/", authenticate, async (req, res, next) => {
  try {
    const id = 1 + (await Post.collection.count());
    const { title, content, userId } = req.body;
    const published = moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    const updated = published;

    await Post.create({ id, title, content, userId, published, updated });
    res.status(201).send({ title, content, userId });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
