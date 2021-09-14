const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const checklogin = require("../middleware/checklogin");
const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");

// post router
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hash_password = await bcrypt.hash(password, 10);
    const newuser = new User({
      name: name,
      email: email,
      password: hash_password,
    });

    const user = await User.findOne({ email });
    if (user) {
      return res.json({ error: "aldeady exit" });
    }

    const result = await newuser.save();
    res.status(200).json({
      message: result,
    });
  } catch (error) {
    res.status(500).json({
      error: "User not insert",
    });
  }
});

// login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: "user not found",
      });
    }

    const ismatchpassword = await bcrypt.compare(password, user.password);
    if (!ismatchpassword) {
      return res.status(401).json({
        error: "password not match",
      });
    }

    const token = await jwt.sign({ _id: user.id }, process.env.JWT, {
      expiresIn: "1days",
    });

    res.json({
      token,
    });
  } catch {
    res.status(500).json({
      error: "User not insert",
    });
  }
});

// get

router.get("/", checklogin, async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findById({ _id: id });
    res.status(200).json({
      message: user,
    });
  } catch {
    res.json({
      error: "server error",
    });
  }
});
module.exports = router;
