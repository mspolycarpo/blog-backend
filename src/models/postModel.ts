import { Model, Schema, model } from "mongoose";
import { enviroment } from "../common/enviroment";
export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  published: string;
  updated: string;
}

export interface PostModel extends Model<Post> {}

const postSchema = new Schema<Post, PostModel>({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
  published: {
    type: String,
    required: true,
  },
  updated: {
    type: String,
    required: true,
  },
});

export const Post = model<Post, PostModel>("Post", postSchema);

/*
{
  "id": "7706273476706534553",
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "userId": "401465483996", // esse é o id que referência usuário que é o autor do post
  "published": "2011-08-01T19:58:00.000Z",
  "updated": "2011-08-01T19:58:51.947Z",
}

*/
