const express = require("express");
const router = express.Router();
const User = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Authenticate = require("../middleware/Authenticate");

require("../db/conn");

//Register route
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(422)
      .json({ error: "Please enter all the required details" });
  }

  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "Email already exists" });
      }

      const user = new User({ username, email, password });

      return user.save();
    })
    .then(() => {
      res.status(201).json({ message: "User registered successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to register" });
    });
});

// Login route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please enter correct credentials" });
    }

    const user = await User.findOne({ email: email });
    // console.log("User logged in:", user); 

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = await user.generateAuthToken();
        // console.log("Generated token:", token);


        res.json({
          message: "User signed in successfully!",
          user: user,
          token: token,
        });
      } else {
        // console.log("received 400");
        res.status(400).json({
          error: "Invalid Credentials",
        });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/home", Authenticate, (req, res) => {
  res.send(req.rootUser);
});

module.exports = router;
