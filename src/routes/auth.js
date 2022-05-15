const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const authController = require("../controller/auth");
const { userDataRegister, userLogin } = require("../validator/auth");

router.post("/register", userDataRegister, authController.register);
router.post("/login", userLogin, authController.login);

module.exports = router;