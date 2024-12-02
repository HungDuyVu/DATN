const mongoose = require("mongoose");

const ProductTrendSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    clickCount: {
      type: Number,
      default: 0,
    },
    purchaseCount: {
      type: Number,
      default: 0,
    },
    averageReview: {
      type: Number,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductTrend", ProductTrendSchema);
