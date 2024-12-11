const Brand = require("../../models/Brand");
const { imageUploadUtil } = require("../../helpers/cloudinary");

const fetchAllBrands = async (req, res) => {
   try {
      const now = Date.now();
      const deadline = 7 * 24 * 60 * 60 * 1000; // 7 ngày

      // Xóa mềm các thương hiệu có `status` quá hạn
      await Brand.deleteMany({
         status: { $ne: null, $lte: new Date(now - deadline) }
      });

      // Lấy danh sách tất cả thương hiệu
      const brands = await Brand.find();
      res.status(200).json({
         success: true,
         data: brands,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: "Error fetching brands",
      });
   }
};


const addBrand = async (req, res) => {
   try {
      const { id, label, image } = req.body;

      // Kiểm tra id đã tồn tại
      const existingBrand = await Brand.findOne({ id });
      if (existingBrand) {
         return res.status(400).json({
            success: false,
            message: "ID already exists. Please use a different ID.",
         });
      }

      // Tạo thương hiệu mới
      const newBrand = new Brand({ id, label, image });
      await newBrand.save();

      res.status(201).json({
         success: true,
         data: newBrand,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: "Error adding brand",
      });
   }
};

const editeBrand = async (req, res) => {
   try {
      const { _id } = req.params;
      const {
         id,
         label,
         image
      } = req.body;

      let findBrand = await Brand.findById(_id);
      if (!findBrand) {
         return res.status(404).json({
            success: false,
            message: "Brand not found",
         });
      }

      findBrand.id = id || findBrand.id;
      findBrand.label = label || findBrand.label;
      findBrand.image = image || findBrand.image;

      await findBrand.save();
      res.status(200).json({
         success: true,
         data: findBrand,
      });

   } catch (error) {
      console.log(error);
      res.status(500).json({
         success: false,
         message: "Error editing brand",
      });
   }
};

const deleteBrand = async (req, res) => {
   try {
      const { _id } = req.params;
      const deleteBrand = await Brand.findByIdAndUpdate(
         _id,
         { status: new Date() },
         { new: true }
      )

      if (!deleteBrand) {
         return res.status(404).json({
            success: false,
            message: "Brand not found",
         });
      }

      res.status(200).json({
         success: true,
         message: "Brand deleted successfully",
         data: deleteBrand,
      })
   } catch (error) {
      console.log(error);
      res.status(500).json({
         success: false,
         message: "Error deleting brand",
      });
   }
};

const activeBrand = async (req, res) => {
   try {
      const { id } = req.params;

      const activeBrand = await Brand.findByIdAndUpdate(
         id,
         { status: null },
         { new: true }
      )

      if (!activeBrand) {
         return res.status(404).json({
            success: false,
            message: "Brand not found",
         });
      }

      res.status(200).json({
         success: true,
         message: "Brand activated successfully",
         data: activeBrand,
      })
   } catch (error) {
      console.log(error);
      res.status(500).json({
         success: false,
         message: "Error activating brand",
      });
   }
};

module.exports = {
   fetchAllBrands,
   addBrand,
   editeBrand,
   deleteBrand,
   activeBrand,
}