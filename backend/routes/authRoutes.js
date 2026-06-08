const express = require("express");
const router = express.Router();

const {
  registerPatient,
  registerStaff,
  login,
  forgotPassword,
  verifyEmail,
  getProfile,
  getDoctorPatients,
  getDoctorPatientRecord,
  getPatientDoctor,
  resendCode,
  verifyCode,
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

// Get Doctor Patients
router.get("/doctor-patients", verifyToken, getDoctorPatients);

// Get Doctor Patients Record
router.get("/doctor-patients/:patientId", verifyToken, getDoctorPatientRecord);

// Get  Patient Doctor
router.get("/patient-doctor", verifyToken, getPatientDoctor);

// RESEND VERIFICATION CODE
router.post("/resend-code", resendCode);

router.post("/verify-code", verifyCode);
router.post("/resend-code", resendCode);

module.exports = router;
