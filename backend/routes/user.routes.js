import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { list, read, update, remove, downloadResume, uploadResume } from "../controllers/user.controller.js";
import { getUploadDir } from "../server/express.js";

const router = express.Router();

// Configure multer for resume uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, getUploadDir());
  },
  filename: function (req, file, cb) {
    cb(null, req.user._id + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only PDF, DOC, and DOCX files are allowed!"));
  }
});

// Basic CRUD routes
router.get("/", list);
router.get("/:userId", read);
router.put("/:userId", update);
router.delete("/:userId", remove);
router.get("/:userId/resume", downloadResume);
router.post("/:userId/resume", upload.single('resume'), uploadResume);

export default router;
