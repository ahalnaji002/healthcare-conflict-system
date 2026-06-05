import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function PatientTreatment() {
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

          <Link to="/patient-treatment" className="active">
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
            <h1>Treatment Plan</h1>
            <p>
              View your recovery plan, care instructions, and doctor updates.
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
              <p>Plan Progress</p>
              <h2>72%</h2>
            </div>
            <span className="material-symbols-outlined">monitoring</span>
          </div>

          <div className="stat-box green">
            <div>
              <p>Completed Tasks</p>
              <h2>12</h2>
            </div>
            <span className="material-symbols-outlined">task_alt</span>
          </div>

          <div className="stat-box orange">
            <div>
              <p>Pending Tasks</p>
              <h2>5</h2>
            </div>
            <span className="material-symbols-outlined">pending_actions</span>
          </div>

          <div className="stat-box red">
            <div>
              <p>Doctor Updates</p>
              <h2>3</h2>
            </div>
            <span className="material-symbols-outlined">edit_note</span>
          </div>
        </section>

        <section className="treatment-layout">
          <div className="content-left">
            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Current Treatment Plan</h2>
                  <p>Updated by your assigned doctor.</p>
                </div>

                <button>Download Plan</button>
              </div>

              <div className="treatment-timeline">
                <div className="timeline-item done">
                  <div className="timeline-dot">
                    <span className="material-symbols-outlined">check</span>
                  </div>

                  <div className="timeline-content">
                    <h3>Initial Medical Assessment</h3>
                    <p>
                      Full injury evaluation and medical history review
                      completed.
                    </p>
                    <span>Completed • 20 May 2026</span>
                  </div>
                </div>

                <div className="timeline-item done">
                  <div className="timeline-dot">
                    <span className="material-symbols-outlined">check</span>
                  </div>

                  <div className="timeline-content">
                    <h3>Medication Phase</h3>
                    <p>
                      Antibiotics and pain relief medication schedule started.
                    </p>
                    <span>Completed • 22 May 2026</span>
                  </div>
                </div>

                <div className="timeline-item active-step">
                  <div className="timeline-dot">
                    <span className="material-symbols-outlined">healing</span>
                  </div>

                  <div className="timeline-content">
                    <h3>Wound Care and Follow-up</h3>
                    <p>
                      Daily wound cleaning, cream application, and photo
                      updates.
                    </p>
                    <span>In Progress • Current Stage</span>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot">
                    <span className="material-symbols-outlined">
                      directions_walk
                    </span>
                  </div>

                  <div className="timeline-content">
                    <h3>Physical Therapy</h3>
                    <p>
                      Guided rehabilitation exercises to improve movement and
                      recovery.
                    </p>
                    <span>Upcoming • Starts 02 Jun 2026</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Doctor Instructions</h2>
                  <p>Important care notes you should follow.</p>
                </div>
              </div>

              <div className="instruction-grid">
                <div className="instruction-card">
                  <span className="material-symbols-outlined">water_drop</span>
                  <h3>Clean the wound daily</h3>
                  <p>
                    Use sterile saline and keep the wound dry after cleaning.
                  </p>
                </div>

                <div className="instruction-card">
                  <span className="material-symbols-outlined">medication</span>
                  <h3>Follow medication timing</h3>
                  <p>Do not skip antibiotics or pain relief medication.</p>
                </div>

                <div className="instruction-card">
                  <span className="material-symbols-outlined">warning</span>
                  <h3>Watch warning signs</h3>
                  <p>
                    Contact your doctor if swelling, fever, or severe pain
                    appears.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="content-right">
            <div className="panel progress-panel">
              <h2>Recovery Progress</h2>

              <div className="progress-circle">
                <span>72%</span>
              </div>

              <p>
                Your doctor marked your condition as improving. Continue the
                current treatment plan carefully.
              </p>
            </div>

            <div className="panel">
              <h2>Latest Doctor Update</h2>

              <div className="doctor-update-card">
                <div className="doctor-avatar">
                  <span className="material-symbols-outlined">stethoscope</span>
                </div>

                <div>
                  <h3>Dr. Samer Khaled</h3>
                  <p>
                    Continue wound care for 7 more days. Physical therapy will
                    start after the next review.
                  </p>
                  <span>Updated today • 11:30 AM</span>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>Next Step</h2>

              <div className="reminder-time">
                <span className="material-symbols-outlined">event</span>

                <div>
                  <h3>02 Jun</h3>
                  <p>Physical Therapy Session</p>
                </div>
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

export default PatientTreatment;
