import "../../styles/dashboard.css";

function PatientDashboard() {
  return (
      <>
        <header className="dashboard-topbar">
          <div>
            <h1>Patient Dashboard</h1>
            <p>Welcome back, Ahmed. Here is your medical follow-up summary.</p>
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
              <p>Upcoming Appointments</p>
              <h2>3</h2>
            </div>
            <span className="material-symbols-outlined">calendar_month</span>
          </div>

          <div className="stat-box green">
            <div>
              <p>Medication Reminders</p>
              <h2>8</h2>
            </div>
            <span className="material-symbols-outlined">medication</span>
          </div>

          <div className="stat-box orange">
            <div>
              <p>Pending Requests</p>
              <h2>2</h2>
            </div>
            <span className="material-symbols-outlined">hourglass_top</span>
          </div>

          <div className="stat-box red">
            <div>
              <p>Emergency Status</p>
              <h2>Safe</h2>
            </div>
            <span className="material-symbols-outlined">health_and_safety</span>
          </div>
        </section>

        <section className="dashboard-content">
          <div className="content-left">
            <div className="panel" id="medications">
              <div className="panel-header">
                <div>
                  <h2>Today’s Medication Reminders</h2>
                  <p>Your scheduled medicines for today.</p>
                </div>
                <button>View All</button>
              </div>

              <div className="medicine-list">
                <div className="medicine-item">
                  <div className="medicine-icon blue-icon">
                    <span className="material-symbols-outlined">
                      medication
                    </span>
                  </div>
                  <div>
                    <h3>Amoxicillin 500mg</h3>
                    <p>After breakfast • 09:00 AM</p>
                  </div>
                  <span className="status taken">Taken</span>
                </div>

                <div className="medicine-item">
                  <div className="medicine-icon orange-icon">
                    <span className="material-symbols-outlined">pill</span>
                  </div>
                  <div>
                    <h3>Pain Relief Tablet</h3>
                    <p>After lunch • 02:00 PM</p>
                  </div>
                  <span className="status pending">Pending</span>
                </div>

                <div className="medicine-item">
                  <div className="medicine-icon green-icon">
                    <span className="material-symbols-outlined">healing</span>
                  </div>
                  <div>
                    <h3>Wound Care Cream</h3>
                    <p>Before sleep • 10:00 PM</p>
                  </div>
                  <span className="status pending">Pending</span>
                </div>
              </div>
            </div>

            <div className="panel" id="appointments">
              <div className="panel-header">
                <div>
                  <h2>Upcoming Appointments</h2>
                  <p>Doctor visits and follow-up sessions.</p>
                </div>
                <button>Schedule</button>
              </div>

              <div className="appointment-card">
                <div className="appointment-date">
                  <strong>29</strong>
                  <span>May</span>
                </div>

                <div>
                  <h3>Orthopedic Follow-up</h3>
                  <p>Dr. Samer Khaled • 10:30 AM • Online Consultation</p>
                </div>
              </div>

              <div className="appointment-card">
                <div className="appointment-date">
                  <strong>02</strong>
                  <span>Jun</span>
                </div>

                <div>
                  <h3>Physical Therapy Session</h3>
                  <p>Rehabilitation Center • 12:00 PM • In Person</p>
                </div>
              </div>
            </div>
          </div>

          <div className="content-right">
            <div className="panel progress-panel" id="progress">
              <h2>Health Progress</h2>

              <div className="progress-circle">
                <span>72%</span>
              </div>

              <p>
                Your recovery progress is improving. Continue following your
                treatment plan and medication reminders.
              </p>
            </div>

            <div className="panel" id="requests">
              <div className="panel-header simple">
                <h2>Assistance Requests</h2>
              </div>

              <div className="request-item">
                <span className="request-dot urgent"></span>
                <div>
                  <h3>Medical Supplies</h3>
                  <p>Status: Under Review</p>
                </div>
              </div>

              <div className="request-item">
                <span className="request-dot normal"></span>
                <div>
                  <h3>Transportation Support</h3>
                  <p>Status: Approved</p>
                </div>
              </div>
            </div>

            <div className="panel doctor-card">
              <h2>Assigned Doctor</h2>

              <div className="doctor-info">
                <div className="doctor-avatar">
                  <span className="material-symbols-outlined">stethoscope</span>
                </div>

                <div>
                  <h3>Dr. Samer Khaled</h3>
                  <p>Orthopedic Specialist</p>
                </div>
              </div>

              <button className="message-btn">
                <span className="material-symbols-outlined">chat</span>
                Send Message
              </button>
            </div>
          </div>
        </section>
      </>
  );
}

export default PatientDashboard;
