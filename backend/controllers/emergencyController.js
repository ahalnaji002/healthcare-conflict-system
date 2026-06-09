const db = require('../config/db'); // استدعاء ملف الاتصال المصلح

// [POST] /api/emergency/panic
exports.sendPanicAlert = async (req, res) => {
    // استقبال المتغيرات من الـ Request Body
    const { patient_id, lat, long } = req.body;

    // 1. التحقق من الحقول الإجبارية (Validation)
    if (!lat || !long) {
        return res.status(400).json({
            success: false,
            message: "فشل إرسال البلاغ. الإحداثيات الجغرافية (lat, long) مطلوبة لتحديد الموقع."
        });
    }

    try {
        // 2. استعلام الإدخال مع معالجة حقل المريض الاختياري (تخزينه كـ null إذا كان مجهولاً)
        // واستخدام علامات الاقتباس المائلة لـ `long` لأنها كلمة محجوزة
        const query = `
            INSERT INTO emergency_alerts (patient_id, lat, \`long\`) 
            VALUES (?, ?, ?)
        `;
        
        const values = [patient_id || null, lat, long];

        // 3. تنفيذ الاستعلام في قاعدة البيانات
        db.query(query, values, (err, result) => {
            if (err) {
                console.error("خطأ أثناء إدخال بلاغ الطوارئ:", err);
                return res.status(500).json({
                    success: false,
                    message: "حدث خطأ داخلي في الخادم أثناء معالجة بلاغ الطوارئ.",
                    detailed_error: err.message
                });
            }

            // 4. استجابة النجاح الأخاذة (201 Created)
            return res.status(201).json({
                success: true,
                message: "تم استقبال بلاغ الطوارئ الفوري وحفظ الموقع الجغرافي بنجاح. فرق الإنقاذ في طريقها إليك.",
                alert_id: result.insertId
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
};






const db = require('../config/db'); 

// [POST] استقبال بلاغ الطوارئ الفوري وحفظ الموقع الجغرافي
const sendPanicAlert = async (req, res) => {
    // استقبال الإحداثيات ورقم المريض من الـ Body
    const { patient_id, lat, long } = req.body;

    // التحقق من وجود الإحداثيات الجغرافية لأنها أساس البلاغ
    if (!lat || !long) {
        return res.status(400).json({ 
            success: false, 
            message: 'فشل إرسال البلاغ. الإحداثيات الجغرافية (lat, long) مطلوبة لتحديد الموقع.' 
        });
    }

    try {
        const promiseDb = db.promise();

        // إدخال بلاغ الطوارئ باستخدام الأسماء المختصرة المتوافقة مع جدولك (lat و `long`)
        // وضعنا كلمة `long` بين علامتي `` لحمايتها لأنها كلمة محجوزة في بعض أنظمة قواعد البيانات
        const [result] = await promiseDb.query(
            'INSERT INTO emergency_alerts (patient_id, lat, `long`, created_at) VALUES (?, ?, ?, NOW())',
            [patient_id || null, lat, long]
        );

        return res.status(201).json({
            success: true,
            message: 'تم استقبال بلاغ الطوارئ الفوري وحفظ الموقع الجغرافي بنجاح. فرق الإنقاذ في طريقها إليك.',
            alert_id: result.insertId
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

module.exports = {
    sendPanicAlert
};