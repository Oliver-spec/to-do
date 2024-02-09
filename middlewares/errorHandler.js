function errorHandler(err, req, res, next) {
  if (err.name === "ZodError") {
    console.log(`ERROR NAME: ${err.name}`);
    console.log(`ERROR MESSAGE: ${err.message}`);

    const response = {
      errorName: err.name,
      errorMessage: JSON.parse(err.message),
    };

    res.status(400).type("application/json").send(response);
  } else {
    console.log(`ERROR NAME: ${err.name}`);
    console.log(`ERROR MESSAGE: ${err.message}`);

    const response = {
      errorName: err.name,
      errorMessage: err.message,
    };

    res.status(500).type("application/json").send(response);
  }
}

module.exports = errorHandler;
