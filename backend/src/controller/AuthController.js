const User = require("../models/User");
const brcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");

//Handel error
/*
const handelError = (err) => {
  console.log(err.message, err.code);
  let error = { email: "", password: "" };
  //Validation errors
  if (err.message.include("user validation failed")) {
    // console.log(object.value(err.errors));
  }
};
*/
const register = (req, res, next) => {
  brcypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }

    let user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPass,
      username: Math.random().toString(),
    });
    user
      .save()
      .then((user) => {
        res.json({
          message: "User Added Succesfully!",
        });
      })
      .catch((error) => {
        // const errors = handelError(error);
        res.json({
          message: "Something went wrong!",
        });
        // console.log(error)
      });
  });
};

const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ $or: [{ email: username }, { phone: username }] }).then(
    (user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err,
            });
          }
          if (result) {
            let token = jwt.sign({ name: user.name }, "verySecretValue", {
              expiresIn: "1h",
            });
            res.json({
              message: "Login Successful!",
              token,
            });
          } else {
            res.json({
              message: "UserID/Password does not match!",
            });
          }
        });
      } else {
        res.json({
          message: "No User found",
        });
      }
    }
  );
};

module.exports = {
  register,
  login,
};

// exports.requireSignin = (req, res, next)=>{
//    jwt.decode(req.header.authorisation.split(" "))[1];
//    const user = jwt.verify(token, "verySecretValue")
//    req.user = user;
//    next();
// }