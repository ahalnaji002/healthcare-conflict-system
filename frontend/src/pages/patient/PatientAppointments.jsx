import "../../styles/dashboard.css";

function PatientAppointments() {
  return (
      <>
        <header className="dashboard-topbar">
          <div>
            <h1>Appointments</h1>
            <p>
              Manage medical visits, therapy sessions, and online follow-ups.
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
              <p>Total Appointments</p>
              <h2>7</h2>
            </div>
            <span className="material-symbols-outlined">event_available</span>
          </div>

          <div className="stat-box green">
            <div>
              <p>Completed</p>
              <h2>4</h2>
            </div>
            <span className="material-symbols-outlined">check_circle</span>
          </div>

          <div className="stat-box orange">
            <div>
              <p>Upcoming</p>
              <h2>3</h2>
            </div>
            <span className="material-symbols-outlined">schedule</span>
          </div>

          <div className="stat-box red">
            <div>
              <p>Urgent Visits</p>
              <h2>1</h2>
            </div>
            <span className="material-symbols-outlined">priority_high</span>
          </div>
        </section>

        <section className="appointments-layout">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Upcoming Medical Appointments</h2>
                <p>Your scheduled visits and consultations.</p>
              </div>

              <button>Request Appointment</button>
            </div>

            <div className="appointment-list-large">
              <div className="appointment-large-card">
                <div className="appointment-date big">
                  <strong>29</strong>
                  <span>May</span>
                </div>

                <div className="appointment-details">
                  <h3>Orthopedic Follow-up</h3>
                  <p>Dr. Samer Khaled • Online Consultation • 10:30 AM</p>

                  <div className="appointment-tags">
                    <span className="tag blue-tag">Online</span>
                    <span className="tag orange-tag">Upcoming</span>
                  </div>
                </div>

                <button className="mini-btn">Join Call</button>
              </div>

              <div className="appointment-large-card">
                <div className="appointment-date big">
                  <strong>02</strong>
                  <span>Jun</span>
                </div>

                <div className="appointment-details">
                  <h3>Physical Therapy Session</h3>
                  <p>Rehabilitation Center • In Person • 12:00 PM</p>

                  <div className="appointment-tags">
                    <span className="tag green-tag">In Person</span>
                    <span className="tag orange-tag">Upcoming</span>
                  </div>
                </div>

                <button className="mini-btn">Details</button>
              </div>

              <div className="appointment-large-card">
                <div className="appointment-date big">
                  <strong>08</strong>
                  <span>Jun</span>
                </div>

                <div className="appointment-details">
                  <h3>Wound Care Review</h3>
                  <p>Medical Center • In Person • 09:00 AM</p>

                  <div className="appointment-tags">
                    <span className="tag green-tag">In Person</span>
                    <span className="tag blue-tag">Review</span>
                  </div>
                </div>

                <button className="mini-btn">Details</button>
              </div>
            </div>
          </div>

          <div className="panel reminder-panel">
            <h2>Next Appointment</h2>

            <div className="reminder-time">
              <span className="material-symbols-outlined">event</span>

              <div>
                <h3>29 May</h3>
                <p>10:30 AM</p>
              </div>
            </div>

            <div className="reminder-note">
              <h3>Preparation Note</h3>
              <p>
                Prepare your latest medical report and any photos related to the
                wound condition before the consultation.
              </p>
            </div>

            <button className="message-btn">
              <span className="material-symbols-outlined">video_call</span>
              Join Online Visit
            </button>
          </div>
        </section>
      </>
  );
}

export default PatientAppointments;
