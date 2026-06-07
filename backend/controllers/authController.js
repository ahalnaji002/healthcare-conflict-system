const db = require("../config/db");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
const register = async (req, res) => {
  const { full_name, email, password } = req.body;
  const role = "patient";

  try {
    const sql =
      "INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)";

    db.query(sql, [full_name, email, password, role], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Registration failed",
        });
      }

      res.status(201).json({
        message: "User registered successfully",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= REGISTER PATIENT =================
// ================= REGISTER PATIENT Ahmed-Hashem  =================
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

    // 3. Generate verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // 4. Insert account data into users
    const insertUserSql = `
      INSERT INTO users 
        (full_name, email, password, phone, role, status, is_verified, verification_code, verification_expires_at)
      VALUES (?, ?, ?, ?, 'patient', 'active', FALSE, ?, ?)
    `;

    db.query(
      insertUserSql,
      [name, email, password, phone || null, verificationCode, expiresAt],
      (insertUserErr, userResult) => {
        if (insertUserErr) {
          console.error(insertUserErr);
          return res.status(500).json({ message: "User registration failed" });
        }

        const userId = userResult.insertId;

        // 5. Insert patient-specific data into patients
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
          (insertPatientErr) => {
            if (insertPatientErr) {
              console.error(insertPatientErr);
              return res.status(500).json({
                message: "Patient profile creation failed",
              });
            }

            return res.status(201).json({
              message:
                "Patient registered successfully. Please verify your account.",
              user_id: userId,
              verification_code: verificationCode,
            });
          },
        );
      },
    );
  });
};

// ================= REGISTER STAFF =================
// ================= REGISTER STAFF REQUEST Ahmed-Hashem =================
const registerStaff = (req, res) => {
  const {
    name,
    email,
    password,
    role,
    phone,
    address,
    license,
    hospital,
    specialization,
    experience,
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

  // 4. Check if email already exists in users
  const checkUserSql = "SELECT id FROM users WHERE email = ?";

  db.query(checkUserSql, [email], (userErr, userResults) => {
    if (userErr) {
      console.error(userErr);
      return res.status(500).json({ message: "Server error" });
    }

    if (userResults.length > 0) {
      return res.status(409).json({
        message: "Email is already registered",
      });
    }

    // 5. Check if email already has a pending join request
    const checkRequestSql =
      "SELECT join_request_id FROM join_requests WHERE email = ? AND status = 'pending'";

    db.query(checkRequestSql, [email], (requestErr, requestResults) => {
      if (requestErr) {
        console.error(requestErr);
        return res.status(500).json({ message: "Server error" });
      }

      if (requestResults.length > 0) {
        return res.status(409).json({
          message: "You already have a pending join request",
        });
      }

      // 6. Prepare data based on role
      const requestType = role;

      const requestSpecialty = role === "doctor" ? specialization : ngo_field;

      const requestLicenseNumber =
        role === "doctor" ? license : registration_number;

      const requestOrganizationType = role === "doctor" ? hospital : ngo_name;

      const requestDescription =
        role === "doctor" ? experience : services_description;

      // 7. Insert into join_requests
      const insertSql = `
        INSERT INTO join_requests
          (request_type, name, email, password, phone, specialty, license_number,
           organization_type, description, document_url, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
      `;

      db.query(
        insertSql,
        [
          requestType,
          name,
          email,
          password,
          phone || null,
          requestSpecialty || null,
          requestLicenseNumber || null,
          requestOrganizationType || null,
          requestDescription || null,
          null,
        ],
        (insertErr, result) => {
          if (insertErr) {
            console.error(insertErr);
            return res.status(500).json({
              message: "Join request submission failed",
            });
          }

          return res.status(201).json({
            message:
              "Join request submitted successfully. Please wait for admin approval.",
            join_request_id: result.insertId,
            status: "pending",
          });
        },
      );
    });
  });
};

// ================= LOGIN =================
const login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Server error",
      });
    }

    // User not found
    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = results[0];

    // Compare passwords without encryption
    if (password !== user.password) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
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

module.exports = {
  register,
  login,
};
