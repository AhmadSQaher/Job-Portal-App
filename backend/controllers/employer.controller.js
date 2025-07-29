import Employer from "../models/employer.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

// GET /api/employers
export const list = async (req, res) => {
  try {
    const employers = await Employer.find({});
    res.json(employers);
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve employers",
    });
  }
};

// GET /api/employers/:employerId
export const read = async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.employerId);
    if (!employer) {
      return res.status(404).json({
        error: "Employer not found",
      });
    }
    res.json(employer);
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve employer",
    });
  }
};

// POST /api/employers
export const create = async (req, res) => {
  try {
    const employer = new Employer(req.body);
    await employer.save();
    res.json(employer);
  } catch (err) {
    return res.status(400).json({
      error: "Could not create employer",
    });
  }
};

// PUT /api/employers/:employerId
export const update = async (req, res) => {
  try {
    const employer = await Employer.findByIdAndUpdate(
      req.params.employerId,
      { $set: req.body },
      { new: true }
    );

    if (!employer) {
      return res.status(404).json({
        error: "Employer not found",
      });
    }

    res.json(employer);
  } catch (err) {
    return res.status(400).json({
      error: "Could not update employer",
    });
  }
};

// DELETE /api/employers/:employerId
export const remove = async (req, res) => {
  try {
    const employer = await Employer.findByIdAndDelete(req.params.employerId);
    if (!employer) {
      return res.status(404).json({
        error: "Employer not found",
      });
    }
    res.json({ message: "Employer deleted successfully" });
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete employer",
    });
  }
};

// Admin Employer Management Methods

// POST /api/admin/employers/:employerId/verify
export const verifyEmployer = async (req, res) => {
  try {
    const employer = await Employer.findByIdAndUpdate(
      req.params.employerId,
      { $set: { verified: true } },
      { new: true }
    );

    if (!employer) {
      return res.status(404).json({
        error: "Employer not found",
      });
    }

    res.json({ message: "Employer verified successfully", employer });
  } catch (err) {
    return res.status(400).json({
      error: "Could not verify employer",
    });
  }
};

// POST /api/admin/employers/:employerId/suspend
export const suspendEmployer = async (req, res) => {
  try {
    const employer = await Employer.findByIdAndUpdate(
      req.params.employerId,
      { $set: { status: "suspended" } },
      { new: true }
    );

    if (!employer) {
      return res.status(404).json({
        error: "Employer not found",
      });
    }

    res.json({ message: "Employer suspended successfully", employer });
  } catch (err) {
    return res.status(400).json({
      error: "Could not suspend employer",
    });
  }
};

// POST /api/admin/employers/:employerId/activate
export const activateEmployer = async (req, res) => {
  try {
    const employer = await Employer.findByIdAndUpdate(
      req.params.employerId,
      { $set: { status: "active" } },
      { new: true }
    );

    if (!employer) {
      return res.status(404).json({
        error: "Employer not found",
      });
    }

    res.json({ message: "Employer activated successfully", employer });
  } catch (err) {
    return res.status(400).json({
      error: "Could not activate employer",
    });
  }
};

// POST /api/admin/employers/:employerId/delete
export const deleteEmployer = async (req, res) => {
  try {
    const employer = await Employer.findByIdAndDelete(req.params.employerId);
    if (!employer) {
      return res.status(404).json({
        error: "Employer not found",
      });
    }
    res.json({ message: "Employer deleted successfully" });
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete employer",
    });
  }
};

// Bulk Employer Actions

// POST /api/admin/employers/bulk/verify
export const bulkVerifyEmployers = async (req, res) => {
  try {
    const { employerIds } = req.body;

    if (!employerIds || !Array.isArray(employerIds)) {
      return res.status(400).json({
        error: "Employer IDs array is required",
      });
    }

    const result = await Employer.updateMany(
      { _id: { $in: employerIds } },
      { $set: { verified: true } }
    );

    res.json({
      message: `${result.modifiedCount} employers verified successfully`,
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not verify employers",
    });
  }
};

// POST /api/admin/employers/bulk/suspend
export const bulkSuspendEmployers = async (req, res) => {
  try {
    const { employerIds } = req.body;

    if (!employerIds || !Array.isArray(employerIds)) {
      return res.status(400).json({
        error: "Employer IDs array is required",
      });
    }

    const result = await Employer.updateMany(
      { _id: { $in: employerIds } },
      { $set: { status: "suspended" } }
    );

    res.json({
      message: `${result.modifiedCount} employers suspended successfully`,
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not suspend employers",
    });
  }
};

// POST /api/admin/employers/bulk/delete
export const bulkDeleteEmployers = async (req, res) => {
  try {
    const { employerIds } = req.body;

    if (!employerIds || !Array.isArray(employerIds)) {
      return res.status(400).json({
        error: "Employer IDs array is required",
      });
    }

    const result = await Employer.deleteMany({ _id: { $in: employerIds } });

    res.json({
      message: `${result.deletedCount} employers deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete employers",
    });
  }
};

export default {
  list,
  read,
  create,
  update,
  remove,
  verifyEmployer,
  suspendEmployer,
  activateEmployer,
  deleteEmployer,
  bulkVerifyEmployers,
  bulkSuspendEmployers,
  bulkDeleteEmployers,
};
