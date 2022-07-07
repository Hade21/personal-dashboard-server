const mongoose = require("mongoose");
const { notesConnection } = require("../db/connection");

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const notesModel = notesConnection.model("Notes", notesSchema);

module.exports = { notesModel };
