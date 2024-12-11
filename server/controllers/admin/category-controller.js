const Category = require("../../models/Category");
const { imageUploadUtil } = require("../../helpers/cloudinary");

// Fetch all categories
const fetchAllCategories = async (req, res) => {
   try {
      const now = Date.now();
      const deadline = 7 * 24 * 60 * 60 * 1000; // 7 ngày

      // Xóa mềm các danh mục có `status` quá hạn
      await Category.deleteMany({
         status: { $ne: null, $lte: new Date(now - deadline) }
      });

      // Lấy danh sách tất cả danh mục
      const categories = await Category.find();
      res.status(200).json({
         success: true,
         data: categories,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: "Error fetching categories",
      });
   }
};

// Add a new category
const addCategory = async (req, res) => {
   try {
      const { id, label, image } = req.body;

      // Kiểm tra id đã tồn tại
      const existingCategory = await Category.findOne({ id });
      if (existingCategory) {
         return res.status(400).json({
            success: false,
            message: "ID already exists. Please use a different ID.",
         });
      }

      // Tạo danh mục mới
      const newCategory = new Category({ id, label, image });
      await newCategory.save();

      res.status(201).json({
         success: true,
         data: newCategory,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: "Error adding category",
      });
   }
};

// Edit a category
const editCategory = async (req, res) => {
   try {
      const { _id } = req.params;
      const { id, label, image } = req.body;

      let findCategory = await Category.findById(_id);
      if (!findCategory) {
         return res.status(404).json({
            success: false,
            message: "Category not found",
         });
      }

      findCategory.id = id || findCategory.id;
      findCategory.label = label || findCategory.label;
      findCategory.image = image || findCategory.image;

      await findCategory.save();
      res.status(200).json({
         success: true,
         data: findCategory,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: "Error editing category",
      });
   }
};

// Soft delete a category
const deleteCategory = async (req, res) => {
   try {
      const { _id } = req.params;
      const deleteCategory = await Category.findByIdAndUpdate(
         _id,
         { status: new Date() },
         { new: true }
      );

      if (!deleteCategory) {
         return res.status(404).json({
            success: false,
            message: "Category not found",
         });
      }

      res.status(200).json({
         success: true,
         message: "Category deleted successfully",
         data: deleteCategory,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: "Error deleting category",
      });
   }
};

// Activate a category
const activeCategory = async (req, res) => {
   try {
      const { id } = req.params;

      const activeCategory = await Category.findByIdAndUpdate(
         id,
         { status: null },
         { new: true }
      );

      if (!activeCategory) {
         return res.status(404).json({
            success: false,
            message: "Category not found",
         });
      }

      res.status(200).json({
         success: true,
         message: "Category activated successfully",
         data: activeCategory,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: "Error activating category",
      });
   }
};

module.exports = {
   fetchAllCategories,
   addCategory,
   editCategory,
   deleteCategory,
   activeCategory,
};
