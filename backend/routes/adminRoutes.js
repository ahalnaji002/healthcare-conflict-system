const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  getPendingRegistrations,
  getAdminDashboard,
  approveUser,
  rejectUser,
} = require("../controllers/adminController");

// GET /api/admin/pending-registrations
router.get("/pending-registrations", verifyToken, getPendingRegistrations);

// GET /api/admin/dashboard
router.get("/dashboard", verifyToken, getAdminDashboard);

// PUT /api/admin/approve-user/:id
router.put("/approve-user/:id", verifyToken, approveUser);

// PUT /api/admin/reject-user/:id
router.put("/reject-user/:id", verifyToken, rejectUser);

module.exports = router;
