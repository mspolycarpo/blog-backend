import { response, Router } from "express";
import * as jwt from "jsonwebtoken";
import { enviroment } from "../common/enviroment";
import { authenticate } from "../security/authHandler";
import { Post } from "../models/postModel";
import { User } from "../models/userModel";
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

router.get("/", authenticate, async (req, res, next) => {
  try {
    const posts = await Post.find({}, { _id: 0, __v: 0 });
    const populatedPosts = [];
    for (let post of posts) {
      const user = await User.findOne({ id: post.userId }, { _id: 0, __v: 0 });
      let postJson = post.toJSON();
      delete postJson.userId;
      populatedPosts.push({ ...postJson, user });
    }
    res.status(200).send(populatedPosts);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
