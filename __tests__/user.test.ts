import "jest";
import * as mongoose from "mongoose";
import * as request from "supertest";
import { enviroment } from "../dist/src/common/enviroment";
import { app } from "../dist/src/server/server";
const Auth =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiZW1haWwiOiJtZXV3MjcyMjJAZW1haWwuY29tIiwiaWQiOjV9LCJpc3MiOiJibG9nLWJhY2tlbmQiLCJpYXQiOjE2Mjg2NjEyMTZ9.8pZ1kBm3K_w-kJMzqBv7E4nBiv6DchvstrRkgc8pwX4";

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
    throw e;
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
    throw e;
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
    throw e;
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
    throw e;
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
    throw e;
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
    throw e;
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
    throw e;
  }
});

test("Criação de usuário - Email ja existente", async () => {
  try {
    request(app)
      .post(basePath)
      .send({
        displayName: "Brett Wiltshire",
        email: "bretttt222233@email.com",
        password: "123456",
        image:
          "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
      })
      .then((res) => {
        request(app)
          .post(basePath)
          .send({
            displayName: "Brett Wiltshire",
            email: "bretttt222233@email.com",
            password: "123456",
            image:
              "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
          })
          .then((res2) => {
            expect(res2.status).toBe(400);
            expect(res2.body.name).toBe(MONGO_ERROR);
          });
      });
  } catch (e) {
    throw e;
  }
});

test("Consulta usuário - Lista todos usuários", async () => {
  try {
    const res = await request(app).post(basePath).send({
      displayName: "Brett Wiltshire",
      email: "bretttt2222@email.com",
      password: "123456",
      image:
        "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    });

    const res2 = await request(app).get(basePath).set("Authorization", Auth);
    expect(res2.status).toBe(200);
  } catch (e) {
    throw e;
  }
});

test("Consulta usuário - Lista todos usuários - Sem token", async () => {
  try {
    const res = await request(app).post(basePath).send({
      displayName: "Brett Wiltshire",
      email: "bretttt2222@email.com",
      password: "123456",
      image:
        "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    });

    const res2 = await request(app).get(basePath);
    expect(res2.status).toBe(401);
  } catch (e) {
    throw e;
  }
});

test("Consulta usuário - Lista todos usuários - Token Invalido", async () => {
  try {
    const res = await request(app).post(basePath).send({
      displayName: "Brett Wiltshire",
      email: "bretttt2222@email.com",
      password: "123456",
      image:
        "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    });

    const res2 = await request(app).get(basePath).set("Authorization", "AAAAA");
    expect(res2.status).toBe(401);
  } catch (e) {
    throw e;
  }
});

test("Consulta usuário - Por Id", () => {
  request(app)
    .post(basePath)
    .send({
      displayName: "Brett Wiltshire",
      email: "bretttt2222@email.com",
      password: "123456",
      image:
        "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    })
    .then(() => {
      request(app)
        .get(`${basePath}/1`)
        .set("Authorization", Auth)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
});

test("Consulta usuário - Por Id - Sem token", async () => {
  try {
    const res = await request(app).post(basePath).send({
      displayName: "Brett Wiltshire",
      email: "bretttt2222@email.com",
      password: "123456",
      image:
        "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    });

    const res2 = await request(app).get(`${basePath}/1`);

    expect(res2.status).toBe(401);
  } catch (e) {
    throw e;
  }
});

test("Consulta usuário - Por id - Token Invalido", async () => {
  try {
    const res = await request(app).post(basePath).send({
      displayName: "Brett Wiltshire",
      email: "bretttt2222@email.com",
      password: "123456",
      image:
        "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    });

    const res2 = await request(app)
      .get(`${basePath}/1`)
      .set("Authorization", "AAAAA");
    expect(res2.status).toBe(401);
  } catch (e) {
    throw e;
  }
});

test("Deletar Usuário", async () => {
  try {
    const res = await request(app).post(basePath).send({
      displayName: "Brett Wiltshire",
      email: "bretttt2222@email.com",
      password: "123456",
      image:
        "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    });
    const { token } = res.body;
    const res2 = await request(app)
      .delete(`${basePath}/me`)
      .set("Authorization", `Bearer ${token}`);

    expect(res2.status).toBe(204);
  } catch (e) {
    throw e;
  }
});

test("Deletar Usuário - Sem Token", async () => {
  try {
    const res = await request(app).post(basePath).send({
      displayName: "Brett Wiltshire",
      email: "bretttt2222@email.com",
      password: "123456",
      image:
        "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    });

    const res2 = await request(app).delete(`${basePath}/me`);

    expect(res2.status).toBe(401);
  } catch (e) {
    throw e;
  }
});

test("Deletar Usuário - Token invalido", async () => {
  try {
    const res = await request(app).post(basePath).send({
      displayName: "Brett Wiltshire",
      email: "bretttt2222@email.com",
      password: "123456",
      image:
        "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    });

    const res2 = await request(app)
      .delete(`${basePath}/me`)
      .set("Authorization", "AAAAA");
    expect(res2.status).toBe(401);
  } catch (e) {
    throw e;
  }
});

beforeAll(async () => {
  enviroment.db.url = "mongodb://localhost/blog-backend-test-db";
  mongoose.connect(enviroment.db.url, { useNewUrlParser: true });
});

beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
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
