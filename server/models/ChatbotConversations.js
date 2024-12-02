const mongoose = require("mongoose");

const ChatbotConversationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    messages: [
      {
        messageType: {
          type: String,
          enum: ["user_message", "bot_response"],
        },
        messageContent: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
        mentionedProducts: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatbotConversation", ChatbotConversationSchema);
