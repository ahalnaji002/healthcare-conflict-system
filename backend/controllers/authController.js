const db = require("../config/db");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// ================= EMAIL HELPER =================
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

  const mailOptions = {
    from: `"War Injuries Care" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.error("Email sending failed:", err);
    } else {
      console.log(`Email sent to ${to}`);
    }
  });
};

// ================= GET LANDING STATS =================
const getLandingStats = (req, res) => {
  const statsSql = `
    SELECT
      (SELECT COUNT(*) FROM patients) AS total_patients,
      (SELECT COUNT(*) FROM doctors) AS total_doctors,
      (SELECT COUNT(*) FROM ngos) AS total_ngos,
      (SELECT COUNT(*) FROM join_requests WHERE status = 'pending') AS pending_join_requests,
      (SELECT COUNT(*) FROM users WHERE status = 'active') AS active_users
  `;

  db.query(statsSql, (err, results) => {
    if (err) {
      console.error("GET LANDING STATS ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    return res.status(200).json({
      message: "Landing stats fetched successfully",
      stats: results[0],
    });
  });
};

// ================= REGISTER PATIENT =================
const registerPatient = (req, res) => {
  const {
    name,
    email,
    password,
    birth_date,
    national_id,
    phone,
    gender,
    address,
    medical_condition,
  } = req.body;

  // 1. Validate required fields
  if (!name || !email || !password || !birth_date) {
    return res.status(400).json({
      message: "All fields are required: name, email, password, birth_date",
    });
  }

  // 2. Check if email already exists
  const checkEmailSql = "SELECT id FROM users WHERE email = ?";

  db.query(checkEmailSql, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    // 3. Insert into users table first
    const insertUserSql = `
      INSERT INTO users 
        (full_name, email, password, phone, role, status, is_verified)
      VALUES (?, ?, ?, ?, 'patient', 'active', 0)
    `;

    db.query(
      insertUserSql,
      [name, email, password, phone || null],
      (userErr, userResult) => {
        if (userErr) {
          console.error(userErr);
          return res.status(500).json({ message: "Registration failed" });
        }

        const userId = userResult.insertId;

        // 4. Insert into patients table
        const insertPatientSql = `
          INSERT INTO patients 
            (user_id, national_id, date_of_birth, gender, address, medical_condition)
          VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(
          insertPatientSql,
          [
            userId,
            national_id || null,
            birth_date,
            gender || null,
            address || null,
            medical_condition || null,
          ],
          (patientErr) => {
            if (patientErr) {
              console.error(patientErr);
              return res.status(500).json({ message: "Registration failed" });
            }

            // 5. Generate 6-digit verification code
            const verificationCode = Math.floor(
              100000 + Math.random() * 900000,
            ).toString();

            // 6. Insert into verification_codes table
            // Using MySQL NOW() + INTERVAL to avoid timezone issues
            const insertCodeSql = `
              INSERT INTO verification_codes
                (user_id, code, purpose, expires_at, is_used)
              VALUES (?, ?, 'patient_register', DATE_ADD(NOW(), INTERVAL 10 MINUTE), 0)
            `;

            db.query(insertCodeSql, [userId, verificationCode], (codeErr) => {
              if (codeErr) {
                console.error(codeErr);
                return res.status(500).json({ message: "Registration failed" });
              }

              // Send verification email
              sendEmail(
                email,
                "Verify Your Account - War Injuries Care",
                `
  <div style="font-family: Arial, sans-serif; max-width: 520px; margin: auto; padding: 20px;">
    <h2 style="color: #00478d; margin-bottom: 10px;">War Injuries Care</h2>

    <p style="font-size: 15px; color: #333;">
      Thank you for registering. Use the verification code below to activate your account:
    </p>

    <div style="
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 8px;
      color: #00478d;
      text-align: center;
      padding: 22px;
      background: #f0f4ff;
      border-radius: 12px;
      margin: 22px 0;
    ">
      ${verificationCode}
    </div>

    <p style="font-size: 14px; color: #555;">
      This code expires in <strong>10 minutes</strong>.
    </p>

    <p style="font-size: 13px; color: #777;">
      If you did not create an account, please ignore this email.
    </p>
  </div>
  `,
              );

              return res.status(201).json({
                message:
                  "Patient registered successfully. Please verify your account.",
                user_id: userId,
                email,
                role: "patient",
              });

              return res.status(201).json({
                message:
                  "Patient registered successfully. Please verify your account.",
                user_id: userId,
                email,
                role: "patient",
              });
            });
          },
        );
      },
    );
  });
};

// ================= REGISTER STAFF =================
const registerStaff = (req, res) => {
  const {
    name,
    email,
    password,
    role,
    phone,
    address,
    // Doctor specific
    hospital,
    specialization,
    license,
    experience,
    // NGO specific
    ngo_name,
    ngo_field,
    registration_number,
    services_description,
  } = req.body;

  // 1. Validate required fields
  if (!name || !email || !password || !role) {
    return res.status(400).json({
      message: "All fields are required: name, email, password, role",
    });
  }

  // 2. Only allow doctor or ngo
  if (role !== "doctor" && role !== "ngo") {
    return res.status(400).json({
      message: "Role must be either 'doctor' or 'ngo'",
    });
  }

  // 3. Validate role-specific required fields
  if (role === "doctor" && !license) {
    return res.status(400).json({
      message: "Medical license number is required for doctors",
    });
  }

  if (role === "ngo" && !registration_number) {
    return res.status(400).json({
      message: "Registration number is required for NGOs",
    });
  }

  // 4. Check if email already exists in join_requests
  const checkEmailSql =
    "SELECT join_request_id FROM join_requests WHERE email = ?";

  db.query(checkEmailSql, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length > 0) {
      return res
        .status(409)
        .json({ message: "A request with this email already exists" });
    }

    // 5. Insert into join_requests table
    const insertSql = `
      INSERT INTO join_requests
        (request_type, name, email, phone, specialty, license_number,
         organization_type, description, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `;

    // Map fields based on role
    const specialty = role === "doctor" ? specialization : ngo_field;
    const licenseNumber = role === "doctor" ? license : registration_number;
    const orgType = role === "doctor" ? hospital : ngo_name;
    const description = role === "doctor" ? experience : services_description;

    db.query(
      insertSql,
      [
        role,
        name,
        email,
        phone || null,
        specialty || null,
        licenseNumber || null,
        orgType || null,
        description || null,
      ],
      (insertErr, result) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(500).json({ message: "Registration failed" });
        }

        return res.status(201).json({
          message:
            "Registration request submitted successfully. Please wait for admin approval.",
          request_id: result.insertId,
          status: "pending",
        });
      },
    );
  });
};

// ================= LOGIN =================
const login = (req, res) => {
  const { email, password } = req.body;

  // 1. Validate fields
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    // 2. User not found
    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    // 3. Check password
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 4. Check if account is verified
    if (!user.is_verified) {
      return res.status(403).json({
        message: "Account not verified. Please verify your email first.",
      });
    }

    // 5. Check account status
    if (user.status === "pending") {
      return res.status(403).json({
        message: "Account is pending admin approval. Please wait.",
      });
    }

    if (user.status === "rejected") {
      return res.status(403).json({
        message: "Account has been rejected. Please contact support.",
      });
    }

    if (user.status === "inactive") {
      return res.status(403).json({
        message: "Account is inactive. Please contact support.",
      });
    }

    // 6. Generate JWT Token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  });
};

// ================= FORGOT PASSWORD =================
const forgotPassword = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const findUserSql = "SELECT * FROM users WHERE email = ?";

  db.query(findUserSql, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    // Same message whether found or not
    if (results.length === 0) {
      return res.status(200).json({
        message: "If this email is registered, a reset code has been sent.",
      });
    }

    const user = results[0];

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store in verification_codes table using MySQL NOW() to avoid timezone issues
    const insertSql = `
      INSERT INTO verification_codes (user_id, code, purpose, expires_at)
      VALUES (?, ?, 'patient_register', DATE_ADD(NOW(), INTERVAL 15 MINUTE))
    `;

    db.query(insertSql, [user.id, resetCode], (insertErr) => {
      if (insertErr) {
        console.error(insertErr);
        return res.status(500).json({ message: "Server error" });
      }

      console.log(`Reset code for ${email}: ${resetCode}`);

      return res.status(200).json({
        message: "If this email is registered, a reset code has been sent.",
        reset_code: resetCode, // dev only
      });
    });
  });
};

// ================= VERIFY EMAIL =================
const verifyEmail = (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({ message: "Verification code is required" });
  }

  // 1. Find the code in verification_codes table — check expiry using DB time
  const findCodeSql = `
    SELECT * FROM verification_codes 
    WHERE code = ? AND is_used = 0 AND expires_at > NOW()
    ORDER BY created_at DESC 
    LIMIT 1
  `;

  db.query(findCodeSql, [token], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    // 2. Code not found or expired
    if (results.length === 0) {
      return res.status(400).json({
        message: "Invalid, already used, or expired verification code",
      });
    }

    const codeRecord = results[0];

    // 3. Mark code as used
    const markUsedSql =
      "UPDATE verification_codes SET is_used = 1 WHERE code_id = ?";

    db.query(markUsedSql, [codeRecord.code_id], (markErr) => {
      if (markErr) {
        console.error(markErr);
        return res.status(500).json({ message: "Server error" });
      }

      // 4. Activate the user account
      const activateSql = "UPDATE users SET is_verified = 1 WHERE id = ?";

      db.query(activateSql, [codeRecord.user_id], (activateErr) => {
        if (activateErr) {
          console.error(activateErr);
          return res.status(500).json({ message: "Server error" });
        }

        return res.status(200).json({
          message: "Email verified successfully. Your account is now active.",
        });
      });
    });
  });
};

// ================= GET PROFILE =================
const getProfile = (req, res) => {
  // req.user is set by the verifyToken middleware
  const userId = req.user.id;

  const sql = `
    SELECT 
      users.id,
      users.full_name,
      users.email,
      users.phone,
      users.role,
      users.status,
      users.is_verified,
      users.created_at,

      patients.patient_id,
      patients.national_id,
      patients.date_of_birth,
      patients.gender,
      patients.address,
      patients.city,
      patients.location,
      patients.blood_type,
      patients.chronic_diseases,
      patients.medical_condition,
      patients.emergency_contact,

      doctors.doctor_id,
      doctors.specialty,
      doctors.license_number,
      doctors.clinic_name,
      doctors.workplace,
      doctors.available_hours

    FROM users
    LEFT JOIN patients ON users.id = patients.user_id
    LEFT JOIN doctors ON users.id = doctors.user_id
    WHERE users.id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    // Only allow active and verified accounts
    if (!user.is_verified) {
      return res.status(403).json({
        message: "Account not verified.",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        message: "Account is not active.",
      });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        is_verified: user.is_verified,
        created_at: user.created_at,

        patient_id: user.patient_id,
        national_id: user.national_id,
        date_of_birth: user.date_of_birth,
        gender: user.gender,
        address: user.address,
        city: user.city,
        location: user.location,
        blood_type: user.blood_type,
        chronic_diseases: user.chronic_diseases,
        medical_condition: user.medical_condition,
        emergency_contact: user.emergency_contact,

        doctor_id: user.doctor_id,
        specialty: user.specialty,
        license_number: user.license_number,
        clinic_name: user.clinic_name,
        workplace: user.workplace,
        available_hours: user.available_hours,
      },
    });
  });
};

// ================= GET DOCTOR PATIENTS =================
const getDoctorPatients = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      patients.patient_id,
      patients.national_id,
      patients.date_of_birth,
      patients.gender,
      patients.address,
      patients.blood_type,
      patients.chronic_diseases,
      patients.medical_condition,
      patients.emergency_contact,

      users.full_name,
      users.email,
      users.phone,
      users.status

    FROM doctors
    JOIN patient_doctor 
      ON doctors.doctor_id = patient_doctor.doctor_id
    JOIN patients 
      ON patient_doctor.patient_id = patients.patient_id
    JOIN users 
      ON patients.user_id = users.id
    WHERE doctors.user_id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("GET DOCTOR PATIENTS ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    return res.status(200).json({
      message: "Doctor patients fetched successfully",
      patients: results,
    });
  });
};

// ================= GET DOCTOR PATIENT RECORD =================
const getDoctorPatientRecord = (req, res) => {
  const doctorUserId = req.user.id;
  const { patientId } = req.params;

  const sql = `
    SELECT 
      patients.patient_id,
      patients.national_id,
      patients.date_of_birth,
      patients.gender,
      patients.address,
      patients.blood_type,
      patients.chronic_diseases,
      patients.medical_condition,
      patients.emergency_contact,

      users.full_name,
      users.email,
      users.phone,
      users.status,

      doctors.doctor_id

    FROM doctors
    JOIN patient_doctor 
      ON doctors.doctor_id = patient_doctor.doctor_id
    JOIN patients 
      ON patient_doctor.patient_id = patients.patient_id
    JOIN users 
      ON patients.user_id = users.id
    WHERE doctors.user_id = ?
      AND patients.patient_id = ?
    LIMIT 1
  `;

  db.query(sql, [doctorUserId, patientId], (err, results) => {
    if (err) {
      console.error("GET DOCTOR PATIENT RECORD ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Patient not found or not assigned to this doctor",
      });
    }

    return res.status(200).json({
      message: "Patient record fetched successfully",
      patient: results[0],
    });
  });
};

// ================= GET PATIENT DOCTOR =================
const getPatientDoctor = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      doctors.doctor_id,
      doctors.specialty,
      doctors.license_number,
      doctors.clinic_name,
      doctors.workplace,
      doctors.available_hours,

      users.full_name,
      users.email,
      users.phone,
      users.status

    FROM patients
    JOIN patient_doctor
      ON patients.patient_id = patient_doctor.patient_id
    JOIN doctors
      ON patient_doctor.doctor_id = doctors.doctor_id
    JOIN users
      ON doctors.user_id = users.id
    WHERE patients.user_id = ?
    LIMIT 1
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("GET PATIENT DOCTOR ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "No doctor assigned to this patient yet",
      });
    }

    return res.status(200).json({
      message: "Patient doctor fetched successfully",
      doctor: results[0],
    });
  });
};

// ================= RESEND VERIFICATION CODE =================
const resendCode = (req, res) => {
  const { user_id, email } = req.body;

  if (!user_id && !email) {
    return res.status(400).json({
      message: "User ID or email is required",
    });
  }

  const findUserSql = user_id
    ? "SELECT id, email FROM users WHERE id = ?"
    : "SELECT id, email FROM users WHERE email = ?";

  const findValue = user_id || email;

  db.query(findUserSql, [findValue], (userErr, userResults) => {
    if (userErr) {
      console.error("FIND USER ERROR:", userErr);
      return res.status(500).json({ message: "Server error" });
    }

    if (userResults.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userResults[0];

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const expireSql = `
      UPDATE verification_codes
      SET is_used = 1
      WHERE user_id = ?
        AND purpose = 'patient_register'
        AND is_used = 0
    `;

    db.query(expireSql, [user.id], (expireErr) => {
      if (expireErr) {
        console.error("EXPIRE OLD CODES ERROR:", expireErr);
        return res.status(500).json({ message: "Server error" });
      }

      const insertSql = `
        INSERT INTO verification_codes 
        (user_id, code, purpose, expires_at, is_used)
        VALUES (?, ?, 'patient_register', DATE_ADD(NOW(), INTERVAL 10 MINUTE), 0)
      `;

      db.query(insertSql, [user.id, code], (insertErr) => {
        if (insertErr) {
          console.error("INSERT NEW CODE ERROR:", insertErr);
          return res.status(500).json({ message: "Server error" });
        }

        // Send new verification code by email
        sendEmail(
          user.email,
          "New Verification Code - War Injuries Care",
          `
  <div style="font-family: Arial, sans-serif; max-width: 520px; margin: auto; padding: 20px;">
    <h2 style="color: #00478d; margin-bottom: 10px;">War Injuries Care</h2>

    <p style="font-size: 15px; color: #333;">
      Your new verification code is:
    </p>

    <div style="
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 8px;
      color: #00478d;
      text-align: center;
      padding: 22px;
      background: #f0f4ff;
      border-radius: 12px;
      margin: 22px 0;
    ">
      ${code}
    </div>

    <p style="font-size: 14px; color: #555;">
      This code expires in <strong>10 minutes</strong>.
    </p>
  </div>
  `,
        );

        return res.status(200).json({
          message: "A new verification code has been sent to your email.",
        });
      });
    });
  });
};

// ================= VERIFY ACCOUNT CODE =================
const verifyCode = (req, res) => {
  const { user_id, email, code } = req.body;

  if (!code || (!user_id && !email)) {
    return res.status(400).json({
      message: "User ID or email and verification code are required",
    });
  }

  const findUserSql = user_id
    ? "SELECT id, email FROM users WHERE id = ?"
    : "SELECT id, email FROM users WHERE email = ?";

  const findValue = user_id || email;

  db.query(findUserSql, [findValue], (userErr, userResults) => {
    if (userErr) {
      console.error("VERIFY FIND USER ERROR:", userErr);
      return res.status(500).json({ message: "Server error" });
    }

    if (userResults.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userResults[0];

    const verifySql = `
      SELECT *
      FROM verification_codes
      WHERE user_id = ?
        AND code = ?
        AND purpose = 'patient_register'
        AND is_used = 0
        AND expires_at > NOW()
      ORDER BY created_at DESC
      LIMIT 1
    `;

    db.query(verifySql, [user.id, code], (verifyErr, codeResults) => {
      if (verifyErr) {
        console.error("VERIFY CODE ERROR:", verifyErr);
        return res.status(500).json({ message: "Server error" });
      }

      if (codeResults.length === 0) {
        return res.status(400).json({
          message: "Invalid or expired verification code.",
        });
      }

      const updateUserSql = `
        UPDATE users
        SET is_verified = 1,
            status = 'active'
        WHERE id = ?
      `;

      db.query(updateUserSql, [user.id], (updateUserErr) => {
        if (updateUserErr) {
          console.error("VERIFY UPDATE USER ERROR:", updateUserErr);
          return res.status(500).json({ message: "Server error" });
        }

        const markCodeSql = `
          UPDATE verification_codes
          SET is_used = 1
          WHERE code_id = ?
        `;

        db.query(markCodeSql, [codeResults[0].code_id], (markErr) => {
          if (markErr) {
            console.error("VERIFY MARK CODE ERROR:", markErr);
            return res.status(500).json({ message: "Server error" });
          }

          return res.status(200).json({
            message: "Account verified successfully",
          });
        });
      });
    });
  });
};

module.exports = {
  registerPatient,
  registerStaff,
  login,
  forgotPassword,
  verifyEmail,
  getProfile,
  getDoctorPatients,
  getDoctorPatientRecord,
  getPatientDoctor,
  verifyCode,
  resendCode,
  getLandingStats,
};
