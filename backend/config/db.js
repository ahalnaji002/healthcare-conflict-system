const mysql = require("mysql2");

// تم تعديل البيانات بربطها مباشرة لتخطي مشكلة الـ .env
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",       // المستخدم الافتراضي لـ phpMyAdmin
  password: "",       // الباسورد الافتراضي يكون فارغاً في XAMPP
  database: "healthcare_conflict_system", // 👈 ضع هنا اسم قاعدة البيانات الحقيقي كما هو مكتوب في phpMyAdmin
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = connection;