const pgp = require("pg-promise")();

const password = process.env.PASSWORD;
const db = pgp(
  process.env.NODE_ENV === "production"
    ? `postgresql://postgres:${password}@postgres.railway.internal:5432/railway`
    : `postgresql://postgres:${password}@monorail.proxy.rlwy.net:27780/railway`
);

module.exports = db;
