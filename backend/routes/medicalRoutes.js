const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const { getMyPlan, prescribe } = require("../controllers/medicalController");

// GET patient's treatment plan (patient)
router.get("/my-plan", verifyToken, getMyPlan);

// POST prescribe medication to a patient (doctor)
router.post("/prescribe", verifyToken, prescribe);

module.exports = router;