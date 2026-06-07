const express = require("express");
const router = express.Router();

const {
  register,
  registerPatient,
  registerStaff,
  login,
  forgotPassword,
} = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

// Old register (kept for reference)
router.post("/register", register);

// Register Patient
router.post("/register-patient", registerPatient);

// Register Staff (doctor or ngo)
router.post("/register-staff", registerStaff);

// Unified Login (all roles)
router.post("/login", login);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Protected test route
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

module.exports = router;