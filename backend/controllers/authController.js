const db = require("../config/db");
const jwt = require("jsonwebtoken");

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
      INSERT INTO users (full_name, email, password, phone, role, status, is_verified)
      VALUES (?, ?, ?, ?, 'patient', 'active', 0)
    `;

    db.query(insertUserSql, [name, email, password, phone || null], (userErr, userResult) => {
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
            100000 + Math.random() * 900000
          ).toString();

          // 6. Insert into verification_codes table
          // Using MySQL NOW() + INTERVAL to avoid timezone issues
          const insertCodeSql = `
            INSERT INTO verification_codes (user_id, code, purpose, expires_at)
            VALUES (?, ?, 'patient_register', DATE_ADD(NOW(), INTERVAL 15 MINUTE))
          `;

          db.query(insertCodeSql, [userId, verificationCode], (codeErr) => {
            if (codeErr) {
              console.error(codeErr);
              return res.status(500).json({ message: "Registration failed" });
            }

            // 7. Return success
            // (in production the code would be sent by email)
            return res.status(201).json({
              message: "Patient registered successfully. Please verify your account.",
              user_id: userId,
              verification_code: verificationCode, // dev only
            });
          });
        }
      );
    });
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
  const checkEmailSql = "SELECT join_request_id FROM join_requests WHERE email = ?";

  db.query(checkEmailSql, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "A request with this email already exists" });
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
      [role, name, email, phone || null, specialty || null,
       licenseNumber || null, orgType || null, description || null],
      (insertErr, result) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(500).json({ message: "Registration failed" });
        }

        return res.status(201).json({
          message: "Registration request submitted successfully. Please wait for admin approval.",
          request_id: result.insertId,
          status: "pending",
        });
      }
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
      { expiresIn: "7d" }
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

    // Same message whether found or not (security best practice)
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
      return res.status(400).json({ message: "Invalid, already used, or expired verification code" });
    }

    const codeRecord = results[0];

    // 4. Mark code as used
    const markUsedSql = "UPDATE verification_codes SET is_used = 1 WHERE code_id = ?";

    db.query(markUsedSql, [codeRecord.code_id], (markErr) => {
      if (markErr) {
        console.error(markErr);
        return res.status(500).json({ message: "Server error" });
      }

      // 5. Activate the user account
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
  // req.user is set by the verifyToken middleware (contains id and role)
  const userId = req.user.id;

  const sql = "SELECT id, full_name, email, phone, role, status, is_verified, created_at FROM users WHERE id = ?";

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
      },
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
};