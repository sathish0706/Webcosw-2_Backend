const express = require("express");
const router = express.Router();
const User = require("../Models/user.models");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({ name, email, password });

  try {
    newUser.save((err, data) => {
      if (err) {
        return res
          .status(400)
          .send({ message: "Error while registering the user", Error: err });
      }
      res.send({ msg: "User Registered successfully" });
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.find({ email, password });

    if (user.length > 0) {
      const currentUser = {
        name: user[0].name,
        email: user[0].email,

        isAdmin: user[0].isAdmin,
        _id: user[0]._id,
      };
      res.send({ msg: "Succesful login...", currentUser });
    } else {
      return res.status(400).json({ message: "User Login Failed" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went weong" });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
router.get("/getUserById", async (req, res) => {
  try {
    const id = req.id;
    console.log(req._id);
    let user = await User.findById(id);

    if (user) {
      user = user.toObject();
      delete user["hashedPassword"];

      return res.status(200).send({ success: true, user: user });
    }
    return res
      .status(400)
      .send({ success: false, message: "User doesnt exist." });
  } catch (error) {
    console.log("Error", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
