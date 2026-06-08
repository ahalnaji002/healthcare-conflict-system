const db = require("../config/db");
const jwt = require("jsonwebtoken");

// ================= REGISTER PATIENT =================
const registerPatient = (req, res) => {
  const {
    name,
    email,
    password,
    birth_date,
    national_id,
    phone,
    gender,
    address,
    medical_condition,
  } = req.body;

  if (!name || !email || !password || !birth_date) {
    return res.status(400).json({
      message: "All fields are required: name, email, password, birth_date",
    });
  }

  const checkEmailSql = "SELECT id FROM users WHERE email = ?";

  db.query(checkEmailSql, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const insertUserSql = `
      INSERT INTO users 
        (full_name, email, password, phone, role, status, is_verified)
      VALUES (?, ?, ?, ?, 'patient', 'active', 0)
    `;

    db.query(
      insertUserSql,
      [name, email, password, phone || null],
      (userErr, userResult) => {
        if (userErr) {
          console.error(userErr);
          return res.status(500).json({ message: "Registration failed" });
        }

        const userId = userResult.insertId;

        const insertPatientSql = `
          INSERT INTO patients 
            (user_id, national_id, date_of_birth, gender, address, medical_condition)
          VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(
          insertPatientSql,
          [
            userId,
            national_id || null,
            birth_date,
            gender || null,
            address || null,
            medical_condition || null,
          ],
          (patientErr) => {
            if (patientErr) {
              console.error(patientErr);
              return res.status(500).json({ message: "Registration failed" });
            }

            const verificationCode = Math.floor(
              100000 + Math.random() * 900000,
            ).toString();

            const expiresAt = new Date(Date.now() + 15 * 60 * 1000)
              .toISOString()
              .slice(0, 19)
              .replace("T", " ");

            const insertCodeSql = `
              INSERT INTO verification_codes 
                (user_id, code, purpose, expires_at)
              VALUES (?, ?, 'patient_register', ?)
            `;

            db.query(
              insertCodeSql,
              [userId, verificationCode, expiresAt],
              (codeErr) => {
                if (codeErr) {
                  console.error(codeErr);
                  return res
                    .status(500)
                    .json({ message: "Registration failed" });
                }

                return res.status(201).json({
                  message:
                    "Patient registered successfully. Please verify your account.",
                  user_id: userId,
                  verification_code: verificationCode,
                });
              },
            );
          },
        );
      },
    );
  });
};

// ================= REGISTER STAFF =================
const registerStaff = (req, res) => {
  const {
    name,
    email,
    password,
    role,
    phone,
    address,
    hospital,
    specialization,
    license,
    experience,
    ngo_name,
    ngo_field,
    registration_number,
    services_description,
  } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({
      message: "All fields are required: name, email, password, role",
    });
  }

  if (role !== "doctor" && role !== "ngo") {
    return res.status(400).json({
      message: "Role must be either 'doctor' or 'ngo'",
    });
  }

  if (role === "doctor" && !license) {
    return res.status(400).json({
      message: "Medical license number is required for doctors",
    });
  }

  if (role === "ngo" && !registration_number) {
    return res.status(400).json({
      message: "Registration number is required for NGOs",
    });
  }

  const checkEmailSql =
    "SELECT join_request_id FROM join_requests WHERE email = ?";

  db.query(checkEmailSql, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length > 0) {
      return res.status(409).json({
        message: "A request with this email already exists",
      });
    }

    const insertSql = `
      INSERT INTO join_requests
        (request_type, name, email, phone, specialty, license_number,
         organization_type, description, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `;

    const specialty = role === "doctor" ? specialization : ngo_field;
    const licenseNumber = role === "doctor" ? license : registration_number;
    const orgType = role === "doctor" ? hospital : ngo_name;
    const description = role === "doctor" ? experience : services_description;

    db.query(
      insertSql,
      [
        role,
        name,
        email,
        phone || null,
        specialty || null,
        licenseNumber || null,
        orgType || null,
        description || null,
      ],
      (insertErr, result) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(500).json({ message: "Registration failed" });
        }

        return res.status(201).json({
          message:
            "Registration request submitted successfully. Please wait for admin approval.",
          request_id: result.insertId,
          status: "pending",
        });
      },
    );
  });
};

// ================= LOGIN =================
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.is_verified) {
      return res.status(403).json({
        message: "Account not verified. Please verify your email first.",
      });
    }

    if (user.status === "pending") {
      return res.status(403).json({
        message: "Account is pending admin approval. Please wait.",
      });
    }

    if (user.status === "rejected") {
      return res.status(403).json({
        message: "Account has been rejected. Please contact support.",
      });
    }

    if (user.status === "inactive") {
      return res.status(403).json({
        message: "Account is inactive. Please contact support.",
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  });
};

// ================= FORGOT PASSWORD =================
const forgotPassword = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const findUserSql = "SELECT * FROM users WHERE email = ?";

  db.query(findUserSql, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(200).json({
        message: "If this email is registered, a reset code has been sent.",
      });
    }

    const user = results[0];

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const insertSql = `
      INSERT INTO verification_codes 
        (user_id, code, purpose, expires_at)
      VALUES (?, ?, 'patient_register', ?)
    `;

    db.query(insertSql, [user.id, resetCode, expiresAt], (insertErr) => {
      if (insertErr) {
        console.error(insertErr);
        return res.status(500).json({ message: "Server error" });
      }

      console.log(`Reset code for ${email}: ${resetCode}`);

      return res.status(200).json({
        message: "If this email is registered, a reset code has been sent.",
        reset_code: resetCode,
      });
    });
  });
};

// ================= GET PROFILE =================
const getProfile = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      users.id,
      users.full_name,
      users.email,
      users.phone,
      users.role,
      users.status,
      users.is_verified,
      users.created_at,

      patients.patient_id,
      patients.national_id,
      patients.date_of_birth,
      patients.gender,
      patients.address,
      patients.city,
      patients.location,
      patients.blood_type,
      patients.chronic_diseases,
      patients.medical_condition,
      patients.emergency_contact,

      doctors.doctor_id,
      doctors.specialty,
      doctors.license_number,
      doctors.clinic_name,
      doctors.workplace,
      doctors.available_hours

    FROM users
    LEFT JOIN patients ON users.id = patients.user_id
    LEFT JOIN doctors ON users.id = doctors.user_id
    WHERE users.id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    if (!user.is_verified) {
      return res.status(403).json({
        message: "Account not verified.",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        message: "Account is not active.",
      });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        is_verified: user.is_verified,
        created_at: user.created_at,

        patient_id: user.patient_id,
        national_id: user.national_id,
        date_of_birth: user.date_of_birth,
        gender: user.gender,
        address: user.address,
        city: user.city,
        location: user.location,
        blood_type: user.blood_type,
        chronic_diseases: user.chronic_diseases,
        medical_condition: user.medical_condition,
        emergency_contact: user.emergency_contact,

        doctor_id: user.doctor_id,
        specialty: user.specialty,
        license_number: user.license_number,
        clinic_name: user.clinic_name,
        workplace: user.workplace,
        available_hours: user.available_hours,
      },
    });
  });
};

// ================= GET DOCTOR PATIENTS =================
const getDoctorPatients = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      patients.patient_id,
      patients.national_id,
      patients.date_of_birth,
      patients.gender,
      patients.address,
      patients.blood_type,
      patients.chronic_diseases,
      patients.medical_condition,
      patients.emergency_contact,

      users.full_name,
      users.email,
      users.phone,
      users.status

    FROM doctors
    JOIN patient_doctor 
      ON doctors.doctor_id = patient_doctor.doctor_id
    JOIN patients 
      ON patient_doctor.patient_id = patients.patient_id
    JOIN users 
      ON patients.user_id = users.id
    WHERE doctors.user_id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("GET DOCTOR PATIENTS ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    return res.status(200).json({
      message: "Doctor patients fetched successfully",
      patients: results,
    });
  });
};

// ================= GET DOCTOR PATIENT RECORD =================
const getDoctorPatientRecord = (req, res) => {
  const doctorUserId = req.user.id;
  const { patientId } = req.params;

  const sql = `
    SELECT 
      patients.patient_id,
      patients.national_id,
      patients.date_of_birth,
      patients.gender,
      patients.address,
      patients.blood_type,
      patients.chronic_diseases,
      patients.medical_condition,
      patients.emergency_contact,

      users.full_name,
      users.email,
      users.phone,
      users.status,

      doctors.doctor_id

    FROM doctors
    JOIN patient_doctor 
      ON doctors.doctor_id = patient_doctor.doctor_id
    JOIN patients 
      ON patient_doctor.patient_id = patients.patient_id
    JOIN users 
      ON patients.user_id = users.id
    WHERE doctors.user_id = ?
      AND patients.patient_id = ?
    LIMIT 1
  `;

  db.query(sql, [doctorUserId, patientId], (err, results) => {
    if (err) {
      console.error("GET DOCTOR PATIENT RECORD ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Patient not found or not assigned to this doctor",
      });
    }

    return res.status(200).json({
      message: "Patient record fetched successfully",
      patient: results[0],
    });
  });
};

// ================= GET PATIENT DOCTOR =================
const getPatientDoctor = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      doctors.doctor_id,
      doctors.specialty,
      doctors.license_number,
      doctors.clinic_name,
      doctors.workplace,
      doctors.available_hours,

      users.full_name,
      users.email,
      users.phone,
      users.status

    FROM patients
    JOIN patient_doctor
      ON patients.patient_id = patient_doctor.patient_id
    JOIN doctors
      ON patient_doctor.doctor_id = doctors.doctor_id
    JOIN users
      ON doctors.user_id = users.id
    WHERE patients.user_id = ?
    LIMIT 1
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("GET PATIENT DOCTOR ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "No doctor assigned to this patient yet",
      });
    }

    return res.status(200).json({
      message: "Patient doctor fetched successfully",
      doctor: results[0],
    });
  });
};

module.exports = {
  registerPatient,
  registerStaff,
  login,
  forgotPassword,
  getProfile,
  getDoctorPatients,
  getDoctorPatientRecord,
  getPatientDoctor,
};
