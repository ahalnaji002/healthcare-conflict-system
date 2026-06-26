const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  getPendingRegistrations,
  getAdminDashboard,
} = require("../controllers/adminController");

// GET /api/admin/pending-registrations
router.get("/pending-registrations", verifyToken, getPendingRegistrations);

// GET /api/admin/dashboard
router.get("/dashboard", verifyToken, getAdminDashboard);

module.exports = router;
