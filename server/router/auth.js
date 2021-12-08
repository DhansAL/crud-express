const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
require("../db/connection");
const User = require("../model/userSchema");
//jwt token
const jwt = require("jasonwebtoken");

router.get("/", (req, res) => {
  res.send("tha warldo kun router desu ");
});
/* using promises --primitive approach

router.post("/register", (req, res) => {
  const { name, email, phoneNo, password, cPassword, work } = req.body;
  if (!name || !email || !phoneNo || !password || !cPassword || !work) {
    return res.status
      .apply(422)
      .json({ error: " please fill all required parameters" });
  }
  User.findOne({ email: email })
    .then((userExists) => {
      if (userExists) {
        return res.status
          .apply(422)
          .json({ error: "User already exits with this email id" });
      }
      const user = new User({
        name,
        email,
        phoneNo,
        password,
        cPassword,
        work,
      });
      user
        .save()
        .then(() => {
          res.status(201).json({ message: "user registered successfully" });
        })
        .catch((err) => {
          res.status(500).json({ error: "user registration failed" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
*/
// using async await -- ES6 approach

router.post("/register", async (req, res) => {
  const { name, email, phoneNo, password, cPassword, work } = req.body;
  if (!name || !email || !phoneNo || !password || !cPassword || !work) {
    return res.status
      .apply(422)
      .json({ error: " please fill all required parameters" });
  }

  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res
        .status(422)
        .json({ error: "User already exits with this email id" });
    } else if (password != cPassword) {
      return res
        .status(422)
        .json({ error: "password is not matched with confirm password" });
    } else {
      const user = new User({
        name,
        email,
        phoneNo,
        password,
        cPassword,
        work,
      });
      //hashing the password before saving it in db

      const userRegister = await user.save();
      if (userRegister) {
        res.status(201).json({ message: "user registered successfully" });
      } else {
        res.status(500).json({ error: "user registration failed" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

//login route
router.post("/signin", async (req, res) => {
  // console.log(req.body);
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please check your credentials" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "invalid credentials" });
      } else {
        res.json({ message: "user signed in successfully" });
      }
    } else {
      res.status(400).json({ error: "invalid credentials " });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
