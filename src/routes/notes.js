const express = require("express");
const router = express.Router();

//controller
const notesController = require("../controller/notes");

//validator
const { notesValidation } = require("../validator/notes");

//authorization
const { protect } = require("../middleware/authMiddleware");

//routing
router.get("/", notesController.getAllNotes);
router.post("/", protect, notesValidation, notesController.createNotes);
router.put("/:id", protect, notesValidation, notesController.updateNotes);
router.delete("/:id", protect, notesController.deleteNotes);

module.exports = router;
