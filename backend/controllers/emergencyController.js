const db = require("../config/db");

// POST /api/emergency/panic
const createPanicAlert = (req, res) => {
  const { patient_id, lat, long, mobile_number, description } = req.body;

  const location = lat && long ? `${lat}, ${long}` : "Location not provided";

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

module.exports = {
  createPanicAlert,
  getActiveAlerts,
};
