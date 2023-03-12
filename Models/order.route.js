const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    name: { type: String, require },
    email: { type: String, require, unique: true },
    address: { type: String, require },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", orderSchema);
