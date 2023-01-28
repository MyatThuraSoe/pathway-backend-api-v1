const express = require("express");
const router = express.Router();
const User = require("../models/user");

const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser");

// user ----------------------------
router.post("/create", async (req, res) => {
  try {
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).json({ message: "User with this email already exist" });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
      });
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/reset-password", async (req, res) => {
  try {
    // Find the user by email
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Generate a new salt and hash the new password
    const salt = await bcrypt.genSalt();
    const newHashedPassword = await bcrypt.hash(req.body.newPassword, salt);
    // Update the user's password
    user.password = newHashedPassword;
    await user.save();
    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
