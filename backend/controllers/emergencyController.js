const db = require("../config/db");

// POST /api/emergency/panic
const createPanicAlert = (req, res) => {
  const { patient_id, lat, long, mobile_number, description, manual_location } =
    req.body;
  const location =
    lat && long
      ? `${lat}, ${long}`
      : manual_location || "Location not provided";
  const sql = `
    INSERT INTO emergency_alerts
      (patient_id, mobile_number, location, description, status)
    VALUES (?, ?, ?, ?, 'new')
  `;

  db.query(
    sql,
    [
      patient_id || null,
      mobile_number || null,
      location,
      description || "Emergency panic alert",
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "حدث خطأ داخلي في الخادم أثناء معالجة بلاغ الطوارئ.",
          detailed_error: err.message,
        });
      }

      return res.status(201).json({
        success: true,
        message: "Emergency alert created successfully",
        alert_id: result.insertId,
      });
    },
  );
};

// GET /api/emergency/patient/:patientId/status
const getPatientEmergencyStatus = (req, res) => {
  const { patientId } = req.params;

  const sql = `
    SELECT status
    FROM emergency_alerts
    WHERE patient_id = ?
    ORDER BY created_at DESC
    LIMIT 1
  `;

  db.query(sql, [patientId], (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch patient emergency status.",
        detailed_error: err.message,
      });
    }

    if (rows.length === 0) {
      return res.status(200).json({
        success: true,
        status: "Safe",
      });
    }

    const latestStatus = rows[0].status;

    let displayStatus = "Safe";

    if (latestStatus === "new") {
      displayStatus = "Emergency";
    } else if (latestStatus === "in_progress") {
      displayStatus = "In Progress";
    } else if (latestStatus === "resolved") {
      displayStatus = "Safe";
    }

    return res.status(200).json({
      success: true,
      status: displayStatus,
      raw_status: latestStatus,
    });
  });
};

// GET /api/emergency/active
const getActiveAlerts = (req, res) => {
  const sql = `
    SELECT *
    FROM emergency_alerts
    WHERE status IN ('new', 'in_progress')
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, alerts) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch active emergency alerts.",
        detailed_error: err.message,
      });
    }

    return res.status(200).json({
      success: true,
      alerts,
    });
  });
};

// PATCH /api/emergency/:alertId/status
const updateAlertStatus = (req, res) => {
  const { alertId } = req.params;
  const { status } = req.body;

  const allowedStatuses = ["new", "in_progress", "resolved"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid emergency alert status.",
    });
  }

  const sql = `
    UPDATE emergency_alerts
    SET status = ?
    WHERE alert_id = ?
  `;

  db.query(sql, [status, alertId], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to update emergency alert status.",
        detailed_error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Emergency alert not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Emergency alert status updated successfully.",
    });
  });
};

// GET /api/emergency/doctor/:doctorId
const getDoctorAlerts = (req, res) => {
  const { doctorId } = req.params;

  const sql = `
    SELECT *
    FROM emergency_alerts
    WHERE doctor_id = ?
      AND status IN ('new', 'in_progress')
    ORDER BY created_at DESC
  `;

  db.query(sql, [doctorId], (err, alerts) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch doctor alerts.",
        detailed_error: err.message,
      });
    }

    return res.status(200).json({
      success: true,
      alerts,
    });
  });
};

// PATCH /api/emergency/:alertId/assign
const assignDoctor = (req, res) => {
  const { alertId } = req.params;
  const { doctor_id } = req.body;

  const sql = `
    UPDATE emergency_alerts
    SET doctor_id = ?, status = 'in_progress'
    WHERE alert_id = ?
  `;

  db.query(sql, [doctor_id, alertId], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to assign doctor.",
        detailed_error: err.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor assigned successfully.",
    });
  });
};

// GET /api/emergency/doctors
const getDoctorsForEmergency = (req, res) => {
  const sql = `
    SELECT id, full_name, email, role
    FROM users
    WHERE role = 'doctor'
    ORDER BY full_name ASC
  `;

  db.query(sql, (err, doctors) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch doctors.",
        detailed_error: err.message,
      });
    }

    return res.status(200).json({
      success: true,
      doctors,
    });
  });
};

module.exports = {
  createPanicAlert,
  getPatientEmergencyStatus,
  getActiveAlerts,
  updateAlertStatus,
  getDoctorAlerts,
  assignDoctor,
  getDoctorsForEmergency,
};
