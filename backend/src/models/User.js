const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const userSchema = new Schema(
  {
    firstname: {
      type: String,
      unique: true,
      required: true,
    },
    lastname: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
      validate: [isEmail, "Please fill a valid email address"],
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: [true, "Please enter an password"],
      minlength: [6, "Minmum password lenght is 6 characters"],
    },
    role:{
      enum:['user', 'admin', 'super-admin']
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
