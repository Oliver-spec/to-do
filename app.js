require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");
const {
  getEvents,
  postEvent,
  deleteEvent,
  flipStatus,
} = require("./controllers/functions");
const auth = require("./middlewares/auth");
const login = require("./controllers/login");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("short"));

app.post("/api/login", login);

app.use(auth);

app.get("/api/events", getEvents);
app.post("/api/events", postEvent);
app.delete("/api/events/:eventId", deleteEvent);
app.patch("/api/events/:eventId", flipStatus);

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server startup at ${new Date().toLocaleString()}`);
  console.log(`Listening on port ${port}`);
});
