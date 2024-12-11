const express = require("express");
const { fetchAllBrands, addBrand, editeBrand, deleteBrand, activeBrand } = require("../../controllers/admin/brand-controller");


const router = express.Router();

router.get("/", fetchAllBrands);
router.post("/add", addBrand);
router.put("/edit/:_id", editeBrand);
router.delete("/delete/:_id", deleteBrand);
router.patch("/activate/:_id", activeBrand);

module.exports = router;
