import "jest";
import * as mongoose from "mongoose";
import * as request from "supertest";
import { enviroment } from "../dist/src/common/enviroment";
import { app } from "../dist/src/server/server";
let address = (<any>global).address;
const VALIDATION_ERROR = "ValidationError";
const MONGO_ERROR = "MongoError";
const basePath = "/user";

test("Criação de usuário", async () => {
  try {
    const res = await request(app).post(basePath).send({
      displayName: "Brett Wiltshire",
      email: "bretttt2222@email.com",
      password: "123456",
      image:
        "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    });
    expect(res.status).toBe(201);
  } catch (e) {
    console.error(e);
  }
});

test("Criação de usuário - displayName deve conter ao menos 8 caracteres", async () => {
  try {
    const res = await request(app).post(basePath).send({
      displayName: "Brett",
      email: "bretttt2222@email.com",
      password: "123456",
      image:
        "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    });
    expect(res.status).toBe(400);
  } catch (e) {
    console.error(e);
  }
});

test("Criação de usuário - Email invalido apenas com prefixo", async () => {
  try {
    const res = await request(app).post(basePath).send({
      displayName: "Brett Wiltshire",
      email: "bretttt",
      password: "123456",
      image:
        "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    });
    expect(res.status).toBe(400);
  } catch (e) {
    console.error(e);
  }
});
test("Criação de usuário - email invalido  apenas com domínio", async () => {
  try {
    const res = await request(app).post(basePath).send({
      displayName: "Brett Wiltshire",
      email: "@email.com",
      password: "123456",
      image:
        "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    });
    expect(res.status).toBe(400);
  } catch (e) {
    console.error(e);
  }
});

test("Criação de usuário - Email obrigatório", async () => {
  try {
    const res = await request(app).post(basePath).send({
      displayName: "Brett Wiltshire",

      password: "123456",
      image:
        "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    });
    expect(res.status).toBe(400);
  } catch (e) {
    console.error(e);
  }
});

test("Criação de usuário - Password com menos de 6 caracteres", async () => {
  try {
    const res = await request(app).post(basePath).send({
      displayName: "Brett Wiltshire",
      email: "bretttt2222@email.com",
      password: "12345",
      image:
        "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    });
    expect(res.status).toBe(400);
    expect(res.body.messages[0].name).toBe(VALIDATION_ERROR);
  } catch (e) {
    console.error(e);
  }
});

test("Criação de usuário - Password é obrigatório", async () => {
  try {
    const res = await request(app).post(basePath).send({
      displayName: "Brett Wiltshire",
      email: "bretttt2222@email.com",
      image:
        "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    });
    expect(res.status).toBe(400);
    expect(res.body.messages[0].name).toBe(VALIDATION_ERROR);
  } catch (e) {
    console.error(e);
  }
});

test("Criação de usuário - Email ja existente", async () => {
  try {
    const res = await request(app).post(basePath).send({
      displayName: "Brett Wiltshire",
      email: "bretttt2222@email.com",
      password: "123456",
      image:
        "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    });

    const res2 = await request(app).post(basePath).send({
      displayName: "Brett Wiltshire",
      email: "bretttt2222@email.com",
      password: "123456",
      image:
        "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    });
    expect(res2.status).toBe(400);
    expect(res2.body.name).toBe(MONGO_ERROR);
  } catch (e) {
    console.error(e);
  }
});

beforeAll(async () => {
  enviroment.db.url = "mongodb://localhost/blog-backend-test-db";
  mongoose.connect(enviroment.db.url, { useNewUrlParser: true });
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  mongoose.connection.dropDatabase();
  mongoose.connection.close();
});
