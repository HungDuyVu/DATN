const User = require("../../models/User");

const fetchAllUsers = async (req, res) => {
    try {
        const now = Date.now();
        const deadline = 7 * 14 * 60 * 60 * 1000;

        // xoa vinh vien neu status qua 7 ngay
        await User.deleteMany({
            status: { $ne: null, $le: new Date(now - deadline) },
        });

        // fetch all users
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users,
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occurred while fetching users",
        })
    }
};

const changeRole = async (req, res) => {
    try {
        const { userId, role } = req.body;

        const updateUserRole = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true }
        )
        if (!updateUserRole) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "User role updated successfully",
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occurred while changing role",
        })
    }
};

const userDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        res.status(200).json({
            success: true,
            data: user,
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occurred while fetching user detail",
        })
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteUser = await User.findByIdAndUpdate(
            id,
            { stauts: new Date() }, // dat thoi gian hien tai
            { new: true }
        )

        if (!deleteUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: deleteUser
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occurred while deleting user",
        })
    }
};

const activeUser = async (req, res) => {
    try {
        const { id } = req.params;

        const activeUser = await User.findByIdAndUpdate(
            id,
            { stauts: null }, // dat status ve null
            { new: true }
        )

        if (!activeUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "User activated successfully",
            data: activeUser
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occurred while activating user",
        })
    }
};

module.exports = {
    fetchAllUsers,
    changeRole,
    userDetail,
    deleteUser,
    activeUser,
};