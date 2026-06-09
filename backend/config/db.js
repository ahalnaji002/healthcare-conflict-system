const mysql = require("mysql2");

// استخدام createPool بدلاً من createConnection لحل مشكلة انقطاع الاتصال
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // يفتح حتى 10 قنوات اتصال عند الحاجة
  queueLimit: 0
});

// اختبار الاتصال عند بدء تشغيل السيرفر للتأكد من سلامته
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database via Pool (تم الاتصال بنجاح)");
    connection.release(); // إرجاع القناة للتجمع لتظل جاهزة للطلبات القادمة
  }
});

module.exports = pool;