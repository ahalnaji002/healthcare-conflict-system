const express = require("express");
const emergencyController = require("../controllers/emergencyController");

const router = express.Router();

router.post("/panic", emergencyController.createPanicAlert);
router.get("/active", emergencyController.getActiveAlerts);
router.patch("/:alertId/status", emergencyController.updateAlertStatus);
router.get("/doctor/:doctorId", emergencyController.getDoctorAlerts);
router.get("/doctors", emergencyController.getDoctorsForEmergency);
router.patch("/:alertId/assign", emergencyController.assignDoctor);

module.exports = router;
