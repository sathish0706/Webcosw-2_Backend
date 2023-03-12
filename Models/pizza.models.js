const mongoose = require("mongoose");

const pizzaSchema = mongoose.Schema(
  {
    id: { type: Number, require: true, trim: true },
    name: { type: String, require: true, trim: true },
    img: { type: String, require: true, trim: true },
    summary: { type: String, require: true, trim: true },
    price: { type: Number, require: true, trim: true },
  },
  {
    timestamps: true,
  }
);

const pizzaModel = mongoose.model("pizzas", pizzaSchema);

module.exports = pizzaModel;
