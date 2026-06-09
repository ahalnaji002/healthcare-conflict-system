const db = require('../config/db'); // استدعاء قاعدة البيانات مرة واحدة فقط في أعلى الملف!

// 1. [POST] /api/emergency/panic -> استقبال بلاغ الطوارئ الفوري وحفظ الموقع الجغرافي
exports.sendPanicAlert = async (req, res) => {
    // استقبال الإحداثيات ورقم المريض من الـ Request Body
    const { patient_id, lat, long } = req.body;

    // التحقق من وجود الإحداثيات الجغرافية لأنها أساس البلاغ
    if (!lat || !long) {
        return res.status(400).json({ 
            success: false, 
            message: 'فشل إرسال البلاغ. الإحداثيات الجغرافية (lat, long) مطلوبة لتحديد الموقع.' 
        });
    }

    try {
        // استعلام الإدخال مع معالجة حقل المريض الاختياري (تخزينه كـ null إذا كان مجهولاً)
        // تم وضع كلمة `long` بين علامتي الاقتباس المائلة لحمايتها ككلمة محجوزة
        const query = `
            INSERT INTO emergency_alerts (patient_id, lat, \`long\`) 
            VALUES (?, ?, ?)
        `;
        const values = [patient_id || null, lat, long];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error("خطأ أثناء إدخال بلاغ الطوارئ:", err);
                return res.status(500).json({
                    success: false,
                    message: "حدث خطأ داخلي في الخادم أثناء معالجة بلاغ الطوارئ.",
                    detailed_error: err.message
                });
            }
            return res.status(201).json({
                success: true,
                message: 'تم استقبال بلاغ الطوارئ الفوري وحفظ الموقع الجغرافي بنجاح. فرق الإنقاذ في طريقها إليك.',
                alert_id: result.insertId
            });
        });
    } catch (error) {
        console.error('Error in sendPanicAlert:', error);
        return res.status(500).json({
            success: false,
            message: 'حدث خطأ داخلي في الخادم أثناء معالجة بلاغ الطوارئ.',
            detailed_error: error.message
        });
    }
};

// 2. [GET] /api/emergency/active -> جلب جميع التنبيهات النشطة حالياً (خاص بالطبيب والأدمن)
exports.getActiveAlerts = async (req, res) => {
    try {
        // استعلام لجلب التنبيهات مرتبة من الأحدث إلى الأقدم مع جلب اسم المريض عبر الـ LEFT JOIN
        const query = `
            SELECT ea.alert_id, ea.patient_id, ea.lat, ea.\`long\`, ea.created_at, p.name as patient_name
            FROM emergency_alerts ea
            LEFT JOIN patients p ON ea.patient_id = p.id
            ORDER BY ea.created_at DESC
        `;

        db.query(query, (err, results) => {
            if (err) {
                console.error("خطأ أثناء جلب تنبيهات الطوارئ:", err);
                return res.status(500).json({
                    success: false,
                    message: "حدث خطأ داخلي في الخادم أثناء جلب التنبيهات النشطة.",
                    detailed_error: err.message
                });
            }

            // إرجاع البيانات بنجاح ليتم عرضها باللون الأحمر في لوحة التحكم
            return res.status(200).json({
                success: true,
                count: results.length,
                alerts: results
            });
        });

    } catch (error) {
        console.error("خطأ غير متوقع:", error);
        return res.status(500).json({
            success: false,
            message: "حدث خطأ غير متوقع في السيرفر.",
            detailed_error: error.message
        });
    }
}