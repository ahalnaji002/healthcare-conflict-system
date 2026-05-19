const db = require("../config/db");

const register = (req, res) => {
  const { full_name, email, password, role } = req.body;

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
};

module.exports = {
  register,
};
