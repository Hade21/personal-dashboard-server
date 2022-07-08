const { body } = require("express-validator");

const notesValidation = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("Title must exist")
    .bail(true)
    .isString()
    .withMessage("Title must be string")
    .bail(true)
    .isLength({ min: 5, max: 50 })
    .withMessage("Title min 5 characters and max 50 characters")
    .bail(true),
  body("body")
    .exists({ checkFalsy: true })
    .withMessage("Body cannot be empty")
    .bail(true)
    .isString()
    .withMessage("Body must be string")
    .bail(true)
    .isLength({ min: 8 })
    .withMessage("Body min 8 chararcters")
    .bail(true),
];

module.exports = { notesValidation };
