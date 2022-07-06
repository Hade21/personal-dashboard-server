const { validationResult } = require("express-validator");

exports.createNotes = (req, res, next) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(422).json({
        message: "Failed to add",
        data: err,
      });
    }

    const { title, body } = req.body;

    const result = {
      message: "Notes added",
      data: {
        id: Date.now(),
        title: title,
        body: body,
        createdAt: new Date(),
        author: {
          userId: "1",
          name: "Test",
        },
      },
    };

    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
};
