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

module.exports = {
  getPendingRegistrations,
};
