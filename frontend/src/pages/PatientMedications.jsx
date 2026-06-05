import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function PatientMedications() {
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

          <Link to="/patient-medications" className="active">
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

          <Link to="/patient-progress">
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
            <h1>Medication Reminders</h1>
            <p>Track your medicines, dosage times, and daily adherence.</p>
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
              <p>Total Medicines</p>
              <h2>6</h2>
            </div>
            <span className="material-symbols-outlined">medication</span>
          </div>

          <div className="stat-box green">
            <div>
              <p>Taken Today</p>
              <h2>4</h2>
            </div>
            <span className="material-symbols-outlined">check_circle</span>
          </div>

          <div className="stat-box orange">
            <div>
              <p>Pending Today</p>
              <h2>2</h2>
            </div>
            <span className="material-symbols-outlined">schedule</span>
          </div>

          <div className="stat-box red">
            <div>
              <p>Missed Doses</p>
              <h2>1</h2>
            </div>
            <span className="material-symbols-outlined">warning</span>
          </div>
        </section>

        <section className="medication-layout">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Today’s Schedule</h2>
                <p>Medicine reminders arranged by time.</p>
              </div>

              <button>Add Reminder</button>
            </div>

            <div className="med-table">
              <div className="med-row med-head">
                <span>Medicine</span>
                <span>Dosage</span>
                <span>Time</span>
                <span>Status</span>
                <span>Action</span>
              </div>

              <div className="med-row">
                <div className="med-name">
                  <div className="medicine-icon blue-icon">
                    <span className="material-symbols-outlined">
                      medication
                    </span>
                  </div>

                  <div>
                    <h3>Amoxicillin</h3>
                    <p>Antibiotic</p>
                  </div>
                </div>

                <span>500mg</span>
                <span>09:00 AM</span>
                <span className="status taken">Taken</span>
                <button className="mini-btn disabled">Completed</button>
              </div>

              <div className="med-row">
                <div className="med-name">
                  <div className="medicine-icon orange-icon">
                    <span className="material-symbols-outlined">pill</span>
                  </div>

                  <div>
                    <h3>Pain Relief</h3>
                    <p>After meals</p>
                  </div>
                </div>

                <span>1 tablet</span>
                <span>02:00 PM</span>
                <span className="status pending">Pending</span>
                <button className="mini-btn">Mark Taken</button>
              </div>

              <div className="med-row">
                <div className="med-name">
                  <div className="medicine-icon green-icon">
                    <span className="material-symbols-outlined">healing</span>
                  </div>

                  <div>
                    <h3>Wound Cream</h3>
                    <p>External use</p>
                  </div>
                </div>

                <span>Apply once</span>
                <span>10:00 PM</span>
                <span className="status pending">Pending</span>
                <button className="mini-btn">Mark Taken</button>
              </div>
            </div>
          </div>

          <div className="panel reminder-panel">
            <h2>Next Reminder</h2>

            <div className="reminder-time">
              <span className="material-symbols-outlined">schedule</span>

              <div>
                <h3>02:00 PM</h3>
                <p>Pain Relief Tablet</p>
              </div>
            </div>

            <div className="reminder-note">
              <h3>Doctor Note</h3>
              <p>
                Take this medicine after lunch. Avoid taking it on an empty
                stomach.
              </p>
            </div>

            <button className="message-btn">
              <span className="material-symbols-outlined">
                notifications_active
              </span>
              Enable Notifications
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PatientMedications;
