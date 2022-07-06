const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        message: "Failed",
        data: error,
      });
    }
    const { fullname, username, email } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);

    const Register = new User({
      fullname: fullname,
      username: username,
      email: email,
      password: password,
    });

    Register.save()
      .then((result) => {
        return res.status(201).json({
          message: "Success",
          data: result,
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          return res.status(403).json({
            message: "Username has taken",
          });
        }
      });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        message: "Failed",
        error: error,
      });
    }

    const { user, password } = req.body;
    const withUsername = await User.findOne({ username: user }).lean();
    const withEmail = await User.findOne({ email: user }).lean();

    if (withUsername) {
      if (await bcrypt.compare(password, withUsername.password)) {
        const token = jwt.sign(
          {
            id: withUsername._id,
            username: withUsername.username,
          },
          process.env.ACCESS_TOKEN_SECRET
        );
        return res.status(200).json({
          username: withUsername.username,
          token,
        });
      }
      return res.status(403).json({
        message: "Password Invalid",
      });
    } else if (withEmail) {
      if (await bcrypt.compare(password, withEmail.password)) {
        const token = jwt.sign(
          {
            id: withEmail._id,
            username: withEmail.username,
          },
          process.env.ACCESS_TOKEN_SECRET
        );
        return res.status(200).json({
          username: withEmail.username,
          token,
        });
      }
      return res.status(403).json({
        message: "Password Invalid",
      });
    } else if (!withEmail || !withUsername) {
      return res.status(403).json({
        message: "Account doesn't exist",
      });
    }
  } catch (error) {
    return next(error);
  }
};
