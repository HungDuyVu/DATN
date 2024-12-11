const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
   id: {
      type: String,
      required: true,
      unique: true
   },
   label: {
      type: String,
      required: true
   },
   image: {
      type: String,
      required: false
   },
   status: {
      type: Date,
      default: null,
   }
},
   {
      timestamps: true,
   });

module.exports = mongoose.model("Category", CategorySchema);