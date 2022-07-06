const { body } = require("express-validator");

const userDataRegister = [
  body("fullname")
    .exists({ checkFalsy: true })
    .withMessage("Fullname must exist")
    .bail(true)
    .isString()
    .withMessage("Fullname must be string")
    .bail(true),
  body("username")
    .exists({ checkFalsy: true })
    .withMessage("Username must exist")
    .bail(true)
    .isString()
    .withMessage("Username must be string")
    .bail(true)
    .isLength({ min: 5 })
    .withMessage("Min 5 characters"),
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email must exist")
    .bail(true)
    .isEmail()
    .withMessage("Provide valid email")
    .bail(true),
  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Password required")
    .bail(true)
    .isString()
    .withMessage("Password must be string")
    .bail(true)
    .isLength({ min: 8, max: 24 })
    .withMessage("Password must be at least 8 character")
    .bail(true),
  body("gender")
    .optional()
    .isString()
    .withMessage("Gender should be string")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Gender value is invalid"),
  body("dateOfBirth")
    .optional()
    .isDate()
    .withMessage("DOB should be valid date"),
  body("phoneNumber")
    .optional()
    .isString()
    .withMessage("phone number should be string")
    .custom((value) => {
      if (value.length !== 10) {
        return Promise.reject("Phone number should be 10 digits");
      } else {
        return true;
      }
    }),
];

const userLogin = [
  body("username")
    .optional()
    .isString()
    .withMessage("Username must be string")
    .bail(true),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Provide valid email")
    .bail(true),
  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Password required")
    .bail(true)
    .isString()
    .withMessage("Password must be string")
    .bail(true)
    .isLength({ min: 8, max: 24 })
    .withMessage("Password must be at least 8 character"),
];

module.exports = { userDataRegister, userLogin };
