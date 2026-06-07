import { Link } from "react-router-dom";
import "../../styles/dashboard.css";
import API from "../../services/api";
import { useState } from "react";

function PatientRegister() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    if (form.password.value !== form.confirmPassword.value) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await API.post("/auth/register-patient", {
        name: e.target.fullName.value,
        email: e.target.email.value,
        password: e.target.password.value,
        birth_date: e.target.dob.value,
        national_id: e.target.patientId.value,
        phone: e.target.phone.value,
        gender: e.target.gender.value,
        address: e.target.address.value,
        medical_condition: e.target.condition.value,
      });

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="form-page">
      <header className="form-header">
        <Link to="/" className="form-logo">
          War Injuries Care
        </Link>

        <nav className="form-nav">
          <Link to="/">Home</Link>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <Link to="/join-request" className="active-link">
            Join Us
          </Link>
        </nav>

        <div className="form-header-actions">
          <Link to="/login">Login</Link>
          <button type="button" className="emergency-btn">
            Emergency Help
          </button>
        </div>
      </header>

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
                    type="text"
                    placeholder="Enter legal name"
                  />
                </div>

                <div className="field">
                  <label htmlFor="patientId">National ID / Patient ID</label>
                  <input id="patientId" type="text" placeholder="ID-000-000" />
                </div>

                <div className="field">
                  <label htmlFor="phone">Phone Number</label>
                  <input id="phone" type="tel" placeholder="+970 000 000 000" />
                </div>

                <div className="field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                  />
                </div>

                <div className="field">
                  <label htmlFor="dob">Date of Birth</label>
                  <input id="dob" type="date" />
                </div>

                <div className="field">
                  <label htmlFor="gender">Gender</label>
                  <select id="gender" defaultValue="">
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
                  rows="4"
                  placeholder="Briefly describe the injury and current symptoms..."
                ></textarea>
              </div>

              <div className="form-grid">
                <div className="field">
                  <label htmlFor="password">Create Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Min. 8 characters"
                  />
                </div>

                <div className="field">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repeat password"
                  />
                </div>
              </div>

              <div className="form-bottom">
                <label className="terms-check">
                  <input type="checkbox" />
                  <span>
                    I agree to the <a href="#terms">Terms of Service</a> and{" "}
                    <a href="#privacy">Privacy Policy</a>.
                  </span>
                </label>

                {message && (
                  <p style={{ color: "green", marginBottom: "10px" }}>
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
