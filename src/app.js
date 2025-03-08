const express = require("express");
const app = express();
const { dbConnection } = require("./config/database");
const User = require("./models/user");
const { valideSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const coockiesParser = require("cookie-parser");
const { userAuth } = require("./middleware/auth");
app.use(express.json());
app.use(coockiesParser());

// creating a instance of the Models
app.post("/signup", async (req, res) => {
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

// login
app.post("/login", async (req, res) => {
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

// profile

app.get("/profile", userAuth, async (req, res) => {
  try {
    user = req.user;
    res.send(user);
  } catch (error) {
    res.status(404).send("ERROR :" + error.message);
  }
});

// sendin a connection req
app.post("/connectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("connection sent ");

  res.send(user.firstName + " connection request sent succesfull");
});

// dbConnections
dbConnection()
  .then(() => {
    console.log("connection established");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error connecting to database" + err);
  });
