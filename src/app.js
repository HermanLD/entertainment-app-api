const express = require("express");
require("./db/mongoose");

const contentRouter = require("./routers/content");
const userRouter = require("./routers/user");

const app = express();

app.use(express.json());
app.use(contentRouter);
app.use(userRouter);

module.exports = app;
