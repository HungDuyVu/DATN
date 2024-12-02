const mongoose = require("mongoose");

const UserPreferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    preferredCategories: [String],
    preferredBrands: [String],
    priceRange: {
      min: Number,
      max: Number,
    },
    feedbackSentiment: {
      type: String,
      enum: ["positive", "negative", "neutral"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserPreference", UserPreferenceSchema);
