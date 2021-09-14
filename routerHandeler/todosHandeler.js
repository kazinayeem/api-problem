const express = require("express");
const Todo = require("../model/todomodel");
const router = express.Router();
const checklogin = require("../middleware/checklogin");
// post todo
router.post("/", checklogin, async (req, res) => {
  const { title, body } = req.body;
  const { _id } = req.user;
  try {
    const newtodo = new Todo({
      title: title,
      body: body,
      user: _id,
    });

    const result = await newtodo.save();
    res.status(200).json({
      result,
    });
  } catch {
    res.json({
      error: "server error",
    });
  }
});

// get todos

router.get("/", checklogin, async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await Todo.find({ user :  _id }).select({_id : 0}).populate("user")
    res.json({
      user: user,
    });
  } catch {
    res.json({
      error: "server error",
    });
  }
});

module.exports = router;
