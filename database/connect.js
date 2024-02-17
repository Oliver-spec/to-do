const pgp = require("pg-promise")();

const password = process.env.PASSWORD;
const db = pgp(
  // `postgresql://postgres:${password}@viaduct.proxy.rlwy.net:35556/railway`
  `postgresql://postgres:${password}@postgres.railway.internal:5432/railway`
);

module.exports = db;
