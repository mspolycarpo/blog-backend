export const handleError = (err, req, res, next) => {
  switch (err.name) {
    case "MongoError":
      if (err.code === 11000) {
        err.statusCode = 400;
      }
      break;
    case "ValidationError":
      err.statusCode = 400;
      const messages: any[] = [];
      for (let name in err.errors) {
        console.log("NOME >>>>", name);
        console.log("err name", err.errors[name].properties.message);
        messages.push({ message: err.errors[name].properties.message });
      }
      res.status(err.statusCode).send({ messages });
      break;
  }

  next(err);
};
