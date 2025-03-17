const express = require('express');
const authRouter = express.Router();
const {valideSignUpData} = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require("bcrypt");


// sign up
authRouter.post("/signup", async (req, res) => {
  try {
    // validation of user data
    valideSignUpData(req);

    // saving the data
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    const savedData = await user.save();
    if (!savedData) {
      throw new Error("User Not Saved!!!!");
    }
    res.send(savedData);
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("Email is Not Valid");
      }
      const isPasswordVerify = await user.comparePass(password) ;
      if (isPasswordVerify) {
        // setling the jwt token
        const token = await user.jwtTokens()
  
        // sending the res back to client with cookie
        res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 });
  
        res.send("Login Succesfull!!!!");
      } else {
        throw new Error("Password is incorrect");
      }
    } catch (error) {
      res.status(400).send("ERROR :" + error.message);
    }
  });



module.exports = {authRouter};