const mongoose = require("mongoose");

const FeedbackLogSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      relatedRecommendationId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "RecommendationLog",
      },
      productId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Product",
      },
      feedbackType: {
         type: String,
         enum: ["positive", "negative", "neutral"],
      },
      feedbackMessage: String,
      timestamp: {
         type: Date,
         default: Date.now,
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("FeedbackLog", FeedbackLogSchema);
