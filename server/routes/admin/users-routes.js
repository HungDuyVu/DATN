const express = require("express");
const { fetchAllUsers, changeRole, userDetail, deleteUser, activeUser } = require("../../controllers/admin/users-controller");

const router = express.Router();

router.get("/get", fetchAllUsers);
router.put("/change-role", changeRole);
router.get("/detail/:id", userDetail);
router.delete("/delete/:id", deleteUser);
router.put("/activate/:id", activeUser);

module.exports = router;