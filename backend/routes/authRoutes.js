const express = require("express");
const router = express.Router();

const {
  registerPatient,
  registerStaff,
  login,
  forgotPassword,
  getProfile,
  getDoctorPatients,
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

// Get Current User Profile (protected)
router.get("/profile", verifyToken, getProfile);

// Get Doctor Patients
router.get("/doctor-patients", verifyToken, getDoctorPatients);

module.exports = router;
