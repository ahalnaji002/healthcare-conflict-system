import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function PatientProgress() {
  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <span className="material-symbols-outlined">medical_services</span>
          </div>

          <div>
            <h2>War Injuries Care</h2>
            <p>Patient Portal</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/patient-dashboard">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>

          <Link to="/patient-medications">
            <span className="material-symbols-outlined">medication</span>
            Medication Reminders
          </Link>

          <Link to="/patient-appointments">
            <span className="material-symbols-outlined">calendar_month</span>
            Appointments
          </Link>

          <Link to="/patient-treatment">
            <span className="material-symbols-outlined">assignment</span>
            Treatment Plan
          </Link>

          <Link to="/patient-requests">
            <span className="material-symbols-outlined">
              volunteer_activism
            </span>
            Assistance Requests
          </Link>

          <Link to="/patient-progress" className="active">
            <span className="material-symbols-outlined">monitoring</span>
            Health Progress
          </Link>

          <Link to="/patient-chat">
            <span className="material-symbols-outlined">chat</span>
            Doctor Chat
          </Link>

          <Link to="/patient-profile">
            <span className="material-symbols-outlined">person</span>
            Profile
          </Link>
        </nav>

        <div className="sidebar-footer">
          <Link to="/login">
            <span className="material-symbols-outlined">logout</span>
            Logout
          </Link>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <h1>Health Progress</h1>
            <p>
              Track recovery indicators, wound status, and treatment
              improvement.
            </p>
          </div>

          <div className="topbar-actions">
            <button className="emergency-action">
              <span className="material-symbols-outlined">emergency</span>
              Emergency Alert
            </button>

            <div className="user-avatar">
              <span className="material-symbols-outlined">person</span>
            </div>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-box blue">
            <div>
              <p>Recovery Score</p>
              <h2>72%</h2>
            </div>
            <span className="material-symbols-outlined">trending_up</span>
          </div>

          <div className="stat-box green">
            <div>
              <p>Pain Level</p>
              <h2>Low</h2>
            </div>
            <span className="material-symbols-outlined">
              sentiment_satisfied
            </span>
          </div>

          <div className="stat-box orange">
            <div>
              <p>Wound Status</p>
              <h2>Stable</h2>
            </div>
            <span className="material-symbols-outlined">healing</span>
          </div>

          <div className="stat-box red">
            <div>
              <p>Risk Alerts</p>
              <h2>0</h2>
            </div>
            <span className="material-symbols-outlined">warning</span>
          </div>
        </section>

        <section className="progress-layout">
          <div className="content-left">
            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Recovery Overview</h2>
                  <p>Weekly recovery changes based on your treatment plan.</p>
                </div>
                <button>Export Report</button>
              </div>

              <div className="progress-chart">
                <div className="chart-bar" style={{ height: "38%" }}>
                  <span>Week 1</span>
                </div>
                <div className="chart-bar" style={{ height: "52%" }}>
                  <span>Week 2</span>
                </div>
                <div className="chart-bar" style={{ height: "61%" }}>
                  <span>Week 3</span>
                </div>
                <div className="chart-bar active-bar" style={{ height: "72%" }}>
                  <span>Week 4</span>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Health Indicators</h2>
                  <p>Latest values recorded for your condition.</p>
                </div>
              </div>

              <div className="indicator-list">
                <div className="indicator-item">
                  <div>
                    <h3>Pain Level</h3>
                    <p>Current pain level compared to last week.</p>
                  </div>
                  <div className="indicator-meter">
                    <span style={{ width: "30%" }}></span>
                  </div>
                  <strong>Low</strong>
                </div>

                <div className="indicator-item">
                  <div>
                    <h3>Wound Healing</h3>
                    <p>Visible improvement based on follow-up notes.</p>
                  </div>
                  <div className="indicator-meter">
                    <span style={{ width: "76%" }}></span>
                  </div>
                  <strong>Good</strong>
                </div>

                <div className="indicator-item">
                  <div>
                    <h3>Mobility</h3>
                    <p>Movement ability after therapy and exercises.</p>
                  </div>
                  <div className="indicator-meter">
                    <span style={{ width: "64%" }}></span>
                  </div>
                  <strong>Improving</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="content-right">
            <div className="panel progress-panel">
              <h2>Overall Progress</h2>

              <div className="progress-circle">
                <span>72%</span>
              </div>

              <p>
                Your recovery is improving steadily. Continue medication, wound
                care, and therapy exercises.
              </p>
            </div>

            <div className="panel">
              <h2>Latest Record</h2>

              <div className="health-record-card">
                <span className="material-symbols-outlined">description</span>
                <div>
                  <h3>Doctor Review</h3>
                  <p>Wound condition stable, no infection signs.</p>
                  <small>Today • 11:30 AM</small>
                </div>
              </div>

              <div className="health-record-card">
                <span className="material-symbols-outlined">photo_camera</span>
                <div>
                  <h3>Wound Photo Update</h3>
                  <p>Photo submitted for doctor review.</p>
                  <small>Yesterday • 08:15 PM</small>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>Doctor Recommendation</h2>

              <div className="reminder-note">
                <h3>Continue Current Plan</h3>
                <p>
                  Keep cleaning the wound daily and attend the next physical
                  therapy session.
                </p>
              </div>

              <button className="message-btn">
                <span className="material-symbols-outlined">chat</span>
                Ask Doctor
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PatientProgress;
