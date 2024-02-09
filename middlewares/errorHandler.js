function errorHandler(err, req, res, next) {
  console.log(`ERROR NAME: ${err.name}`);
  console.log(`ERROR MESSAGE: ${err.message}`);

  switch (err.name) {
    case "ZodError":
      res.status(400).send("Invalid Input");
      break;

    case "LoginError":
      res.status(401).send("Invalid Password");
      break;

    case "JsonWebTokenError":
      res.status(401).send("Invalid Token - Please Login");
      break;

    default:
      res.status(500).send("Something Went Wrong - Please Retry");
      break;
  }
}

module.exports = errorHandler;
