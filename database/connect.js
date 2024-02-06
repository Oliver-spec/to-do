const pgp = require("pg-promise")();

const password = process.env.PASSWORD;
const db = pgp(
  `postgresql://oliverkui0324:${password}@ep-dawn-poetry-97326216.ap-southeast-1.aws.neon.tech/to-do?sslmode=require`
);

module.exports = db;
