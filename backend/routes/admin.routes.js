import express from "express";
import userCtrl from "../controllers/user.controller.js";
import employerCtrl from "../controllers/employer.controller.js";
import jobCtrl from "../controllers/job.controller.js";
import authCtrl from "../controllers/auth.controller.js";
import checkRole from "../middleware/roleCheck.js";

const router = express.Router();

// Admin-only access to view everything
router
  .route("/users")
  .get(authCtrl.requireSignin, checkRole(["dev"]), userCtrl.list);

router
  .route("/employers")
  .get(authCtrl.requireSignin, checkRole(["dev"]), employerCtrl.list);

router
  .route("/jobs")
  .get(authCtrl.requireSignin, checkRole(["dev"]), jobCtrl.list);

// User Management Routes
router
  .route("/users/:userId/suspend")
  .post(authCtrl.requireSignin, checkRole(["dev"]), userCtrl.suspendUser);

router
  .route("/users/:userId/activate")
  .post(authCtrl.requireSignin, checkRole(["dev"]), userCtrl.activateUser);

router
  .route("/users/:userId/delete")
  .post(authCtrl.requireSignin, checkRole(["dev"]), userCtrl.deleteUser);

router
  .route("/users/:userId/update")
  .put(authCtrl.requireSignin, checkRole(["dev"]), userCtrl.updateUser);

// Bulk User Actions
router
  .route("/users/bulk/suspend")
  .post(authCtrl.requireSignin, checkRole(["dev"]), userCtrl.bulkSuspendUsers);

router
  .route("/users/bulk/activate")
  .post(authCtrl.requireSignin, checkRole(["dev"]), userCtrl.bulkActivateUsers);

router
  .route("/users/bulk/delete")
  .post(authCtrl.requireSignin, checkRole(["dev"]), userCtrl.bulkDeleteUsers);

// Job Management Routes
router
  .route("/jobs/:jobId/approve")
  .post(authCtrl.requireSignin, checkRole(["dev"]), jobCtrl.approveJob);

router
  .route("/jobs/:jobId/reject")
  .post(authCtrl.requireSignin, checkRole(["dev"]), jobCtrl.rejectJob);

router
  .route("/jobs/:jobId/delete")
  .post(authCtrl.requireSignin, checkRole(["dev"]), jobCtrl.deleteJob);

router
  .route("/jobs/:jobId/update")
  .put(authCtrl.requireSignin, checkRole(["dev"]), jobCtrl.updateJob);

// Bulk Job Actions
router
  .route("/jobs/bulk/approve")
  .post(authCtrl.requireSignin, checkRole(["dev"]), jobCtrl.bulkApproveJobs);

router
  .route("/jobs/bulk/reject")
  .post(authCtrl.requireSignin, checkRole(["dev"]), jobCtrl.bulkRejectJobs);

router
  .route("/jobs/bulk/delete")
  .post(authCtrl.requireSignin, checkRole(["dev"]), jobCtrl.bulkDeleteJobs);

// Employer Management Routes
router
  .route("/employers/:employerId/verify")
  .post(
    authCtrl.requireSignin,
    checkRole(["dev"]),
    employerCtrl.verifyEmployer
  );

router
  .route("/employers/:employerId/suspend")
  .post(
    authCtrl.requireSignin,
    checkRole(["dev"]),
    employerCtrl.suspendEmployer
  );

router
  .route("/employers/:employerId/delete")
  .post(
    authCtrl.requireSignin,
    checkRole(["dev"]),
    employerCtrl.deleteEmployer
  );

// System Management Routes
router
  .route("/system/backup")
  .post(authCtrl.requireSignin, checkRole(["dev"]), (req, res) => {
    res.json({ message: "Backup created successfully" });
  });

router
  .route("/system/restart")
  .post(authCtrl.requireSignin, checkRole(["dev"]), (req, res) => {
    res.json({ message: "Services restarted successfully" });
  });

router
  .route("/system/stats")
  .get(authCtrl.requireSignin, checkRole(["dev"]), (req, res) => {
    res.json({
      totalUsers: 0,
      activeUsers: 0,
      totalJobs: 0,
      activeJobs: 0,
      totalEmployers: 0,
      verifiedEmployers: 0,
      systemUptime: "99.9%",
      lastBackup: "2 hours ago",
    });
  });

export default router;
