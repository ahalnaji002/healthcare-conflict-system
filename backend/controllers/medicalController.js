const db = require("../config/db");

// ================= GET MY TREATMENT PLAN =================
const getMyPlan = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      treatment_plans.plan_id,
      treatment_plans.patient_id,
      treatment_plans.doctor_id,
      treatment_plans.title,
      treatment_plans.description,
      treatment_plans.start_date,
      treatment_plans.end_date,
      treatment_plans.status,
      treatment_plans.created_at
    FROM patients
    JOIN treatment_plans
      ON patients.patient_id = treatment_plans.patient_id
    WHERE patients.user_id = ?
    ORDER BY treatment_plans.created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("GET MY PLAN ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    return res.status(200).json({
      message: "Treatment plan fetched successfully",
      plans: results,
    });
  });
};

// ================= PRESCRIBE MEDICATION =================
const prescribe = (req, res) => {
  const doctorUserId = req.user.id;
  const { patient_id, medicine_name, dose, freq, instructions, start_date, end_date } = req.body;

  // 1. Validate required fields
  if (!patient_id || !medicine_name || !dose || !freq) {
    return res.status(400).json({
      message: "Required fields: patient_id, medicine_name, dose, freq",
    });
  }

  // 2. Verify this doctor is assigned to this patient
  const checkAssignmentSql = `
    SELECT doctors.doctor_id, treatment_plans.plan_id
    FROM doctors
    JOIN patient_doctor ON doctors.doctor_id = patient_doctor.doctor_id
    JOIN treatment_plans ON patient_doctor.patient_id = treatment_plans.patient_id
      AND doctors.doctor_id = treatment_plans.doctor_id
    WHERE doctors.user_id = ? AND patient_doctor.patient_id = ?
    LIMIT 1
  `;

  db.query(checkAssignmentSql, [doctorUserId, patient_id], (err, results) => {
    if (err) {
      console.error("PRESCRIBE CHECK ASSIGNMENT ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(403).json({
        message: "You are not assigned to this patient or no treatment plan exists",
      });
    }

    const planId = results[0].plan_id;

    // 3. Insert medication into medications table
    const insertSql = `
      INSERT INTO medications
        (plan_id, medication_name, dose, frequency, instructions, start_date, end_date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertSql,
      [
        planId,
        medicine_name,
        dose,
        freq,
        instructions || null,
        start_date || null,
        end_date || null,
      ],
      (insertErr, result) => {
        if (insertErr) {
          console.error("PRESCRIBE INSERT ERROR:", insertErr);
          return res.status(500).json({ message: "Failed to add medication" });
        }

        return res.status(201).json({
          message: "Medication prescribed successfully",
          medication_id: result.insertId,
          plan_id: planId,
          medicine_name,
          dose,
          freq,
        });
      }
    );
  });
};

module.exports = {
  getMyPlan,
  prescribe,
};