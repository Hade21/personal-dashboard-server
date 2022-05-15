const { validationResult } = require("express-validator");

const RegisterUser = require("../models/auth");

exports.register = (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(422).json({
                success: false,
                error: error,
            });
        }
        const fullname = req.body.fullname;
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const Register = new RegisterUser({
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
                console.log(err);
            });
    } catch (error) {
        next(error);
    }
};

exports.login = (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(422).json({
                success: false,
                error: error,
            });
        }
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        res.status(200).json({
            username: username,
            email: email,
            password: password,
        });
    } catch (error) {
        next(error);
    }
};