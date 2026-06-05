import { Link } from "react-router-dom";
import "../styles/landing.css";

function Landing() {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="logo-area">
          <div className="logo-icon">+</div>
          <div>
            <h2>War Injuries Care</h2>
            <p>Smart Medical Follow-up System</p>
          </div>
        </div>

        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#roles">Users</a>
          <a href="#about">About</a>

          <Link to="/emergency-alert" className="emergency-action">
            <span className="material-symbols-outlined">emergency</span>
            Emergency Alert
          </Link>

          <Link to="/login" className="login-link">
            Login
          </Link>
        </nav>
      </header>

      <main className="hero-section">
        <div className="hero-content">
          <span className="badge">Smart Healthcare Support</span>

          <h1>Digital Care for War Injuries and Chronic Patients</h1>

          <p>
            A smart medical follow-up platform that connects patients, doctors,
            NGOs, and administrators to improve treatment tracking, emergency
            response, and humanitarian support.
          </p>

          <div className="hero-buttons">
            <Link to="/patient-register" className="primary-btn">
              Register as Patient
            </Link>

            <Link to="/join-request" className="secondary-btn">
              Join as Doctor / NGO
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="dashboard-preview">
            <div className="preview-header">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="stat-card blue">
              <h3>Critical Cases</h3>
              <p>24 Active</p>
            </div>

            <div className="stat-card green">
              <h3>Medication Reminders</h3>
              <p>On Schedule</p>
            </div>

            <div className="stat-card orange">
              <h3>NGO Requests</h3>
              <p>12 Pending</p>
            </div>
          </div>
        </div>
      </main>

      <section className="features-section" id="features">
        <h2>Main System Features</h2>
        <p className="section-subtitle">
          Designed to support patients and medical teams in difficult
          conditions.
        </p>

        <div className="features-grid">
          <div className="feature-box">
            <div className="feature-icon">💊</div>
            <h3>Medication Reminders</h3>
            <p>Patients receive reminders for medications and appointments.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">👨‍⚕️</div>
            <h3>Doctor Follow-up</h3>
            <p>Doctors can monitor patients and update treatment plans.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">🚨</div>
            <h3>Emergency Alerts</h3>
            <p>Patients can send urgent alerts for emergency support.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">🤝</div>
            <h3>NGO Assistance</h3>
            <p>
              NGOs can manage and prioritize humanitarian assistance requests.
            </p>
          </div>
        </div>
      </section>

      <section className="roles-section" id="roles">
        <h2>Who Can Use the System?</h2>

        <div className="roles-grid">
          <div className="role-card">
            <h3>Patients</h3>
            <p>
              Track treatments, appointments, medications, and assistance
              requests.
            </p>
          </div>

          <div className="role-card">
            <h3>Doctors</h3>
            <p>
              Follow patient cases, update treatment plans, and communicate
              securely.
            </p>
          </div>

          <div className="role-card">
            <h3>NGOs</h3>
            <p>
              Review assistance requests and coordinate humanitarian support.
            </p>
          </div>

          <div className="role-card">
            <h3>Admins</h3>
            <p>
              Manage users, records, reports, system activity, and permissions.
            </p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>© 2026 War Injuries Care System. University Project.</p>
      </footer>
    </div>
  );
}

export default Landing;
