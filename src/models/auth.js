const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { userConnection } = require("../db/connection");

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = userConnection.model("User", userSchema);

module.exports = { userModel };
