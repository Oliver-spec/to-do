const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1000,
  limit: 5,
  message: "Too many requests",
  legacyHeaders: false,
  standardHeaders: "draft-7",
});

module.exports = limiter;
