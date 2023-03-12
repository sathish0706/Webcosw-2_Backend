const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connected to the database");
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = db;
