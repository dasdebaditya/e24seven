//Standby File
//Created to test links, can be ignored in main production

const User = require("../models/User");
const save = require("save-file");
// import { save } from 'save-file'

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "User Already Exists!",
      });
    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
    });

    _user.save((error, data) => {
      if (data) {
        return res.status(201).json({
          user: data,
        });
      }
      if (error) {
        return res.status(400).json({
          user: data,
        });
      }
    });
  });
};
