const express = require("express");
const router = express.Router();

const {
  registerPatient,
  registerStaff,
  login,
  forgotPassword,
  verifyEmail,
  getProfile,
} = require("../controllers/authController");

const verifyToken = require("../middleware/authMiddleware");

// Register Patient
router.post("/register-patient", registerPatient);

// Register Staff (doctor or ngo)
router.post("/register-staff", registerStaff);

// Unified Login (all roles)
router.post("/login", login);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Verify Email
router.get("/verify-email/:token", verifyEmail);

// Get Current User Profile (protected)
router.get("/profile", verifyToken, getProfile);

module.exports = router;
