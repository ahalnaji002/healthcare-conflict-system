// backend/controllers/medicalController.js
const db = require('../config/db'); 

// 1️⃣ [GET] جلب قائمة المرضى التابعين للطبيب الحالي مع البحث والفلترة
const getDoctorPatients = async (req, res) => {
    const doctor_user_id = req.user.id; // الـ ID القادم من التوكن (users.id)
    const { search, status } = req.query;

    try {
        const promiseDb = db.promise();
        
        // استعلام يربط الجدول الوسيط (patient_doctor) بجدول المرضى والمستخدمين بناءً على الـ Schema الخاص بك
        let sqlQuery = `
            SELECT 
                p.patient_id, 
                u.full_name AS name, 
                u.email, 
                u.phone, 
                u.status, 
                p.medical_condition
            FROM patient_doctor pd
            JOIN doctors d ON pd.doctor_id = d.doctor_id
            JOIN patients p ON pd.patient_id = p.patient_id
            JOIN users u ON p.user_id = u.id
            WHERE d.user_id = ?
        `;
        let queryParams = [doctor_user_id];

        // الفلترة حسب حالة الحساب (active, inactive... إلخ)
        if (status) {
            sqlQuery += ` AND u.status = ?`;
            queryParams.push(status);
        }

        // البحث حسب اسم المريض أو بريده الإلكتروني
        if (search) {
            sqlQuery += ` AND (u.full_name LIKE ? OR u.email LIKE ?)`;
            queryParams.push(`%${search}%`, `%${search}%`);
        }

        const [patients] = await promiseDb.query(sqlQuery, queryParams);

        return res.status(200).json({
            success: true,
            count: patients.length,
            data: patients
        });

    } catch (error) {
        console.error('Error in getDoctorPatients:', error);
        return res.status(500).json({
            success: false,
            message: 'حدث خطأ داخلي في الخادم أثناء جلب المرضى.',
            detailed_error: error.message
        });
    }
};

// 2️⃣ [POST] إضافة دواء وتحديث الخطة العلاجية (تم تعديله ليتوافق مع جداولك الحقيقية: treatment_plans و medications)
const prescribeMedication = async (req, res) => {
    const { patient_id, plan_title, medicine_name, dose, frequency, instructions } = req.body;
    const doctor_user_id = req.user.id; 

    if (!patient_id || !medicine_name || !plan_title) {
        return res.status(400).json({ 
            success: false, 
            message: 'الحقول الأساسية مطلوبة: patient_id, plan_title, medicine_name' 
        });
    }

    try {
        const promiseDb = db.promise();

        // جلب الـ doctor_id الحقيقي من جدول doctors باستخدام الـ user_id القادم من التوكن
        const [doctorRows] = await promiseDb.query('SELECT doctor_id FROM doctors WHERE user_id = ?', [doctor_user_id]);
        if (doctorRows.length === 0) {
            return res.status(404).json({ success: false, message: 'لم يتم العثور على بيانات طبيب لهذا الحساب.' });
        }
        const doctor_id = doctorRows[0].doctor_id;

        // التحقق من وجود خطة علاجية نشطة (active) لهذا المريض مع هذا الطبيب
        let [plans] = await promiseDb.query(
            'SELECT plan_id FROM treatment_plans WHERE patient_id = ? AND doctor_id = ? AND status = "active"',
            [patient_id, doctor_id]
        );

        let plan_id;
        if (plans.length > 0) {
            plan_id = plans[0].plan_id;
        } else {
            // إن لم تكن هناك خطة نشطة، ننشئ واحدة جديدة تلقائياً
            const [newPlan] = await promiseDb.query(
                'INSERT INTO treatment_plans (patient_id, doctor_id, title, status, created_at) VALUES (?, ?, ?, "active", NOW())',
                [patient_id, doctor_id, plan_title]
            );
            plan_id = newPlan.insertId;
        }

        // إدراج الدواء الجديد داخل جدول medications المرتبط بالخطة
        await promiseDb.query(
            'INSERT INTO medications (plan_id, medication_name, dose, frequency, instructions) VALUES (?, ?, ?, ?, ?)',
            [plan_id, medicine_name, dose, frequency, instructions]
        );

        return res.status(201).json({ 
            success: true, 
            message: 'تم إضافة الدواء وتحديث الخطة العلاجية للمريض بنجاح.' 
        });

    } catch (error) {
        console.error('Error in prescribeMedication:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'حدث خطأ داخلي أثناء إضافة الدواء.',
            detailed_error: error.message 
        });
    }
};

module.exports = {
    getDoctorPatients,
    prescribeMedication
};