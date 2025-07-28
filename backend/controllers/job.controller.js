import Job from "../models/job.model.js";
import errorHandler from "./error.controller.js";
import extend from "lodash/extend.js";

// GET /api/jobs
export const list = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.json(jobs);
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve jobs",
    });
  }
};

// GET /api/jobs/:jobId
export const read = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({
        error: "Job not found",
      });
    }
    res.json(job);
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve job",
    });
  }
};

// POST /api/jobs
export const create = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.json(job);
  } catch (err) {
    return res.status(400).json({
      error: "Could not create job",
    });
  }
};

// PUT /api/jobs/:jobId
export const update = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.jobId,
      { $set: req.body },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        error: "Job not found",
      });
    }

    res.json(job);
  } catch (err) {
    return res.status(400).json({
      error: "Could not update job",
    });
  }
};

// DELETE /api/jobs/:jobId
export const remove = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.jobId);
    if (!job) {
      return res.status(404).json({
        error: "Job not found",
      });
    }
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete job",
    });
  }
};

// Admin Job Management Methods

// POST /api/admin/jobs/:jobId/approve
export const approveJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.jobId,
      { $set: { status: "active" } },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        error: "Job not found",
      });
    }

    res.json({ message: "Job approved successfully", job });
  } catch (err) {
    return res.status(400).json({
      error: "Could not approve job",
    });
  }
};

// POST /api/admin/jobs/:jobId/reject
export const rejectJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.jobId,
      { $set: { status: "rejected" } },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        error: "Job not found",
      });
    }

    res.json({ message: "Job rejected successfully", job });
  } catch (err) {
    return res.status(400).json({
      error: "Could not reject job",
    });
  }
};

// POST /api/admin/jobs/:jobId/delete
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.jobId);
    if (!job) {
      return res.status(404).json({
        error: "Job not found",
      });
    }
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete job",
    });
  }
};

// PUT /api/admin/jobs/:jobId/update
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.jobId,
      { $set: req.body },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        error: "Job not found",
      });
    }

    res.json({ message: "Job updated successfully", job });
  } catch (err) {
    return res.status(400).json({
      error: "Could not update job",
    });
  }
};

// Bulk Job Actions

// POST /api/admin/jobs/bulk/approve
export const bulkApproveJobs = async (req, res) => {
  try {
    const { jobIds } = req.body;

    if (!jobIds || !Array.isArray(jobIds)) {
      return res.status(400).json({
        error: "Job IDs array is required",
      });
    }

    const result = await Job.updateMany(
      { _id: { $in: jobIds } },
      { $set: { status: "active" } }
    );

    res.json({
      message: `${result.modifiedCount} jobs approved successfully`,
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not approve jobs",
    });
  }
};

// POST /api/admin/jobs/bulk/reject
export const bulkRejectJobs = async (req, res) => {
  try {
    const { jobIds } = req.body;

    if (!jobIds || !Array.isArray(jobIds)) {
      return res.status(400).json({
        error: "Job IDs array is required",
      });
    }

    const result = await Job.updateMany(
      { _id: { $in: jobIds } },
      { $set: { status: "rejected" } }
    );

    res.json({
      message: `${result.modifiedCount} jobs rejected successfully`,
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not reject jobs",
    });
  }
};

// POST /api/admin/jobs/bulk/delete
export const bulkDeleteJobs = async (req, res) => {
  try {
    const { jobIds } = req.body;

    if (!jobIds || !Array.isArray(jobIds)) {
      return res.status(400).json({
        error: "Job IDs array is required",
      });
    }

    const result = await Job.deleteMany({ _id: { $in: jobIds } });

    res.json({
      message: `${result.deletedCount} jobs deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete jobs",
    });
  }
};

export default {
  list,
  read,
  create,
  update,
  remove,
  approveJob,
  rejectJob,
  deleteJob,
  updateJob,
  bulkApproveJobs,
  bulkRejectJobs,
  bulkDeleteJobs,
};
