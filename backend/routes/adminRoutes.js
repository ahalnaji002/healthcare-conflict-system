const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const { getPendingRegistrations } = require("../controllers/adminController");

// GET /api/admin/pending-registrations
router.get("/pending-registrations", verifyToken, getPendingRegistrations);

module.exports = router;
