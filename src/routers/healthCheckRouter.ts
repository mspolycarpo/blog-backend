import { Router } from "express";
import { enviroment } from "../common/enviroment";
const router = Router();
const basePath = "/healthCheck";

router.get("/", async (req, res) => {
  res.send({
    version: enviroment.app.version,
    enviroment: enviroment.app.env,
    message: "Estou UP!",
  });
});

module.exports = router;
