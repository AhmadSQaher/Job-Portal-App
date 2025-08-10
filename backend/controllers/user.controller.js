import User from "../models/user.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { getUploadDir } from '../server/express.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GET /api/users
export const list = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: "Authentication required"
      });
    }

    // Only get users with role 'user' and select relevant fields
    const query = { role: 'user' };
    const users = await User.find(query)
      .select("name email phone location title bio skills resume")
      .lean();

    // Transform the users to include only necessary resume info
    const transformedUsers = users.map(user => {
      // Create a clean user object without the resume field first
      const { resume, ...userWithoutResume } = user;
      
      // Check if resume exists (either as file or valid object)
      const resumePath = user.resume?.filename ? path.join(getUploadDir(), user.resume.filename) : undefined;
      const hasResume = user.resume?.filename && user.resume?.originalName ? true : false;

      console.log(`Checking resume for user ${user._id}:`, {
        resumePath,
        hasResume,
        userResume: user.resume
      });
      
      return {
        ...userWithoutResume,
        hasResume,
        _id: user._id
      };
    });
    
    res.json(transformedUsers);
  } catch (err) {
    console.error('Error in user.list:', err);
    return res.status(500).json({
      error: "Could not retrieve users",
      details: err.message
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
    const allowedUpdates = [
      'name',
      'email',
      'phone',
      'location',
      'title',
      'bio',
      'skills',
      'experience',
      'education'
    ];

    // Filter out any fields that aren't in allowedUpdates
    const updateData = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updateData[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updateData },
      { 
        new: true,
        runValidators: true 
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    console.error('Update error:', err);
    return res.status(400).json({
      error: err.message || "Could not update user",
    });
  }
};

// DELETE /api/users/:userId
export const remove = async (req, res) => {
  try {
    // Authorization check: users can only delete their own account
    if (req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({
        error: "Not authorized to delete this account"
      });
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // If the user is an employer, delete all their posted jobs
    if (user.role === 'employer') {
      // Import Job model (need to add this import at the top)
      const Job = (await import('../models/job.model.js')).default;
      
      console.log(`Deleting jobs for employer: ${user._id}`);
      const deletedJobs = await Job.deleteMany({ postedBy: user._id });
      console.log(`Deleted ${deletedJobs.deletedCount} jobs for employer`);
    }

    // Delete the user
    await User.findByIdAndDelete(req.params.userId);
    
    res.json({ 
      message: "Account deleted successfully",
      deletedJobs: user.role === 'employer' ? "All posted jobs were also deleted" : undefined
    });
  } catch (err) {
    console.error('Error deleting user:', err);
    return res.status(400).json({
      error: "Could not delete user",
      details: err.message
    });
  }
};

// GET /api/users/:userId/resume
export const downloadResume = async (req, res) => {
  try {
    console.log('Download resume request for user:', req.params.userId);
    console.log('Authenticated user:', req.user?._id);
    
    const user = await User.findById(req.params.userId).select("resume role");
    console.log('Found user:', user ? 'yes' : 'no', 'Resume:', user?.resume);
    
    if (!user || !user.resume || !user.resume.filename) {
      console.log('Resume not found - User:', !!user, 'Resume:', !!user?.resume, 'Filename:', user?.resume?.filename);
      return res.status(404).json({
        error: "Resume not found"
      });
    }

    // Check permissions
    console.log('Checking permissions - User role:', req.user?.role);
    if (req.user.role !== 'admin' && req.user.role !== 'employer' && req.user._id.toString() !== user._id.toString()) {
      console.log('Permission denied - User role:', req.user.role);
      return res.status(403).json({
        error: "Not authorized to access this resume"
      });
    }

    // Try to find the resume file with supported extensions
    const supportedExts = ['.pdf', '.doc', '.docx'];
    let resumePath;
    let foundFile = false;

    console.log('Looking for resume file with extensions:', supportedExts);
    for (const ext of supportedExts) {
      const testPath = path.join(getUploadDir(), user.resume.filename + ext);
      console.log('Checking path:', testPath);
      if (fs.existsSync(testPath)) {
        resumePath = testPath;
        foundFile = true;
        break;
      }
    }

    if (!foundFile) {
      console.log('No resume file found with any supported extension');
      return res.status(404).json({
        error: "Resume file not found"
      });
    }
    
    console.log('Found resume file at:', resumePath);

    // Set the appropriate headers for file download
    res.download(resumePath, user.resume.originalName || 'resume.pdf');
  } catch (err) {
    console.error('Error downloading resume:', err);
    return res.status(400).json({
      error: "Could not download resume",
    });
  }
};

// POST /api/users/:userId/resume
export const uploadResume = async (req, res) => {
  try {
    // Check if the user has permission to upload
    if (req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({
        error: "Not authorized to upload resume for this user"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "No resume file uploaded"
      });
    }

    const resumePath = path.join(getUploadDir(), req.params.userId);

    // Update user document with resume info
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        resume: {
          filename: req.params.userId,
          originalName: req.file.originalname,
          uploadDate: new Date()
        }
      },
      { new: true }
    ).select("resume");

    if (!user) {
      // Clean up uploaded file
      if (fs.existsSync(resumePath)) {
        fs.unlinkSync(resumePath);
      }
      return res.status(404).json({
        error: "User not found"
      });
    }

    console.log(`Resume uploaded for user ${req.params.userId}:`, {
      path: resumePath,
      originalName: req.file.originalname
    });

    res.json({
      message: "Resume uploaded successfully",
      resume: user.resume
    });
  } catch (err) {
    console.error('Error uploading resume:', err);
    return res.status(400).json({
      error: "Could not upload resume",
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

export default {
  list,
  read,
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

// Clean up example resumes on startup
(async () => {
  try {
    await User.updateMany(
      { resume: "https://example.com/resume/emma" },
      { $set: { resume: null } }
    );
    console.log('Cleaned up example resumes');
  } catch (err) {
    console.error('Error cleaning up example resumes:', err);
  }
})();
