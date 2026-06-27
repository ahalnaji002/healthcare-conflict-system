const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  getPendingRegistrations,
  getAdminDashboard,
  approveUser,
} = require("../controllers/adminController");

// GET /api/admin/pending-registrations
router.get("/pending-registrations", verifyToken, getPendingRegistrations);

// GET /api/admin/dashboard
router.get("/dashboard", verifyToken, getAdminDashboard);

// PUT /api/admin/approve-user/:id
router.put("/approve-user/:id", verifyToken, approveUser);

module.exports = router;
