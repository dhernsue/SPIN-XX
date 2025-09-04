// install: npm install express axios body-parser dotenv
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config(); // .env load karega

const app = express();
app.use(bodyParser.json());

// Environment variables se keys uthayenge
const clientId = process.env.CASHFREE_CLIENT_ID;
const clientSecret = process.env.CASHFREE_CLIENT_SECRET;

// API call to create payment order
app.post("/create-order", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.cashfree.com/pg/orders",
      {
        order_id: "order_" + Date.now(),
        order_amount: req.body.amount,
        order_currency: "INR",
        customer_details: {
          customer_id: "CUST123",
          customer_email: "test@example.com",
          customer_phone: "9999999999"
        }
      },
      {
        headers: {
          "x-client-id": clientId,
          "x-client-secret": clientSecret,
          "x-api-version": "2022-09-01",
          "Content-Type": "application/json"
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
