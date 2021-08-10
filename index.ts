import { enviroment } from "./src/common/enviroment";
import { app } from "./src/server/server";
import * as mongoose from "mongoose";
Promise.resolve(mongoose.connect(enviroment.db.url, { useNewUrlParser: true }));

const listener = app.listen(enviroment.server.port);
console.log(listener.address());
