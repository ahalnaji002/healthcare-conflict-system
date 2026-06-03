import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/dashboard.css";

function Login() {
  const [selectedRole, setSelectedRole] = useState("patient");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (selectedRole === "patient") {
      navigate("/patient-dashboard");
    } else if (selectedRole === "doctor") {
      navigate("/doctor-dashboard");
    } else if (selectedRole === "ngo") {
      navigate("/ngo-dashboard");
    } else if (selectedRole === "admin") {
      navigate("/admin-dashboard");
    }
  };

  return (
    <div className="auth-page">
      <header className="auth-header">
        <Link to="/" className="auth-logo">
          <div className="auth-logo-icon">
            <span className="material-symbols-outlined">medical_services</span>
          </div>
          <div>
            <h2>War Injuries Care</h2>
            <p>Smart Medical Follow-up System</p>
          </div>
        </Link>

        <nav className="auth-nav">
          <Link to="/">Home</Link>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <Link to="/join-request">Join Us</Link>
          <Link to="/login" className="auth-nav-active">
            Login
          </Link>
        </nav>
      </header>

      <main className="auth-main">
        <section className="auth-left">
          <div className="emergency-box">
            <span className="material-symbols-outlined">emergency</span>
            <div>
              <h3>Emergency Help</h3>
              <p>Fast access for urgent war injury medical support.</p>
            </div>
          </div>

          <h1>Welcome Back</h1>
          <p className="auth-subtitle">
            Access your specialized care portal and continue your medical
            follow-up journey.
          </p>

          <div className="trust-card">
            <span className="material-symbols-outlined">verified_user</span>
            <div>
              <h3>HIPAA Compliant & Secure Data Encryption</h3>
              <p>
                Your medical records, messages, and personal information are
                protected with secure access controls.
              </p>
            </div>
          </div>
        </section>

        <section className="auth-card">
          <div className="auth-card-header">
            <h2>Secure Login</h2>
            <p>Choose your access level to continue.</p>
          </div>

          <div className="role-section">
            <h3>Select Your Access Level</h3>

            <div className="role-grid">
              <button
                type="button"
                className={`role-card ${
                  selectedRole === "patient" ? "active-role-card" : ""
                }`}
                onClick={() => setSelectedRole("patient")}
              >
                <span className="material-symbols-outlined">person</span>
                <p>Patient</p>
              </button>

              <button
                type="button"
                className={`role-card ${
                  selectedRole === "doctor" ? "active-role-card" : ""
                }`}
                onClick={() => setSelectedRole("doctor")}
              >
                <span className="material-symbols-outlined">
                  medical_services
                </span>
                <p>Doctor</p>
              </button>

              <button
                type="button"
                className={`role-card ${
                  selectedRole === "ngo" ? "active-role-card" : ""
                }`}
                onClick={() => setSelectedRole("ngo")}
              >
                <span className="material-symbols-outlined">
                  volunteer_activism
                </span>
                <p>NGO</p>
              </button>

              <button
                type="button"
                className={`role-card ${
                  selectedRole === "admin" ? "active-role-card" : ""
                }`}
                onClick={() => setSelectedRole("admin")}
              >
                <span className="material-symbols-outlined">
                  admin_panel_settings
                </span>
                <p>Admin</p>
              </button>
            </div>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <span className="material-symbols-outlined">mail</span>
                <input type="email" placeholder="Enter your email address" />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label>Password</label>
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>

              <div className="input-wrapper">
                <span className="material-symbols-outlined">lock</span>
                <input type="password" placeholder="Enter your password" />
              </div>
            </div>

            <button type="submit" className="auth-primary-btn">
              Secure Login
            </button>
          </form>

          <div className="auth-actions">
            <p>New to the platform?</p>

            <Link to="/patient-register" className="register-link">
              Patient Register
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>

            <p className="join-text">
              Doctors/NGOs:
              <Link to="/join-request"> Request to Join</Link>
            </p>
          </div>
        </section>
      </main>

      <footer className="auth-footer">
        <div>
          <h3>War Injuries Care</h3>
          <p>Empowering recovery through coordination.</p>
        </div>

        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact Us</a>
          <a href="#medical">Medical Disclaimer</a>
        </div>

        <p className="copyright">
          © 2026 War Injuries Care. University Project.
        </p>
      </footer>
    </div>
  );
}

export default Login;
