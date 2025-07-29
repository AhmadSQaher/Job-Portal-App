import express from "express";
import userCtrl from "../controllers/user.controller.js";

const router = express.Router();

// Basic CRUD routes
router.get("/", userCtrl.list);
router.post("/create", userCtrl.create);
router.get("/:userId", userCtrl.read);
router.put("/:userId", userCtrl.update);
router.delete("/:userId", userCtrl.remove);

export default router;
