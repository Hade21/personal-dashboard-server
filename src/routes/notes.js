const express = require("express");
const router = express.Router();

//controller
const notesController = require("../controller/notes");

//validator
const { notesValidation } = require("../validator/notes");

//authorization
const { protect } = require("../middleware/authMiddleware");

//routing
router.get("/all", notesController.getAllNotes);
router.post("/new", protect, notesValidation, notesController.createNotes);
router.put(
  "/update/:id",
  protect,
  notesValidation,
  notesController.updateNotes
);
router.delete("/delete/:id", protect, notesController.deleteNotes);

module.exports = router;
