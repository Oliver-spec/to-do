require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const errorHandler = require("./middlewares/errorHandler");
const auth = require("./middlewares/auth");
const notFound = require("./middlewares/notFound");
const ratelimiter = require("./middlewares/rateLimiter");

const login = require("./controllers/login");
const searchEvents = require("./controllers/search");
const postEvent = require("./controllers/post");
const deleteEvent = require("./controllers/delete");
const flipStatus = require("./controllers/flipStatus");

const app = express();

app.use(ratelimiter);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("short"));

app.use("/", express.static("public"));

app.post("/api/login", login);

app.use(auth);

app.get("/api/events", searchEvents);
app.post("/api/events", postEvent);
app.delete("/api/events/:eventId", deleteEvent);
app.patch("/api/events/:eventId", flipStatus);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server startup at ${new Date().toLocaleString()} Port: ${port}`);
});
