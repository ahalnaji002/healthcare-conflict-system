const express = require("express");
const emergencyController = require("../controllers/emergencyController");

const router = express.Router();

router.post("/panic", emergencyController.createPanicAlert);
router.get("/active", emergencyController.getActiveAlerts);

module.exports = router;
