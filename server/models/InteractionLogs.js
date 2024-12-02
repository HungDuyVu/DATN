const mongoose = require("mongoose");

const InteractionLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    actionType: {
      type: String,
      enum: ["view", "click", "add_to_cart", "purchase"],
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    additionalInfo: {
      type: Object,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InteractionLog", InteractionLogSchema);
