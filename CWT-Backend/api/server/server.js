const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(
  "mongodb+srv://maleksameer715:<db_password>@cwt.k3fgd.mongodb.net/?retryWrites=true&w=majority&appName=CWT",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// User Schema
const userSchema = new mongoose.Schema({
  companyName: String,
  address: String,
  city: String,
  province: String,
  postalCode: String,
  phoneNumber: String,
  email: String,
  owner: String,
  firstName: String,
  lastName: String,
  operationYear: String,
  annualPurchase: String,
  comments: String,
});

const User = mongoose.model("User", userSchema);

// API endpoint to create a user
app.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
