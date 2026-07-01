const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  createRequest,
  getAllRequests,
  assignNGO,
  getMyTasks,
  updateTaskStatus,
  getMyProfile,
} = require("../controllers/requestController");

// POST /api/requests/create
router.post("/create", verifyToken, createRequest);

// GET /api/requests/admin/all
router.get("/admin/all", verifyToken, getAllRequests);

// PUT /api/requests/admin/assign/:id
router.put("/admin/assign/:id", verifyToken, assignNGO);

// GET /api/requests/ngo/my-tasks
router.get("/ngo/my-tasks", verifyToken, getMyTasks);

// PUT /api/requests/ngo/update-status/:id
router.put("/ngo/update-status/:id", verifyToken, updateTaskStatus);

router.get("/ngo/profile", verifyToken, getMyProfile);
module.exports = router;
