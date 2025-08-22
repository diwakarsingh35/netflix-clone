const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");


router.get("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Hide password
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ message: "Server error while fetching users" });
  }
});


router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).json({ message: "Server error while deleting user" });
  }
});


router.put("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (err) {
    console.error("Error updating user:", err.message);
    res.status(500).json({ message: "Server error while updating user" });
  }
});


router.put("/block/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.blocked = !user.blocked; // toggle blocked status
    await user.save();

    res.status(200).json({
      message: user.blocked ? "User blocked" : "User unblocked",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        blocked: user.blocked,
      },
    });
  } catch (err) {
    console.error("Error blocking/unblocking user:", err.message);
    res.status(500).json({ message: "Server error while blocking/unblocking user" });
  }
});

module.exports = router;
