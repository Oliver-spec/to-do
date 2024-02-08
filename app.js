require("dotenv").config();
const express = require("express");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const {
  getEvents,
  postEvent,
  deleteEvent,
} = require("./controllers/functions");

const app = express();

app.enable("trust proxy");

app.use(express.json());
app.use(logger);

app.get("/api/events", getEvents);
app.post("/api/events", postEvent);
app.delete("/api/events/:eventId", deleteEvent);

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server startup at ${new Date().toLocaleString()}`);
  console.log(`Listening on port ${port}`);
});
