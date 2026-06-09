const express = require('express');
const router = express.Router();
const { sendPanicAlert } = require('../controllers/emergencyController');

// مسار الطوارئ الفوري (بدون وضع verifyToken لكي يدعم البلاغات المجهولة والمستعجلة)
router.post('/panic', sendPanicAlert);

module.exports = router;