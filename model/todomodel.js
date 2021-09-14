const mongoose = require("mongoose");

const todoschema = mongoose.Schema(
  {
    title: String,
    body: String,

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoschema);

module.exports = Todo;
