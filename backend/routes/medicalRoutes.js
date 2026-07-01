const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  getMyPlan,
  prescribe,
  getPatientHistory,
} = require("../controllers/medicalController");

// GET patient's own treatment plan (patient)
router.get("/my-plan", verifyToken, getMyPlan);

// POST prescribe medication to a patient (doctor)
router.post("/prescribe", verifyToken, prescribe);

// GET patient's full medical history - plans + medications (doctor)
router.get("/patient-history/:id", verifyToken, getPatientHistory);

module.exports = router;