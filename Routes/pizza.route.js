const express = require("express");
const Pizza = require("../Models/pizza.models");

const router = express.Router();

router.get("/getallpizzas", async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.send(pizzas);
  } catch (error) {
    return res.status(400).send({ message: error });
  }
});

router.post("/addpizza", async (req, res) => {
  try {
    const payload = req.body;
    const newpizza = new Pizza(payload);
    await newpizza.save((err, data) => {
      if (err) {
        return res
          .status(400)
          .send({ message: "Error while sending new data", Error: err });
      }
      res.status(201).send([data]);
    });
  } catch (error) {
    return res.status(400).send({ message: error });
  }
});

router.get("/getpizzabyid/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pizza = await Pizza.findOne({ id: id });
    res.send(pizza);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/editpizza", async (req, res) => {
  const editedpizza = req.body.editedpizza;

  try {
    const pizza = await Pizzas.findOne({ _id: editedpizza._id });

    (pizza.name = editedpizza.name),
      (pizza.description = editedpizza.description),
      (pizza.image = editedpizza.image),
      (pizza.category = editedpizza.category),
      (pizza.prices = [editedpizza.prices]);

    await pizza.save();

    res.send("Pizza Details Edited successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deletepizza", async (req, res) => {
  const pizzaid = req.body.pizzaid;

  try {
    await Pizza.findOneAndDelete({ _id: pizzaid });
    res.send("Pizza Deleted successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
