const { validationResult } = require("express-validator");
const { notesModel } = require("../models/notes");

exports.createNotes = (req, res, next) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      const error = new Error("Invalid value!");
      error.errorStatus = 422;
      error.data = err;
      throw error;
    }

    const { title, body, author } = req.body;

    const newNotes = new notesModel({
      title: title,
      body: body,
      author,
    });

    newNotes
      .save()
      .then((result) => {
        return res.status(201).json({
          message: "Notes saved",
          data: result,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          message: "Failed to save",
          data: error,
        });
      });
  } catch (error) {
    return next(error);
  }
};

exports.getAllNotes = (req, res, next) => {
  try {
    notesModel
      .find()
      .then((result) => {
        return res.status(200).json({
          message: "Success",
          data: result,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    return next(error);
  }
};
