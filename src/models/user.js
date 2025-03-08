const mongoose = require("mongoose");
const validate = require("validator");

const User = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      maxLength: 50,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validate.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    mobileNumber: {
      type: Number,
    },
    age: {
      type: String,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error(
            "Invalid gender. Please choose from ['male', 'female', 'other']"
          );
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validate.isStrongPassword(value)) {
          throw new Error(
            "Password must be at least 8 characters long and contain a combination of uppercase letters, lowercase letters, numbers, and special characters."
          );
        }
      },
    },

    photoUrl: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png",
    },
    skills: {
      type: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);


// 