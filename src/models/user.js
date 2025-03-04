const mongoose = require("mongoose");

const User = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength:50,

  },
  lastName: {
    type: String,
    required: true,
    maxLength:50,
  },
  email: {
    type: String,
    unique:true,
    required: true,
    maxLength:50,
    lowercase:true,
    trim:true

  
  },
  mobileNumber: {
    type: Number,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
    validate(value){
      if(!["male", "female", "other"].includes(value)){
        throw new Error("Invalid gender. Please choose from ['male', 'female', 'other']");

      }

    }
  },  
  photoUrl:{
    type: String,
    required: true,
    default: "https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png"
  },
  skills:{
    type: []
  }

}, { timestamps: true });

module.exports = mongoose.model("User", User);
