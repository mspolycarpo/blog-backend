import "jest";
import * as mongoose from "mongoose";
import * as request from "supertest";
import { enviroment } from "../dist/src/common/enviroment";
import { app } from "../dist/src/server/server";
let address = (<any>global).address;
const VALIDATION_ERROR = "ValidationError";
const MONGO_ERROR = "MongoError";
const basePath = "/login";

test("Login", async () => {
  try {
    const res = await request(app)
      .post(basePath)
      .send({ email: "meu@email.com", password: "123456" });
    expect(res.statusCode).toBe(200);
  } catch (e) {
    console.error(e);
  }
});

test("Login - Email é necessário", async () => {
  try {
    const res = await request(app).post(basePath).send({ password: "123456" });
    expect(res.statusCode).toBe(400);
  } catch (e) {
    console.error(e);
  }
});

test("Login - Email não pode estar em branco", async () => {
  try {
    const res = await request(app)
      .post(basePath)
      .send({ email: "", password: "123456" });
    expect(res.statusCode).toBe(400);
  } catch (e) {
    console.error(e);
  }
});

test("Login - Password é necessário", async () => {
  try {
    const res = await request(app)
      .post(basePath)
      .send({ email: "meu@email.com" });
    expect(res.statusCode).toBe(400);
  } catch (e) {
    console.error(e);
  }
});

test("Login - Password não pode estar em branco", async () => {
  try {
    const res = await request(app)
      .post(basePath)
      .send({ email: "meu@email.com", password: "" });
    expect(res.statusCode).toBe(400);
  } catch (e) {
    console.error(e);
  }
});

beforeAll(async () => {
  enviroment.db.url = "mongodb://localhost/blog-backend-test-db";
  await mongoose.connect(enviroment.db.url, { useNewUrlParser: true });

  await request(app).post("/user").send({
    displayName: "Brett Wiltshire",
    email: "meu@email.com",
    password: "123456",
    image:
      "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
  });
});

afterAll(async () => {
  mongoose.connection.dropDatabase();
  mongoose.connection.close();
});
