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
        if (!result.length > 0) {
          res.status(404).json({
            message: "Tidak ada catatan!",
          });
        }

        return res.status(200).json({
          message: "Success",
          data: result,
          length: result.length,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Failed",
          data: error,
        });
      });
  } catch (error) {
    return next(error);
  }
};

exports.updateNotes = (req, res, next) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      const error = new Error("Invalid value!");
      error.errorStatus = 422;
      error.data = err;
      throw error;
    }

    const { title, body } = req.body;
    const id = req.params.id;

    notesModel
      .findById(id)
      .then((note) => {
        if (!note) {
          const error = new Error("Data tidak ditemukan!");
          error.errorStatus = 404;
          throw error;
        }

        note.title = title;
        note.body = body;

        return note.save();
      })
      .then((result) => {
        return res.status(200).json({
          message: "Update success!",
          data: result,
        });
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

exports.deleteNotes = (req, res, next) => {
  try {
    const id = req.params.id;

    notesModel
      .findById(id)
      .then((note) => {
        if (!note) {
          const error = new Error("Data tidak ditemukan!");
          error.errorStatus = 404;
          throw error;
        }

        return notesModel
          .findByIdAndRemove(id)
          .then((result) => {
            return res.status(200).json({
              message: "Success",
              data: result,
            });
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {}
};
