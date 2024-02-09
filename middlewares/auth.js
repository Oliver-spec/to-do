const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = auth;
