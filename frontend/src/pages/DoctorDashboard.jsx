import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function DoctorDashboard() {
  return (
    <div className="dashboard-page">
      <aside className="sidebar doctor-sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <span className="material-symbols-outlined">medical_services</span>
          </div>

          <div>
            <h2>War Injuries Care</h2>
            <p>Doctor Portal</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/doctor-dashboard" className="active">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>

          <Link to="/doctor-patients">
            <span className="material-symbols-outlined">groups</span>
            Patients Management
          </Link>

          <a href="#records">
            <span className="material-symbols-outlined">clinical_notes</span>
            Medical Records
          </a>

          <Link to="/doctor-update-treatment">
            <span className="material-symbols-outlined">edit_note</span>
            Treatment Plans
          </Link>

          <Link to="/doctor-chat">
            <span className="material-symbols-outlined">chat</span>
            Patient Chat
          </Link>

          <Link to="/doctor-profile">
            <span className="material-symbols-outlined">person</span>
            Doctor Profile
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
            <h1>Doctor Dashboard</h1>
            <p>
              Monitor patient cases, treatment updates, and urgent medical
              needs.
            </p>
          </div>

          <div className="topbar-actions">
            <button className="emergency-action">
              <span className="material-symbols-outlined">notifications</span>
              Critical Alerts
            </button>

            <div className="user-avatar">
              <span className="material-symbols-outlined">stethoscope</span>
            </div>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-box blue">
            <div>
              <p>Total Patients</p>
              <h2>48</h2>
            </div>
            <span className="material-symbols-outlined">groups</span>
          </div>

          <div className="stat-box red">
            <div>
              <p>Critical Cases</p>
              <h2>6</h2>
            </div>
            <span className="material-symbols-outlined">priority_high</span>
          </div>

          <div className="stat-box orange">
            <div>
              <p>Pending Reviews</p>
              <h2>14</h2>
            </div>
            <span className="material-symbols-outlined">pending_actions</span>
          </div>

          <div className="stat-box green">
            <div>
              <p>Improving Cases</p>
              <h2>28</h2>
            </div>
            <span className="material-symbols-outlined">trending_up</span>
          </div>
        </section>

        <section className="doctor-layout">
          <div className="content-left">
            <div className="panel" id="patients">
              <div className="panel-header">
                <div>
                  <h2>Assigned Patients</h2>
                  <p>Recently updated patient cases.</p>
                </div>

                <Link to="/doctor-patients">
                  <button>View All</button>
                </Link>
              </div>

              <div className="doctor-patient-table">
                <div className="doctor-patient-row doctor-patient-head">
                  <span>Patient</span>
                  <span>Condition</span>
                  <span>Priority</span>
                  <span>Status</span>
                  <span>Action</span>
                </div>

                <div className="doctor-patient-row">
                  <div className="patient-cell">
                    <div className="patient-avatar">A</div>
                    <div>
                      <h3>Ahmed Hashem</h3>
                      <p>PT-2026-001</p>
                    </div>
                  </div>

                  <span>Lower limb injury</span>
                  <span className="priority-badge critical">Critical</span>
                  <span className="status pending">Review</span>
                  <button className="mini-btn">Open</button>
                </div>

                <div className="doctor-patient-row">
                  <div className="patient-cell">
                    <div className="patient-avatar">M</div>
                    <div>
                      <h3>Mohammed Ali</h3>
                      <p>PT-2026-014</p>
                    </div>
                  </div>

                  <span>Wound follow-up</span>
                  <span className="priority-badge medium">Medium</span>
                  <span className="status taken">Stable</span>
                  <button className="mini-btn">Open</button>
                </div>

                <div className="doctor-patient-row">
                  <div className="patient-cell">
                    <div className="patient-avatar">S</div>
                    <div>
                      <h3>Sara Nabil</h3>
                      <p>PT-2026-022</p>
                    </div>
                  </div>

                  <span>Physical therapy</span>
                  <span className="priority-badge low">Low</span>
                  <span className="status taken">Improving</span>
                  <button className="mini-btn">Open</button>
                </div>
              </div>
            </div>

            <div className="panel" id="treatment">
              <div className="panel-header">
                <div>
                  <h2>Treatment Plan Updates</h2>
                  <p>Recent changes made to patient treatment plans.</p>
                </div>
              </div>

              <div className="doctor-update-list">
                <div className="doctor-update-item">
                  <span className="material-symbols-outlined">edit_note</span>
                  <div>
                    <h3>Ahmed Hashem</h3>
                    <p>Medication phase extended for 7 days.</p>
                    <small>Updated today • 11:30 AM</small>
                  </div>
                </div>

                <div className="doctor-update-item">
                  <span className="material-symbols-outlined">assignment</span>
                  <div>
                    <h3>Mohammed Ali</h3>
                    <p>Wound care frequency changed to twice daily.</p>
                    <small>Yesterday • 04:15 PM</small>
                  </div>
                </div>

                <div className="doctor-update-item">
                  <span className="material-symbols-outlined">
                    directions_walk
                  </span>
                  <div>
                    <h3>Sara Nabil</h3>
                    <p>Physical therapy stage two has started.</p>
                    <small>2 days ago • 09:20 AM</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-right">
            <div className="panel progress-panel">
              <h2>Case Overview</h2>

              <div className="progress-circle">
                <span>68%</span>
              </div>

              <p>
                Most assigned cases are stable or improving, with several
                critical patients needing follow-up today.
              </p>
            </div>

            <div className="panel">
              <h2>Critical Alerts</h2>

              <div className="alert-card critical-alert">
                <span className="material-symbols-outlined">warning</span>
                <div>
                  <h3>High pain reported</h3>
                  <p>Ahmed Hashem reported increased pain level.</p>
                </div>
              </div>

              <div className="alert-card">
                <span className="material-symbols-outlined">photo_camera</span>
                <div>
                  <h3>New wound photo</h3>
                  <p>New image uploaded for medical review.</p>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>Today’s Schedule</h2>

              <div className="appointment-card">
                <div className="appointment-date">
                  <strong>10</strong>
                  <span>AM</span>
                </div>

                <div>
                  <h3>Online Consultation</h3>
                  <p>Ahmed Hashem • Wound review</p>
                </div>
              </div>

              <div className="appointment-card">
                <div className="appointment-date">
                  <strong>12</strong>
                  <span>PM</span>
                </div>

                <div>
                  <h3>Therapy Review</h3>
                  <p>Sara Nabil • Progress check</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DoctorDashboard;
