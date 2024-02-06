function errorHandler(err, req, res, next) {
  if (err.name === "ZodError") {
    console.error(err.stack);

    const response = {
      status: "Failed",
      errorName: err.name,
      errorMessage: JSON.parse(err.message),
    };

    res.status(400).type("application/json").send(response);
  } else {
    console.error(err.stack);

    const response = {
      status: "Failed",
      errorName: err.name,
      errorMessage: err.message,
    };

    res.status(500).type("application/json").send(response);
  }
}

module.exports = errorHandler;
