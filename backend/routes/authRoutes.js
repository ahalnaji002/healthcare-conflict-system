const express = require("express");
const router = express.Router();

const {
  registerPatient,
  registerStaff,
  login,
  forgotPassword,
  getPatientProfile,
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

// Patient Profile
router.get("/patient-profile", verifyToken, getPatientProfile);

// Protected test route
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

module.exports = router;
