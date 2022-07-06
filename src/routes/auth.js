const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

//controller
const authController = require("../controller/auth");

//validator
const { userDataRegister, userLogin } = require("../validator/auth");

//routing
router.post("/register", userDataRegister, authController.register);
router.post("/login", userLogin, authController.login);

module.exports = router;
