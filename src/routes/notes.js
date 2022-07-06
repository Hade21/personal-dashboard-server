const express = require("express");
const router = express.Router();

//controller
const notesController = require("../controller/notes");

//validator
const { notesValidation } = require("../validator/notes");

//routing
router.post("/new", notesValidation, notesController.createNotes);

module.exports = router;
