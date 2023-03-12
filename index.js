const express = require("express");
const cors = require("cors");
const db = require("./connect");
const dotenv = require("dotenv");

const pizzaRouter = require("./Routes/pizza.route");
const customerRouter = require("./Routes/customers.route");
const orderRoute = require("./Routes/order.route");
// const paymentRoute = require("./Routes/payment.route");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

db();

const PORT = process.env.PORT;
console.log(PORT);

// const DB_URL = process.env.DB_URL;

app.get("/", async function (request, response) {
  response.send("hello world");
});

app.use("/pizza", pizzaRouter);
app.use("/customers", customerRouter);
app.use("/api", orderRoute);
// app.use("/api", paymentRoute);
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
