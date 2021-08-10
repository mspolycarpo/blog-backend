export const handleError = (err, req, res, next) => {
  switch (err.name) {
    case "MongoError":
      if (err.code === 11000) {
        err.statusCode = 400;

        if (err.keyValue && err.keyValue.email) {
          res.status(err.statusCode).send({ message: "Usuário já existe" });
        } else {
          res.status(err.statusCode).send(err);
        }
      }
      break;
    case "ValidationError":
      err.statusCode = 400;
      const messages: any[] = [];
      for (let name in err.errors) {
        messages.push({ message: err.errors[name].properties.message });
      }
      res.status(err.statusCode).send({ messages });
      break;
  }

  next(err);
};
