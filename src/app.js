const express = require("express");
const app = express();
const port = 3000;
const { connectDb } = require("./config/database");
const User = require('./models/user');

app.post('/user', async (req, res) => {
    const objUser ={
        firstName: 'John Doe',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        mobileNumber: 1234567890,
        age: '30',
        gender: 'Male'
    }
    const newUser = new User(objUser);
    await newUser.save();
    res.send('User added successfully');
})



connectDb()
  .then(() => {
    console.log("MongoDB Connected...");
    app.listen(port, (err, res) => {
      console.log("the server listening on port " + port);
    });
  })
  .catch((err) => console.log("mongodb connect error: " + err));
