const InteractionLog = require("../../models/InteractionLogs");
const Product = require("../../models/Product");
const User = require("../../models/User");

// Lấy tất cả các log tương tác với chi tiết người dùng và sản phẩm
const fetchAllInteractions = async (req, res) => {
   try {
      const interactions = await InteractionLog.find()
         .populate("userId", "userName email role status")
         .populate("productId", "title description category brand price salePrice averageReview");

      res.status(200).json({
         success: true,
         data: interactions
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      });
   }
};

// Lấy chi tiết tương tác của một người dùng cụ thể
const detailInteractionsUser = async (req, res) => {
   try {
      const userId = req.params;
      const interactions = await InteractionLog.find({ userId })
         .populate("productId", "title description category brand price salePrice averageReview");

      res.status(200).json({
         success: true,
         data: interactions
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      });
   }
};

// Ghi lại log tương tác
const logInteraction = async (req, res) => {
   try {
      const { userId, productId } = req.params;
      const { action } = req.body;

      const interaction = await InteractionLog.findOneAndUpdate(
         { userId, productId },
         {
            $inc: { [`actions.${action}.count`]: 1 }, // Increment the count.
            $set: { [`actions.${action}.time`]: new Date() } // Set the current time.
         },
         { new: true, upsert: true }
      )
         .populate("productId", "title description category brand price salePrice averageReview");

      res.status(200).json({
         success: true,
         data: interaction,
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};


module.exports = { fetchAllInteractions, detailInteractionsUser, logInteraction };
