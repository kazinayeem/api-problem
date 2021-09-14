const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userHandeler = require("./routerHandeler/userHandeler");
const bodyParser = require("body-parser");
const todosHandeler = require("./routerHandeler/todosHandeler")

// init appp
const app = express();
app.use(cors());
app.use(express.json())
app.use(morgan("dev"));
app.use(bodyParser.json())

// mongoose connect
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected");
  })

  .catch((error) => {
    console.log(error);
  });

// router



app.use("/",userHandeler)
app.use("/todo",todosHandeler)

// server
app.listen(30000, () => {
  console.log(`server is running `);
});
