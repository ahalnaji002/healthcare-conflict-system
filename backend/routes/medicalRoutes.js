const express = require('express');
const router = express.Router();
const { getDoctorPatients, prescribeMedication } = require('../controllers/medicalController');
const verifyToken = require('../middleware/authMiddleware'); // 👈 قمنا بتعديل الاسم وطريقة الاستدعاء هنا

// 1️⃣ مسار جلب مرضى الطبيب (محمي بالتوكن)
router.get('/doctor-patients', verifyToken, getDoctorPatients);

// 2️⃣ مسار إضافة وصفة طبية (محمي بالتوكن أيضاً)
router.post('/prescribe', verifyToken, prescribeMedication);

module.exports = router;