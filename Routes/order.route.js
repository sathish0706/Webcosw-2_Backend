const express = require("express");
const router = express.Router();
const Orders = require("../Models/order.route");

router.post("/order", async (req, res) => {
  const { name, email, address } = req.body;

  const newOrders = new Orders({ name, email, address });

  try {
    newOrders.save((err, data) => {
      if (err) {
        return res
          .status(400)
          .send({ message: "Error while order the pizza", Error: err });
      }
      res.send({ msg: "Pizza ordered successfully", data });
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/getOrders", async (req, res) => {
  try {
    const orders = await Orders.find({});
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
