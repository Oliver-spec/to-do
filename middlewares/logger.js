function logger(req, res, next) {
  try {
    console.log(
      `${req.method} request to ${
        req.originalUrl
      } received at ${new Date().toLocaleString()} from ${req.ip}`
    );

    console.log(`Body: ${JSON.stringify(req.body)}`);

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = logger;
