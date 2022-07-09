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

    const { title, body } = req.body;
    const { username, _id } = req.user;

    const newNotes = new notesModel({
      title: title,
      body: body,
      author: { username, _id },
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
    const page = req.query.page || 1;
    const items = req.query.items || 5;

    let totalNotes;

    notesModel
      .find()
      .countDocuments()
      .then((count) => {
        totalNotes = count;
        if (!totalNotes > 0) {
          return res.status(404).json({
            message: "Tidak ada catatan!",
          });
        }
        return notesModel
          .find()
          .skip((page - 1) * items)
          .limit(items);
      })
      .then((result) => {
        if (!result.length > 0) {
          return res.status(404).json({
            message: "Tidak ada catatan!",
          });
        } else {
          return res.status(200).json({
            message: "Success",
            data: result,
            page: page,
            items_per_page: items,
            total_notes: totalNotes,
          });
        }
      });

    // notesModel
    //   .find()
    //   .then((result) => {
    //     if (!result.length > 0) {
    //       res.status(404).json({
    //         message: "Tidak ada catatan!",
    //       });
    //     }

    //     return res.status(200).json({
    //       message: "Success",
    //       data: result,
    //       length: result.length,
    //     });
    //   })
    //   .catch((error) => {
    //     return res.status(500).json({
    //       message: "Failed",
    //       data: error,
    //     });
    //   });
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

        return notesModel.findByIdAndRemove(id);
      })
      .then((result) => {
        return res.status(200).json({
          message: "Success",
          data: result,
        });
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {}
};
