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
      need_request_id,
      patient_id,
      request_type,
      description,
      urgency_level,
      location,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
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
      console.error(err);
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

  const sql = `
UPDATE assistance_requests
SET
ngo_id=?,
status='in_progress'
WHERE assistance_request_id=?
`;

  db.query(sql, [ngo_id, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Server error",
      });
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
  const ngoId = req.user.id;

  const sql = `
SELECT *
FROM assistance_requests
WHERE ngo_id=?
ORDER BY created_at DESC
`;

  db.query(sql, [ngoId], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Server error",
      });
    }

    res.json(rows);
  });
};

// ======================================================
// NGO
// UPDATE STATUS
// PUT /api/requests/ngo/update-status/:id
// ======================================================

const updateTaskStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = `
UPDATE assistance_requests
SET status=?
WHERE assistance_request_id=?
`;

  db.query(sql, [status, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Server error",
      });
    }

    res.json({
      message: "Status updated successfully",
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
