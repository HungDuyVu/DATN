const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

// Đăng ký người dùng mới
router.post("/register", registerUser);

// Đăng nhập người dùng
router.post("/login", loginUser);

// Đăng xuất người dùng
router.post("/logout", logoutUser);

// Kiểm tra xác thực người dùng qua middleware authMiddleware
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;

