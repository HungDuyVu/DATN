const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body; // Lấy email và mật khẩu từ yêu cầu

  try {
    const checkUser = await User.findOne({ email }); // Kiểm tra xem người dùng có tồn tại không
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first", // Nếu không tồn tại, trả về thông báo lỗi
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password // So sánh mật khẩu nhập vào với mật khẩu đã lưu trong cơ sở dữ liệu
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again", // Nếu mật khẩu không khớp, trả về thông báo lỗi
      });

    // Tạo token JWT nếu người dùng tồn tại và mật khẩu khớp
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" } // Đặt thời gian hết hạn cho token
    );

    // Gửi token trong cookie và phản hồi thông tin người dùng
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred", // Xử lý lỗi nếu có
    });
  }
};


//logout

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token; // Lấy token từ cookie

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY"); // Giải mã token
    req.user = decoded; // Thêm thông tin người dùng đã giải mã vào request
    next(); // Chuyển sang handler tiếp theo
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};



module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
