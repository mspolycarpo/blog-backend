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

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const post = await Post.findOne({ id: req.params.id }, { _id: 0, __v: 0 });
    if (!post) {
      res.status(404).send({ message: "Post não existe" });
      next();
    }
    const user = await User.findOne({ id: post.userId }, { _id: 0, __v: 0 });
    const postJson = post.toJSON();
    delete postJson.userId;
    const populatedPosts = { ...postJson, user };

    res.status(200).send(populatedPosts);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", authenticate, async (req, res, next) => {
  try {
    const updated = moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    const { title, content } = req.body;

    if (!title) {
      let e = new Error("'title' is required");
      e.name = "UpdateValidationError";
      throw e;
    }
    if (!content) {
      let e = new Error("'content' is required");
      e.name = "UpdateValidationError";
      throw e;
    }

    const post = await Post.findOne({ id: req.params.id });

    if (!post) {
      res.status(404).send({ message: "Post não existe" });
      next();
    } else if (post.userId !== req.body.userId) {
      let e = new Error("Usuário não autorizado");
      e.name = "UserNotAuthorizedError";
      throw e;
    }

    const updatedPost = await Post.findOneAndUpdate(
      { id: req.params.id },
      { title, content, updated },
      { new: true }
    );

    const user = await User.findOne({ id: post.userId }, { _id: 0, __v: 0 });
    const postJson = updatedPost.toJSON();
    delete postJson.userId;
    delete postJson._id;
    delete postJson.__v;
    const populatedPosts = { ...postJson, user };

    res.status(200).send(populatedPosts);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
