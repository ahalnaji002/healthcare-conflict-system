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

    res.status(500).json({
      message: "Server error",
    });
  }
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
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
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
