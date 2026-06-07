const db = require("../config/db");
const jwt = require("jsonwebtoken");

// ================= REGISTER (old - kept for reference) =================
const register = async (req, res) => {
  const { full_name, email, password } = req.body;
  const role = "patient";

  try {
    const sql =
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

    db.query(sql, [full_name, email, password, role], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Registration failed" });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
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

  // 1. Validate required fields (optional fields are allowed to be empty)
  if (!name || !email || !password || !birth_date) {
    return res.status(400).json({
      message: "All fields are required: name, email, password, birth_date",
    });
  }

  // 2. Check if email is already registered
  const checkEmailSql = "SELECT id FROM users WHERE email = ?";

  db.query(checkEmailSql, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    // 3. Generate a 6-digit verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // 4. Set code expiry to 15 minutes from now
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // 5. Insert the new patient with all fields
    const insertSql = `
      INSERT INTO users 
        (name, email, password, role, birth_date, national_id, phone, gender,
         address, medical_condition, is_verified, status, verification_code, verification_expires_at)
      VALUES (?, ?, ?, 'patient', ?, ?, ?, ?, ?, ?, FALSE, 'active', ?, ?)
    `;

    db.query(
      insertSql,
      [
        name, email, password, birth_date,
        national_id || null,
        phone || null,
        gender || null,
        address || null,
        medical_condition || null,
        verificationCode,
        expiresAt,
      ],
      (insertErr, result) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(500).json({ message: "Registration failed" });
        }

        // 6. Return success with the verification code
        // (in production this would be sent by email instead)
        return res.status(201).json({
          message: "Patient registered successfully. Please verify your account.",
          user_id: result.insertId,
          verification_code: verificationCode, // dev only — remove when email is added
        });
      }
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
    // Doctor specific fields
    hospital,
    specialization,
    license,
    experience,
    // NGO specific fields
    ngo_name,
    ngo_field,
    registration_number,
    services_description,
  } = req.body;

  // 1. Validate required fields for all staff
  if (!name || !email || !password || !role) {
    return res.status(400).json({
      message: "All fields are required: name, email, password, role",
    });
  }

  // 2. Only allow doctor or ngo roles
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

  // 4. Check if email is already registered
  const checkEmailSql = "SELECT id FROM users WHERE email = ?";

  db.query(checkEmailSql, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    // 5. Insert staff with status 'pending' — admin must approve before they can login
    const insertSql = `
      INSERT INTO users 
        (name, email, password, role, phone, address,
         hospital, specialization, license, experience,
         ngo_name, ngo_field, registration_number, services_description,
         is_verified, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, FALSE, 'pending')
    `;

    db.query(
      insertSql,
      [
        name, email, password, role,
        phone || null,
        address || null,
        hospital || null,
        specialization || null,
        license || null,
        experience || null,
        ngo_name || null,
        ngo_field || null,
        registration_number || null,
        services_description || null,
      ],
      (insertErr, result) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(500).json({ message: "Registration failed" });
        }

        // 6. Return success — admin will review and approve the request
        // (in production a confirmation email would be sent here)
        return res.status(201).json({
          message: "Registration request submitted successfully. Please wait for admin approval.",
          user_id: result.insertId,
          status: "pending",
        });
      }
    );
  });
};

// ================= LOGIN (unified for all roles) =================
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

    // 4. Check if account is verified (is_verified must be true)
    if (!user.is_verified) {
      return res.status(403).json({
        message: "Account not verified. Please verify your email first.",
      });
    }

    // 5. Check if account is active (not pending or rejected)
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
        name: user.name,
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

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const deleteSql = "DELETE FROM password_reset_tokens WHERE email = ?";

    db.query(deleteSql, [email], (deleteErr) => {
      if (deleteErr) {
        console.error(deleteErr);
        return res.status(500).json({ message: "Server error" });
      }

      const insertSql =
        "INSERT INTO password_reset_tokens (email, token, expires_at) VALUES (?, ?, ?)";

      db.query(insertSql, [email, resetCode, expiresAt], (insertErr) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(500).json({ message: "Server error" });
        }

        console.log(`Reset code for ${email}: ${resetCode}`);

        return res.status(200).json({
          message: "If this email is registered, a reset code has been sent.",
          reset_code: resetCode, // dev only — remove when email is added
        });
      });
    });
  });
};

module.exports = {
  register,
  registerPatient,
  registerStaff,
  login,
  forgotPassword,
};