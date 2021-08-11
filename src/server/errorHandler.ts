export const handleError = (err, req, res, next) => {
  switch (err.name) {
    case "MongoError":
      if (err.code === 11000) {
        err.statusCode = 400;

        if (err.keyValue && err.keyValue.email) {
          res
            .status(err.statusCode)
            .send({ name: err.name, message: "Usuário já existe" });
        } else {
          res.status(err.statusCode).send(err);
        }
      }
      break;
    case "ValidationError":
      err.statusCode = 400;
      const messages: any[] = [];
      for (let name in err.errors) {
        messages.push({
          name: err.name,
          message: err.errors[name].properties.message,
        });
      }
      res.status(err.statusCode).send({ messages });
      break;
    case "UnauthorizedError":
      res.status(400).send({ message: err.message });
      break;
    case "AuthError":
      res.status(401).send({ message: err.message });
      break;
    case "JsonWebTokenError":
      res.status(401).send({ message: "Token inválido ou expirado" });
    case "UpdateValidationError":
      res.status(400).send({ message: err.message });
    case "UserNotAuthorizedError":
      res.status(401).send({ message: err.message });

    default:
      res.status(err.statusCode || 500).send(err);
  }
};
