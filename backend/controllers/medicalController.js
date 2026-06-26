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

module.exports = {
  getMyPlan,
};
