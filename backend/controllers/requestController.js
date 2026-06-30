const db = require("../config/db");

// ======================================================
// CREATE ASSISTANCE REQUEST
// POST /api/requests/create
// ======================================================

const createRequest = (req, res) => {
  const {
    need_request_id,
    patient_id,
    request_type,
    description,
    urgency_level,
    location,
  } = req.body;

  // Validate required fields
  if (!patient_id || !request_type) {
    return res.status(400).json({
      message: "Required fields: patient_id, request_type",
    });
  }

  const sql = `
    INSERT INTO assistance_requests
    (
      need_request_id,
      patient_id,
      request_type,
      description,
      urgency_level,
      location,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, 'pending')
  `;

  db.query(
    sql,
    [
      need_request_id || null,
      patient_id,
      request_type,
      description || null,
      urgency_level || "medium",
      location || null,
    ],
    (err, result) => {
      if (err) {
        console.error("CREATE REQUEST ERROR:", err);
        return res.status(500).json({
          message: "Server error",
        });
      }

      res.status(201).json({
        message: "Request created successfully",
        requestId: result.insertId,
      });
    },
  );
};

// ======================================================
// ADMIN
// GET ALL REQUESTS
// GET /api/requests/admin/all
// ======================================================

const getAllRequests = (req, res) => {
  const sql = `
    SELECT
      ar.*,
      u.full_name,
      u.email,
      n.organization_name
    FROM assistance_requests ar
    LEFT JOIN patients p
      ON ar.patient_id = p.patient_id
    LEFT JOIN users u
      ON p.user_id = u.id
    LEFT JOIN ngos n
      ON ar.ngo_id = n.ngo_id
    ORDER BY ar.created_at DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("GET ALL REQUESTS ERROR:", err);
      return res.status(500).json({
        message: "Server error",
      });
    }

    res.json(rows);
  });
};

// ======================================================
// ADMIN
// ASSIGN NGO
// PUT /api/requests/admin/assign/:id
// ======================================================

const assignNGO = (req, res) => {
  const { id } = req.params;
  const { ngo_id } = req.body;

  if (!ngo_id) {
    return res.status(400).json({ message: "ngo_id is required" });
  }

  const sql = `
    UPDATE assistance_requests
    SET ngo_id = ?, status = 'in_progress'
    WHERE assistance_request_id = ?
  `;

  db.query(sql, [ngo_id, id], (err, result) => {
    if (err) {
      console.error("ASSIGN NGO ERROR:", err);
      return res.status(500).json({
        message: "Server error",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Assistance request not found" });
    }

    res.json({
      message: "NGO assigned successfully",
    });
  });
};

// ======================================================
// NGO
// GET MY TASKS
// GET /api/requests/ngo/my-tasks
// ======================================================

const getMyTasks = (req, res) => {
  const userId = req.user.id;

  // Step 1: Find the ngo_id linked to this logged-in user
  const findNgoSql = "SELECT ngo_id FROM ngos WHERE user_id = ?";

  db.query(findNgoSql, [userId], (err, ngoResults) => {
    if (err) {
      console.error("GET MY TASKS - FIND NGO ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (ngoResults.length === 0) {
      return res.status(404).json({ message: "NGO profile not found" });
    }

    const ngoId = ngoResults[0].ngo_id;

    // Step 2: Fetch all assistance requests assigned to this NGO
    const sql = `
      SELECT
        ar.*,
        u.full_name,
        u.phone
      FROM assistance_requests ar
      LEFT JOIN patients p ON ar.patient_id = p.patient_id
      LEFT JOIN users u ON p.user_id = u.id
      WHERE ar.ngo_id = ?
      ORDER BY ar.created_at DESC
    `;

    db.query(sql, [ngoId], (tasksErr, rows) => {
      if (tasksErr) {
        console.error("GET MY TASKS ERROR:", tasksErr);
        return res.status(500).json({ message: "Server error" });
      }

      res.json(rows);
    });
  });
};

// ======================================================
// NGO
// UPDATE STATUS
// PUT /api/requests/ngo/update-status/:id
// ======================================================

const updateTaskStatus = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ["in_progress", "completed"];

  if (!status || !allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Status must be 'in_progress' or 'completed'",
    });
  }

  // Verify this NGO owns this request before updating
  const findNgoSql = "SELECT ngo_id FROM ngos WHERE user_id = ?";

  db.query(findNgoSql, [userId], (err, ngoResults) => {
    if (err) {
      console.error("UPDATE STATUS - FIND NGO ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (ngoResults.length === 0) {
      return res.status(404).json({ message: "NGO profile not found" });
    }

    const ngoId = ngoResults[0].ngo_id;

    const checkSql = `
      SELECT assistance_request_id FROM assistance_requests
      WHERE assistance_request_id = ? AND ngo_id = ?
    `;

    db.query(checkSql, [id, ngoId], (checkErr, checkResults) => {
      if (checkErr) {
        console.error("UPDATE STATUS - CHECK ERROR:", checkErr);
        return res.status(500).json({ message: "Server error" });
      }

      if (checkResults.length === 0) {
        return res.status(403).json({
          message: "This request is not assigned to your organization",
        });
      }

      const updateSql = `
        UPDATE assistance_requests
        SET status = ?
        WHERE assistance_request_id = ?
      `;

      db.query(updateSql, [status, id], (updateErr) => {
        if (updateErr) {
          console.error("UPDATE STATUS ERROR:", updateErr);
          return res.status(500).json({ message: "Server error" });
        }

        res.json({
          message: "Status updated successfully",
        });
      });
    });
  });
};

module.exports = {
  createRequest,
  getAllRequests,
  assignNGO,
  getMyTasks,
  updateTaskStatus,
};