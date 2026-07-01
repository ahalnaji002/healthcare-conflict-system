import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import API from "../../services/api";
import { useState } from "react";
import AuthHeader from "../../components/AuthHeader";

function PatientRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const missingFields = [];

    if (!form.fullName.value.trim()) missingFields.push("Full Name");
    if (!form.patientId.value.trim())
      missingFields.push("National ID / Patient ID");
    if (!form.phone.value.trim()) missingFields.push("Phone Number");
    if (!form.email.value.trim()) missingFields.push("Email Address");
    if (!form.dob.value) missingFields.push("Date of Birth");
    if (!form.gender.value) missingFields.push("Gender");
    if (!form.address.value.trim())
      missingFields.push("Residential Address / City");
    if (!form.condition.value.trim())
      missingFields.push("Primary Medical Condition / Injury Summary");
    if (!form.password.value.trim()) missingFields.push("Password");
    if (!form.confirmPassword.value.trim())
      missingFields.push("Confirm Password");
    if (!form.terms.checked) missingFields.push("Terms Confirmation");

    if (missingFields.length > 0) {
      setMessageType("error");
      setMessage(
        `Please complete the following fields: ${missingFields.join(", ")}`,
      );
      return;
    }

    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      setMessageType("error");
      setMessage(
        "Password must be at least 8 characters and contain letters and numbers",
      );
      return;
    }

    if (password !== confirmPassword) {
      setMessageType("error");
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await API.post("/auth/register-patient", {
        name: form.fullName.value,
        email: form.email.value,
        password: form.password.value,
        birth_date: form.dob.value,
        national_id: form.patientId.value,
        phone: form.phone.value,
        gender: form.gender.value,
        address: form.address.value,
        medical_condition: form.condition.value,
      });

      setMessageType("success");
      setMessage("Account created successfully");

      localStorage.setItem("verify_user_id", res.data.user_id);
      localStorage.setItem("verify_email", form.email.value);
      localStorage.setItem("verify_role", "patient");

      navigate("/verify-account", {
        state: {
          user_id: res.data.user_id,
          email: form.email.value,
          role: "patient",
        },
      });
    } catch (err) {
      setMessageType("error");
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="form-page">
      <AuthHeader />

      <main className="register-main">
        <div className="register-layout">
          <aside className="register-info">
            <div className="info-primary-card">
              <h1>Join Our Network</h1>
              <p>
                Create a secure medical profile to receive specialized care
                follow-ups and connect with healthcare professionals.
              </p>
            </div>

            <div className="info-small-card">
              <div className="info-card-title">
                <span className="material-symbols-outlined">security</span>
                <h3>Encrypted Records</h3>
              </div>
              <p>
                Your medical data is encrypted and compliant with international
                healthcare privacy standards.
              </p>
            </div>

            <div className="image-card">
              <div className="image-overlay">
                <p>
                  "Every injury tells a story of survival. We help you write the
                  next chapter."
                </p>
              </div>
            </div>
          </aside>

          <section className="register-card">
            <h2>Patient Registration</h2>

            <form onSubmit={handleSubmit} className="patient-form">
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter legal name"
                  />
                </div>

                <div className="field">
                  <label htmlFor="patientId">National ID / Patient ID</label>
                  <input
                    id="patientId"
                    name="patientId"
                    type="text"
                    placeholder="ID-000-000"
                  />
                </div>

                <div className="field">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+970 000 000 000"
                  />{" "}
                </div>

                <div className="field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                  />
                </div>

                <div className="field">
                  <label htmlFor="dob">Date of Birth</label>
                  <input id="dob" name="dob" type="date" />{" "}
                </div>

                <div className="field">
                  <label htmlFor="gender">Gender</label>
                  <select id="gender" name="gender" defaultValue="">
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="address">Residential Address / City</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="123 Care Street, City, Country"
                />
              </div>

              <div className="field">
                <label htmlFor="condition">
                  Primary Medical Condition / Injury Summary
                </label>
                <textarea
                  id="condition"
                  name="condition"
                  rows="4"
                  placeholder="Briefly describe the injury and current symptoms..."
                ></textarea>
              </div>

              <div className="password-rules">
                <p className={passwordValue.length >= 8 ? "rule-valid" : ""}>
                  ✓ At least 8 characters
                </p>

                <p
                  className={/[A-Za-z]/.test(passwordValue) ? "rule-valid" : ""}
                >
                  ✓ Contains letters
                </p>

                <p className={/\d/.test(passwordValue) ? "rule-valid" : ""}>
                  ✓ Contains numbers
                </p>

                <p
                  className={
                    passwordValue &&
                    confirmPasswordValue &&
                    passwordValue === confirmPasswordValue
                      ? "rule-valid"
                      : ""
                  }
                >
                  ✓ Passwords match
                </p>
              </div>

              <div className="form-grid password-grid">
                <div className="field">
                  <label htmlFor="password">Create Password</label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters, letters and numbers"
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                  />
                </div>

                <div className="field">
                  <label htmlFor="confirmPassword">Confirm Password</label>

                  <div className="confirm-password-wrapper">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Repeat password"
                      value={confirmPasswordValue}
                      onChange={(e) => setConfirmPasswordValue(e.target.value)}
                    />

                    <button
                      type="button"
                      className="inside-eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-bottom">
                <label className="terms-check">
                  <input type="checkbox" name="terms" />
                  <span>
                    I agree to the <a href="#terms">Terms of Service</a> and{" "}
                    <a href="#privacy">Privacy Policy</a>.
                  </span>
                </label>

                {message && (
                  <p
                    className={
                      messageType === "success"
                        ? "success-message"
                        : "error-message"
                    }
                  >
                    {message}
                  </p>
                )}

                <button type="submit" className="submit-btn">
                  Create Account
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>

      <footer className="form-footer">
        <div>
          <h3>War Injuries Care</h3>
          <p>© 2026 War Injuries Care. All rights reserved.</p>
        </div>

        <div className="form-footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact Us</a>
          <a href="#medical">Medical Disclaimer</a>
        </div>
      </footer>
    </div>
  );
}

export default PatientRegister;
