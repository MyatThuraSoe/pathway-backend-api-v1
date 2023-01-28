const express = require("express");
const router = express.Router();
const User = require("../models/user");

const jwt = require("jsonwebtoken");

// sample reqest body
// {
//     "email" : "makima@gmail.com",
//     "password" : "qwerty",
// }
router.post("/register", async (req, res) => {
  let result;
  let emailExist = await User.exists({ email: req.body["email"] });
  if (emailExist) {
    result = {
      error: "email already exists",
    };
  } else {
    try {
      let createdUser = await User.create(req.body);
      console.log(createdUser);
      const access_token = jwt.sign({ createdUser }, SECRET, {
        expiresIn: "24h",
      });
      res.cookie("jwt_access", access_token, { httpOnly: true });
      result = createdUser;
    } catch (err) {
      result = {
        error: err.message,
      };
    }
  }
  res.json(result);
});

// sample reqest body
// {
//     "email" : "makima@gmail.com",
//     "password" : "qwerty",
// }
router.post("/login", async (req, res) => {
  let result;
  let user = await User.findOne({ email: req.body["email"] });
  if (user) {
    let psw_correct = await user.checkPassword(req.body["password"]);
    console.log(psw_correct);
    if (psw_correct) {
      const access_token = jwt.sign({ user }, SECRET, { expiresIn: "24h" });
      res.cookie("jwt_access", access_token, { httpOnly: true });
      result = user;
    } else {
      result = {
        error: "password incorrect",
      };
    }
  } else {
    result = {
      error: "user not found",
    };
  }
  res.json(result);
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwt_access");
  res.json({
    message: "user logged out",
  });
});

module.exports = router;
