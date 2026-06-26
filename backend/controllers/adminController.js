const db = require("../config/db");

// ================= GET PENDING REGISTRATIONS =================
const getPendingRegistrations = (req, res) => {
  const sql = `
    SELECT
      join_request_id,
      request_type,
      name,
      email,
      phone,
      specialty,
      license_number,
      organization_type,
      description,
      status,
      created_at
    FROM join_requests
    WHERE status = 'pending'
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("GET PENDING REGISTRATIONS ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    return res.status(200).json({
      message: "Pending registrations fetched successfully",
      count: results.length,
      requests: results,
    });
  });
};

// ================= GET ADMIN DASHBOARD =================
const getAdminDashboard = (req, res) => {
  const statsSql = `
    SELECT
      (SELECT COUNT(*) FROM users) AS total_users,
      (SELECT COUNT(*) FROM users WHERE role = 'patient') AS total_patients,
      (SELECT COUNT(*) FROM users WHERE role = 'doctor') AS total_doctors,
      (SELECT COUNT(*) FROM users WHERE role = 'ngo') AS total_ngos,
      (SELECT COUNT(*) FROM users WHERE role = 'admin') AS total_admins,
      (SELECT COUNT(*) FROM join_requests WHERE status = 'pending') AS pending_join_requests,
      (SELECT COUNT(*) FROM emergency_alerts WHERE status IN ('new', 'in_progress')) AS active_cases,
      (SELECT COUNT(*) FROM emergency_alerts WHERE status = 'new') AS security_alerts
  `;

  const recentRequestsSql = `
    SELECT
      join_request_id,
      request_type,
      name,
      email,
      specialty,
      status,
      created_at
    FROM join_requests
    WHERE status = 'pending'
    ORDER BY created_at DESC
    LIMIT 3
  `;

  db.query(statsSql, (statsErr, statsResults) => {
    if (statsErr) {
      console.error("GET ADMIN DASHBOARD STATS ERROR:", statsErr);
      return res.status(500).json({ message: "Server error" });
    }

    db.query(recentRequestsSql, (requestsErr, requestsResults) => {
      if (requestsErr) {
        console.error("GET ADMIN DASHBOARD REQUESTS ERROR:", requestsErr);
        return res.status(500).json({ message: "Server error" });
      }

      return res.status(200).json({
        message: "Admin dashboard fetched successfully",
        stats: statsResults[0],
        recentRequests: requestsResults,
      });
    });
  });
};

module.exports = {
  getPendingRegistrations,
  getAdminDashboard,
};
