import "jest";
import * as request from "supertest";
import { app } from "../dist/src/server/server";
let address = (<any>global).address;
const basePath = "/healthCheck";

test("Health Check", async () => {
  const res = await request(app).get(basePath);
  expect(res.status).toBe(200);
});
