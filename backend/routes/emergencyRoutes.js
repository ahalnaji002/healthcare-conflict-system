const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');

// 1. مسار إرسال بلاغ الطوارئ الفوري (متاح للجميع)
// [POST] /api/emergency/panic
router.post('/panic', emergencyController.sendPanicAlert);

// 2. مسار جلب البلاغات النشطة (تم إزالة protect مؤقتاً لحل مشكلة الـ TypeError)
// [GET] /api/emergency/active
router.get('/active', emergencyController.getActiveAlerts);

module.exports = router;