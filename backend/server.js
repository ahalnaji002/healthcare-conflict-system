require("dotenv").config(); // 👈 هذا السطر السحري الذي يقرأ ملف الـ .env تلقائياً
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(morgan("dev"));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const emergencyRoutes = require("./routes/emergencyRoutes");

app.use("/api/emergency", emergencyRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);
