import * as jestCli from "jest-cli";
import * as mongoose from "mongoose";
import { enviroment } from "./src/common/enviroment";
import { User } from "./src/models/userModel";
import { app } from "./src/server/server";
let server;
const beforeAllTests = async () => {
  try {
    enviroment.db.url = "mongodb://localhost/blog-backend-test-db";
    enviroment.server.port = 3001;
    await mongoose.connect(enviroment.db.url, { useNewUrlParser: true });

    server = app.listen(enviroment.server.port);
    const models = [User];

    for (const model of models) {
      await model.remove({}).exec();
    }
  } catch (e) {
    return e;
  }
};

const afterAllTests = async () => {
  await mongoose.disconnect();
  server.close();
};

beforeAllTests()
  .then(() => jestCli.run())
  .then(() => afterAllTests())
  .catch(console.error);
