import * as express from "express";

import { routes } from "../routers/router";
import { handleError } from "./errorHandler";

export const app = express();
app.use(express.json());

routes(app);
app.use(handleError);
