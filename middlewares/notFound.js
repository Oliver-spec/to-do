function notFound(req, res, next) {
  res.status(404).send("404 NOT FOUND");
}

module.exports = notFound;
