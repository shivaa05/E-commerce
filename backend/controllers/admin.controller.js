import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user || user.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "You are not allowed to access this resource" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 12;

    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-password");
    res.status(200).json({ totaleUsers: users.length, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user || user.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "You are not allowed to access this resource" });
    }

    const userIdToDelete = req.params.id;
    if (userIdToDelete === userId) {
      return res
        .status(400)
        .json({ message: "You cannot delete your own account" });
    }

    const userToDelete = await User.findById(userIdToDelete);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(userIdToDelete);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error Deleting users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user || user.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "You are not allowed to access this resource" });
    }

    const { newRole } = req.body;
    if (!newRole) {
      return res.status(404).json({
        message: "Role cannot be empty",
      });
    }

    if (newRole !== "Admin" || newRole !== "User") {
      return res.status(400).json({
        messsage: "Choose a Valid role",
      });
    }

    const userIdToUpdate = req.params.id;
    const userToUpdate = await User.findById(userIdToUpdate);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    userToUpdate.role = newRole;
    await userToUpdate.save();
    return res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    console.log("Error in updating role", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateOrderStatus = async (req, res) => {};

export const deleteOrder = async (req, res) => {};
