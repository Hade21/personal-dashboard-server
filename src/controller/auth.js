const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async(req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(422).json({
                message: "Failed",
                error: error,
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
                res.status(201).json({
                    message: "Success",
                    data: result,
                });
            })
            .catch((err) => {
                if (err.code === 11000) {
                    res.status(403).json({
                        message: "Username has taken",
                    });
                }
            });
    } catch (error) {
        next(error);
    }
};

exports.login = async(req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(422).json({
                message: "Failed",
                error: error,
            });
        }
        const { username, email, password } = req.body;
        if (username) {
            const user = await User.findOne({ username }).lean();
            if (!user) {
                res.status(403).json({
                    message: "Account doesn't exist",
                });
            }
            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({
                        id: user._id,
                        username: user.username,
                    },
                    process.env.ACCESS_TOKEN_SECRET
                );
                res.status(200).json({
                    username,
                    password,
                    token,
                });
            }
            res.status(403).json({
                message: "Password Invalid",
            });
        } else if (email) {
            console.log(email);
            const user = await User.findOne({ email }).lean();
            if (!user) {
                res.status(403).json({
                    message: "Account doesn't exist",
                });
            }
            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({
                        id: user._id,
                        username: user.username,
                    },
                    process.env.ACCESS_TOKEN_SECRET
                );
                res.status(200).json({
                    username: user.username,
                    password: password,
                    token: token,
                });
            } else {
                res.status(403).json({
                    message: "Password invalid",
                });
            }
        }
    } catch (error) {
        next(error);
    }
};