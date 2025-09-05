// install: npm install express axios body-parser cors dotenv
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// ---------------- Deposit: Create Order ----------------
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
          customer_phone: "9999999999",
        },
      },
      {
        headers: {
          "x-client-id": clientId,
          "x-client-secret": clientSecret,
          "x-api-version": "2022-09-01",
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// ---------------- Add Beneficiary ----------------
app.post("/add-beneficiary", async (req, res) => {
  try {
    const response = await axios.post(
      "https://payout-api.cashfree.com/payout/v1/addBeneficiary",
      {
        beneId: req.body.beneId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        bankAccount: req.body.bankAccount,
        ifsc: req.body.ifsc,
        address1: "Test address",
      },
      {
        headers: {
          "X-Client-Id": clientId,
          "X-Client-Secret": clientSecret,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// ---------------- Withdraw ----------------
app.post("/withdraw", async (req, res) => {
  try {
    const response = await axios.post(
      "https://payout-api.cashfree.com/payout/v1/requestTransfer",
      {
        beneId: req.body.beneId,
        amount: req.body.amount,
        transferId: "txn_" + Date.now(),
      },
      {
        headers: {
          "X-Client-Id": clientId,
          "X-Client-Secret": clientSecret,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

app.listen(3000, () =>
  console.log("✅ Server running on http://localhost:3000")
);
