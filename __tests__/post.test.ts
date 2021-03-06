import "jest";
import * as mongoose from "mongoose";
import * as request from "supertest";
import { enviroment } from "../dist/src/common/enviroment";
import { app } from "../dist/src/server/server";
const Auth =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiZW1haWwiOiJtZXV3MjcyMjJAZW1haWwuY29tIiwiaWQiOjV9LCJpc3MiOiJibG9nLWJhY2tlbmQiLCJpYXQiOjE2Mjg2NjEyMTZ9.8pZ1kBm3K_w-kJMzqBv7E4nBiv6DchvstrRkgc8pwX4";
const basePath = "/post";

test("Criação de post", async () => {
  try {
    const res = await request(app)
      .post(basePath)
      .send({
        title: "title teste",
        content: "content teste",
      })
      .set("Authorization", Auth);
    expect(res.status).toBe(201);
  } catch (e) {
    throw e;
  }
});

test("Criação de post - Title é necessário", async () => {
  try {
    const res = await request(app)
      .post(basePath)
      .send({
        content: "content teste",
      })
      .set("Authorization", Auth);
    expect(res.status).toBe(400);
  } catch (e) {
    throw e;
  }
});

test("Criação de post - Content é necessário", async () => {
  try {
    const res = await request(app)
      .post(basePath)
      .send({
        title: "title teste",
      })
      .set("Authorization", Auth);
    expect(res.status).toBe(400);
  } catch (e) {
    throw e;
  }
});

test("Consulta posts", async () => {
  const res = await request(app)
    .get(basePath)
    .send({
      title: "title teste",
      content: "content teste",
    })
    .set("Authorization", Auth)
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test("Consulta posts - por ID", async () => {
  try {
    await request(app)
      .post(basePath)
      .send({
        title: "title teste",
        content: "content teste",
      })
      .set("Authorization", Auth);
    const res = await request(app)
      .get(`${basePath}/1`)
      .send()
      .set("Authorization", Auth);
    expect(res.status).toBe(200);
  } catch (e) {
    throw e;
  }
});

test("Consulta posts - ID não encontrado", async () => {
  try {
    const res = await request(app)
      .get(`${basePath}/9999`)
      .send({
        title: "title teste",
        content: "content teste",
      })
      .set("Authorization", Auth);
    expect(res.status).toBe(404);
  } catch (e) {
    throw e;
  }
});

test("Atualiza posts", () => {
  request(app)
    .post(basePath)
    .send({
      title: "title teste",
      content: "content teste",
    })
    .set("Authorization", Auth)
    .then(async () => {
      const res = await request(app)
        .put(`${basePath}/1`)
        .send({ title: "titule", content: "content" })
        .set("Authorization", Auth);
      expect(res.status).toBe(200);
    });
});

test("Atualiza posts - Sem title", () => {
  request(app)
    .post(basePath)
    .send({
      title: "title teste",
      content: "content teste",
    })
    .set("Authorization", Auth)
    .then(async () => {
      const res = await request(app)
        .put(`${basePath}/1`)
        .send({ content: "content" })
        .set("Authorization", Auth);
      expect(res.status).toBe(400);
    });
});

test("Atualiza posts - Sem content", () => {
  request(app)
    .post(basePath)
    .send({
      title: "title teste",
      content: "content teste",
    })
    .set("Authorization", Auth)
    .then(async () => {
      const res = await request(app)
        .put(`${basePath}/1`)
        .send({ titule: "tst" })
        .set("Authorization", Auth);
      expect(res.status).toBe(400);
    });
});

test("Atualiza posts - usuário não autorizado", async () => {
  try {
    await request(app)
      .post(basePath)
      .send({
        title: "title teste",
        content: "content teste",
      })
      .set("Authorization", Auth);
    const res = await request(app)
      .put(`${basePath}/1`)
      .send({ title: "titule", content: "content" })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiZW1haWwiOiIyMjIyQGVtYWlsLmNvbSIsImlkIjo2fSwiaXNzIjoiYmxvZy1iYWNrZW5kIiwiaWF0IjoxNjI4NjcwMjcyfQ.FlVeYE3AjfScnOFPUCzHJ3p9dVwiR6DM0WNlhMTLMH4"
      );
    expect(res.status).toBe(401);
  } catch (e) {
    throw e;
  }
});

test("Atualiza posts - Sem content", () => {
  request(app)
    .post(basePath)
    .send({
      title: "title teste",
      content: "content teste",
    })
    .set("Authorization", Auth)
    .then(async () => {
      const res = await request(app)
        .put(`${basePath}/1`)
        .send({ titule: "tst" })
        .set("Authorization", Auth);
      expect(res.status).toBe(400);
    });
});

test("Consulta posts - Search", async () => {
  try {
    const res = await request(app)
      .get(`${basePath}/search`)
      .send()
      .set("Authorization", Auth);
    expect(res.status).toBe(200);
  } catch (e) {
    throw e;
  }
});

test("Deleta post ", async () => {
  try {
    await request(app)
      .post(basePath)
      .send({
        title: "title teste",
        content: "content teste",
      })
      .set("Authorization", Auth);
    const res = await request(app)
      .delete(`${basePath}/1`)
      .send()
      .set("Authorization", Auth);
    expect(res.status).toBe(204);
  } catch (e) {
    throw e;
  }
});

test("Deleta post - usuário não autorizado", async () => {
  try {
    await request(app)
      .post(basePath)
      .send({
        title: "title teste",
        content: "content teste",
      })
      .set("Authorization", Auth);
    const res = await request(app)
      .delete(`${basePath}/1`)
      .send({ title: "titule", content: "content" })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiZW1haWwiOiIyMjIyQGVtYWlsLmNvbSIsImlkIjo2fSwiaXNzIjoiYmxvZy1iYWNrZW5kIiwiaWF0IjoxNjI4NjcwMjcyfQ.FlVeYE3AjfScnOFPUCzHJ3p9dVwiR6DM0WNlhMTLMH4"
      );
    expect(res.status).toBe(401);
  } catch (e) {
    throw e;
  }
});

beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
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
