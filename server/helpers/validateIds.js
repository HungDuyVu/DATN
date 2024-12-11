const mongoose = require("mongoose");

const validateIds = (req, res, next) => {
   const { userId, productId } = req.params;

   if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
   }

   if (productId && !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
   }

   next();
};

module.exports = validateIds;
