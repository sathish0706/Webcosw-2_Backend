const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);

router.post("/payment", async (req, res) => {
  const { token, totalAmount } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: totalAmount,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      res.send("Order placed successfully");
    } else {
      res.send("Payment failed");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
