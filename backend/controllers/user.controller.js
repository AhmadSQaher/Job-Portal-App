import User from "../models/user.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

// GET /api/users
export const list = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve users",
    });
  }
};

// GET /api/users/:userId
export const read = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user",
    });
  }
};

// PUT /api/users/:userId
export const update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: "Could not update user",
    });
  }
};

// DELETE /api/users/:userId
export const remove = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete user",
    });
  }
};

// Admin User Management Methods

// POST /api/admin/users/:userId/suspend
export const suspendUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: { status: "suspended" } },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({ message: "User suspended successfully", user });
  } catch (err) {
    return res.status(400).json({
      error: "Could not suspend user",
    });
  }
};

// POST /api/admin/users/:userId/activate
export const activateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: { status: "active" } },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({ message: "User activated successfully", user });
  } catch (err) {
    return res.status(400).json({
      error: "Could not activate user",
    });
  }
};

// POST /api/admin/users/:userId/delete
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete user",
    });
  }
};

// POST /api/admin/users/:userId/update
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({ message: "User updated successfully", user });
  } catch (err) {
    return res.status(400).json({
      error: "Could not update user",
    });
  }
};

// Bulk User Actions

// POST /api/admin/users/bulk/suspend
export const bulkSuspendUsers = async (req, res) => {
  try {
    const { userIds } = req.body;

    if (!userIds || !Array.isArray(userIds)) {
      return res.status(400).json({
        error: "User IDs array is required",
      });
    }

    const result = await User.updateMany(
      { _id: { $in: userIds } },
      { $set: { status: "suspended" } }
    );

    res.json({
      message: `${result.modifiedCount} users suspended successfully`,
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not suspend users",
    });
  }
};

// POST /api/admin/users/bulk/activate
export const bulkActivateUsers = async (req, res) => {
  try {
    const { userIds } = req.body;

    if (!userIds || !Array.isArray(userIds)) {
      return res.status(400).json({
        error: "User IDs array is required",
      });
    }

    const result = await User.updateMany(
      { _id: { $in: userIds } },
      { $set: { status: "active" } }
    );

    res.json({
      message: `${result.modifiedCount} users activated successfully`,
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not activate users",
    });
  }
};

// POST /api/admin/users/bulk/delete
export const bulkDeleteUsers = async (req, res) => {
  try {
    const { userIds } = req.body;

    if (!userIds || !Array.isArray(userIds)) {
      return res.status(400).json({
        error: "User IDs array is required",
      });
    }

    const result = await User.deleteMany({ _id: { $in: userIds } });

    res.json({
      message: `${result.deletedCount} users deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete users",
    });
  }
};

// POST /api/users/create
export const create = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const userResponse = user.toObject();
    delete userResponse.password;
    res.json(userResponse);
  } catch (err) {
    return res.status(400).json({
      error: "Could not create user",
    });
  }
};

export default {
  list,
  read,
  create,
  update,
  remove,
  suspendUser,
  activateUser,
  deleteUser,
  updateUser,
  bulkSuspendUsers,
  bulkActivateUsers,
  bulkDeleteUsers,
};
