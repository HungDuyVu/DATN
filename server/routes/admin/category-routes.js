const express = require("express");
const { fetchAllCategories, addCategory, editCategory, deleteCategory, activeCategory } = require("../../controllers/admin/category-controller");


const router = express.Router();

router.get("/", fetchAllCategories);
router.post("/add", addCategory);
router.put("/edit/:_id", editCategory);
router.delete("/delete/:_id", deleteCategory);
router.patch("/activate/:_id", activeCategory);

module.exports = router;
