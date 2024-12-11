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
    actions: {
      view: {
        count: { type: Number, default: 0 },
        time: { type: Date, default: null },
      },
      click: {
        count: { type: Number, default: 0 },
        time: { type: Date, default: null },
      },
      add_to_cart: {
        count: { type: Number, default: 0 },
        time: { type: Date, default: null },
      },
      purchase: {
        count: { type: Number, default: 0 },
        time: { type: Date, default: null },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InteractionLog", InteractionLogSchema);
