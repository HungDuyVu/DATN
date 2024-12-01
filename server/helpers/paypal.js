// require('dotenv').config(); // Đảm bảo dotenv được cài đặt và cấu hình

const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: process.env.PAYPAL_MODE || "sandbox", // Mặc định là sandbox nếu không có giá trị
  client_id: process.env.PAYPAL_CLIENT_ID || "your_fake_client_id",
  client_secret: process.env.PAYPAL_CLIENT_SECRET || "your_fake_client_secret",
});

module.exports = paypal;
