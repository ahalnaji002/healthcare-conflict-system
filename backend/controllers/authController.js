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
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ================= REGISTER PATIENT =================
const registerPatient = (req, res) => {
  const { name, email, password, birth_date } = req.body;

  // 1. Validate all required fields are present
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

    // 5. Insert the new patient into the users table
    //    is_verified defaults to FALSE in the DB schema
    const insertSql = `
      INSERT INTO users 
        (name, email, password, role, birth_date, is_verified, verification_code, verification_expires_at)
      VALUES (?, ?, ?, 'patient', ?, FALSE, ?, ?)
    `;

    db.query(
      insertSql,
      [name, email, password, birth_date, verificationCode, expiresAt],
      (insertErr, result) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(500).json({ message: "Registration failed" });
        }

        // 6. Return success with the verification code
        //    (in production this would be sent by email instead)
        return res.status(201).json({
          message:
            "Patient registered successfully. Please verify your account.",
          user_id: result.insertId,
          verification_code: verificationCode, // dev only — remove when email is added
        });
      }
    );
  });
};

// ================= LOGIN =================
const login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
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
  login,
  forgotPassword,
};