const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, require },
    email: { type: String, require, unique: true },
    password: { type: String, require },
    isAdmin: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
