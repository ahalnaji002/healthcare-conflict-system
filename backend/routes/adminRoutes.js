const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  getPendingRegistrations,
  getAdminDashboard,
  approveUser,
  rejectUser,
  getAllUsers,
  updateUserStatus,
  getNGOs,
  getUnassignedPatients,
  getDoctorsList,
  assignPatientToDoctor,
} = require("../controllers/adminController");

// GET /api/admin/pending-registrations
router.get("/pending-registrations", verifyToken, getPendingRegistrations);

// GET /api/admin/dashboard
router.get("/dashboard", verifyToken, getAdminDashboard);

// PUT /api/admin/approve-user/:id
router.put("/approve-user/:id", verifyToken, approveUser);

// PUT /api/admin/reject-user/:id
router.put("/reject-user/:id", verifyToken, rejectUser);

// GET /api/admin/users
router.get("/users", verifyToken, getAllUsers);

// PATCH /api/admin/users/:id/status
router.patch("/users/:id/status", verifyToken, updateUserStatus);

// GET /api/admin/ngos
router.get("/ngos", verifyToken, getNGOs);
// GET /api/admin/system-stats
router.get("/system-stats", verifyToken, getAdminDashboard);
// GET /api/admin/unassigned-patients
router.get("/unassigned-patients", verifyToken, getUnassignedPatients);

// GET /api/admin/doctors-list
router.get("/doctors-list", verifyToken, getDoctorsList);

// POST /api/admin/assign-patient
router.post("/assign-patient", verifyToken, assignPatientToDoctor);

module.exports = router;
