const mongoose = require("mongoose");

const user = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  mobileNumber: {
    type: Number,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
});

module.exports = mongoose.model("User", user);
