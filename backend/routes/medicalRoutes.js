const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const { getMyPlan } = require("../controllers/medicalController");

router.get("/my-plan", verifyToken, getMyPlan);

module.exports = router;
