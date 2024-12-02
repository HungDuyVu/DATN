const mongoose = require("mongoose");

const RecommendationLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recommendedProducts: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        relevanceScore: Number,
      },
    ],
    context: {
      type: String,
      enum: ["chatbot", "shop_view"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    feedback: {
      clickedProductId: mongoose.Schema.Types.ObjectId,
      liked: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RecommendationLog", RecommendationLogSchema);
