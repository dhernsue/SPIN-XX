import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const CASHFREE_APP_ID = "1040890260e1e86d8be631d1eff0980401";
const CASHFREE_SECRET_KEY = "cfsk_ma_prod_7976657e42bdb121b0c80dfd3bef2fa9_d0755517";
const BASE_URL = "https://api.cashfree.com/pg/orders";

// ✅ Create Order for Deposit
app.post("/create-order", async (req, res) => {
  const { amount } = req.body;
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": CASHFREE_APP_ID,
        "x-client-secret": CASHFREE_SECRET_KEY,
        "x-api-version": "2022-09-01"
      },
      body: JSON.stringify({
        order_id: "order_" + Date.now(),
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: "cust_" + Date.now(),
          customer_email: "demo@example.com",
          customer_phone: "9999999999"
        }
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// ✅ Handle Withdraw Request (manual for now)
app.post("/withdraw-request", (req, res) => {
  const { upi, amount } = req.body;
  // Yahan tum DB me save karo aur manually payout karo Cashfree Dashboard se
  res.json({ success: true, msg: "Withdraw request saved" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
