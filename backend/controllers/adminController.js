const db = require("../config/db");

const nodemailer = require("nodemailer");

const sendEmail = (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.sendMail({
    from: `"War Injuries Care" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

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
      (SELECT COUNT(*) FROM assistance_requests WHERE status = 'pending') AS pending_assistance_requests,
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

// ================= APPROVE USER =================
const approveUser = (req, res) => {
  const { id } = req.params;
  const adminId = req.user.id;

  const findRequestSql = `
    SELECT *
    FROM join_requests
    WHERE join_request_id = ? AND status = 'pending'
    LIMIT 1
  `;

  db.query(findRequestSql, [id], (err, requests) => {
    if (err) {
      console.error("FIND JOIN REQUEST ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (requests.length === 0) {
      return res.status(404).json({
        message: "Pending join request not found",
      });
    }

    const request = requests[0];

    const insertUserSql = `
      INSERT INTO users
        (full_name, email, password, phone, role, status, is_verified)
      VALUES (?, ?, ?, ?, ?, 'active', 1)
    `;

    db.query(
      insertUserSql,
      [
        request.name,
        request.email,
        request.password,
        request.phone || null,
        request.request_type,
      ],
      (userErr, userResult) => {
        if (userErr) {
          console.error("CREATE APPROVED USER ERROR:", userErr);
          return res
            .status(500)
            .json({ message: "Failed to create user account" });
        }

        const userId = userResult.insertId;

        if (request.request_type === "doctor") {
          const insertDoctorSql = `
            INSERT INTO doctors
              (user_id, specialty, license_number, clinic_name, workplace)
            VALUES (?, ?, ?, ?, ?)
          `;

          db.query(
            insertDoctorSql,
            [
              userId,
              request.specialty || null,
              request.license_number || null,
              request.organization_type || null,
              request.description || null,
            ],
            (doctorErr) => {
              if (doctorErr) {
                console.error("CREATE DOCTOR ERROR:", doctorErr);
                return res
                  .status(500)
                  .json({ message: "Failed to create doctor profile" });
              }

              finishApproval();
            },
          );
        } else {
          const insertNgoSql = `
            INSERT INTO ngos
              (user_id, organization_name, organization_type, service_area, support_categories)
            VALUES (?, ?, ?, ?, ?)
          `;

          db.query(
            insertNgoSql,
            [
              userId,
              request.organization_type || request.name,
              request.specialty || null,
              request.description || null,
              request.specialty || null,
            ],
            (ngoErr) => {
              if (ngoErr) {
                console.error("CREATE NGO ERROR:", ngoErr);
                return res
                  .status(500)
                  .json({ message: "Failed to create NGO profile" });
              }

              finishApproval();
            },
          );
        }

        function finishApproval() {
          const updateRequestSql = `
    UPDATE join_requests
    SET status = 'approved',
        reviewed_by = Null,
        reviewed_at = NOW()
    WHERE join_request_id = ?
  `;

          db.query(updateRequestSql, [id], (updateErr, updateResult) => {
            if (updateErr) {
              console.error("UPDATE JOIN REQUEST ERROR:", updateErr);
              return res
                .status(500)
                .json({ message: "Failed to update join request" });
            }

            console.log("JOIN REQUEST UPDATE RESULT:", updateResult);

            if (updateResult.affectedRows === 0) {
              return res.status(500).json({
                message: "User created, but join request was not updated",
              });
            }

            sendEmail(
              request.email,
              "Your Account Has Been Approved - War Injuries Care",
              `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: auto; padding: 20px;">
        <h2 style="color:#00478d;">War Injuries Care</h2>
        <p>Hello ${request.name},</p>
        <p>Your join request has been approved successfully.</p>
        <p>You can now log in using your email and the password you created during registration.</p>
        <div style="background:#f0f4ff; padding:16px; border-radius:10px; margin:20px 0;">
          <strong>Email:</strong> ${request.email}<br/>
          <strong>Role:</strong> ${request.request_type}
        </div>
        <p>Welcome to War Injuries Care.</p>
      </div>
      `,
            );

            return res.status(200).json({
              message: "User approved successfully and notification email sent",
              user_id: userId,
              role: request.request_type,
            });
          });
        }
      },
    );
  });
};

// ================= REJECT USER =================
const rejectUser = (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  if (!reason || !reason.trim()) {
    return res.status(400).json({ message: "Rejection reason is required" });
  }

  const findRequestSql = `
    SELECT *
    FROM join_requests
    WHERE join_request_id = ? AND status = 'pending'
    LIMIT 1
  `;

  db.query(findRequestSql, [id], (err, requests) => {
    if (err) {
      console.error("FIND JOIN REQUEST ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (requests.length === 0) {
      return res
        .status(404)
        .json({ message: "Pending join request not found" });
    }

    const request = requests[0];

    const updateSql = `
      UPDATE join_requests
      SET status = 'rejected',
          rejection_reason = ?,
          reviewed_by = NULL,
          reviewed_at = NOW()
      WHERE join_request_id = ?
    `;

    db.query(updateSql, [reason.trim(), id], (updateErr) => {
      if (updateErr) {
        console.error("REJECT JOIN REQUEST ERROR:", updateErr);
        return res.status(500).json({ message: "Failed to reject request" });
      }

      sendEmail(
        request.email,
        "Registration Request Update - War Injuries Care",
        `
        <div style="font-family: Arial, sans-serif; max-width: 520px; margin: auto; padding: 20px;">
          <h2 style="color:#00478d;">War Injuries Care</h2>
          <p>Hello ${request.name},</p>
          <p>After carefully reviewing your registration request, we are unable to approve your application at this time.</p>
          <div style="background:#fff1f2; border-left:5px solid #dc2626; padding:16px; border-radius:10px; margin:20px 0;">
            <strong>Reason:</strong><br/>
            ${reason.trim()}
          </div>
          <p>Once the issue has been resolved, you are welcome to submit a new registration request for review.</p>
          <hr style="margin:30px 0;border:none;border-top:1px solid #eee;">

          <p style="font-size:13px;color:#777;">
          If you believe this decision was made in error or you need further clarification,
          please contact the War Injuries Care support team.
          </p>

          <p style="font-size:13px;color:#777;">
          Thank you for your understanding.
          </p>
        </div>
        `,
      );

      return res.status(200).json({
        message: "Request rejected successfully and notification email sent",
      });
    });
  });
};

// ================= GET ALL USERS =================
const getAllUsers = (req, res) => {
  const sql = `
    SELECT
      id,
      full_name,
      email,
      phone,
      role,
      status,
      is_verified,
      created_at
    FROM users
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("GET ALL USERS ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    return res.status(200).json({
      message: "Users fetched successfully",
      count: results.length,
      users: results,
    });
  });
};

// ================= UPDATE USER STATUS =============
const updateUserStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["active", "inactive"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const sql = `
    UPDATE users
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error("UPDATE USER STATUS ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: `User ${status === "active" ? "activated" : "suspended"} successfully`,
    });
  });
};

// ================= GET ALL NGOS =============
const getNGOs = (req, res) => {
  const sql = `
    SELECT
      ngo_id,
      organization_name
    FROM ngos
    ORDER BY organization_name
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
// ================= GET UNASSIGNED PATIENTS =================
const getUnassignedPatients = (req, res) => {
  const sql = `
    SELECT
      p.patient_id,
      u.full_name,
      u.email,
      p.medical_condition
    FROM patients p
    JOIN users u ON p.user_id = u.id
    WHERE p.patient_id NOT IN (
      SELECT patient_id FROM patient_doctor
    )
    ORDER BY u.full_name
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("GET UNASSIGNED PATIENTS ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    return res.status(200).json({
      message: "Unassigned patients fetched successfully",
      count: rows.length,
      patients: rows,
    });
  });
};

// ================= GET DOCTORS LIST =================
const getDoctorsList = (req, res) => {
  const sql = `
    SELECT
      d.doctor_id,
      u.full_name,
      d.specialty
    FROM doctors d
    JOIN users u ON d.user_id = u.id
    ORDER BY u.full_name
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("GET DOCTORS LIST ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    return res.status(200).json({
      message: "Doctors fetched successfully",
      count: rows.length,
      doctors: rows,
    });
  });
};

// ================= ASSIGN PATIENT TO DOCTOR =================
const assignPatientToDoctor = (req, res) => {
  const { patient_id, doctor_id } = req.body;

  if (!patient_id || !doctor_id) {
    return res.status(400).json({
      message: "patient_id and doctor_id are required",
    });
  }

  // Check if this link already exists
  const checkSql = `
    SELECT id FROM patient_doctor
    WHERE patient_id = ? AND doctor_id = ?
    LIMIT 1
  `;

  db.query(checkSql, [patient_id, doctor_id], (checkErr, checkResults) => {
    if (checkErr) {
      console.error("ASSIGN CHECK ERROR:", checkErr);
      return res.status(500).json({ message: "Server error" });
    }

    if (checkResults.length > 0) {
      return res.status(409).json({
        message: "This patient is already assigned to this doctor",
      });
    }

    const insertSql = `
      INSERT INTO patient_doctor (patient_id, doctor_id)
      VALUES (?, ?)
    `;

    db.query(insertSql, [patient_id, doctor_id], (insertErr) => {
      if (insertErr) {
        console.error("ASSIGN PATIENT ERROR:", insertErr);
        return res.status(500).json({ message: "Failed to assign patient" });
      }

      return res.status(201).json({
        message: "Patient assigned to doctor successfully",
      });
    });
  });
};
module.exports = {
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
};
