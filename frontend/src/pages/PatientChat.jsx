import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function PatientChat() {
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

          <Link to="/patient-progress">
            <span className="material-symbols-outlined">monitoring</span>
            Health Progress
          </Link>

          <Link to="/patient-chat" className="active">
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
            <h1>Doctor Chat</h1>
            <p>Communicate securely with your assigned medical team.</p>
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

        <section className="chat-layout">
          <div className="panel chat-contacts-panel">
            <div className="panel-header">
              <div>
                <h2>Medical Contacts</h2>
                <p>Select a doctor or care provider.</p>
              </div>
            </div>

            <div className="chat-contact active-contact">
              <div className="doctor-avatar">
                <span className="material-symbols-outlined">stethoscope</span>
              </div>

              <div>
                <h3>Dr. Samer Khaled</h3>
                <p>Orthopedic Specialist</p>
              </div>

              <span className="online-dot"></span>
            </div>

            <div className="chat-contact">
              <div className="doctor-avatar">
                <span className="material-symbols-outlined">healing</span>
              </div>

              <div>
                <h3>Physical Therapy Team</h3>
                <p>Rehabilitation Support</p>
              </div>
            </div>

            <div className="chat-contact">
              <div className="doctor-avatar">
                <span className="material-symbols-outlined">support_agent</span>
              </div>

              <div>
                <h3>Medical Coordinator</h3>
                <p>Follow-up Support</p>
              </div>
            </div>
          </div>

          <div className="panel chat-panel">
            <div className="chat-header">
              <div className="doctor-info">
                <div className="doctor-avatar">
                  <span className="material-symbols-outlined">stethoscope</span>
                </div>

                <div>
                  <h3>Dr. Samer Khaled</h3>
                  <p>Online now • Orthopedic Specialist</p>
                </div>
              </div>

              <button className="mini-btn">
                <span className="material-symbols-outlined">video_call</span>
                Video Call
              </button>
            </div>

            <div className="chat-messages">
              <div className="message-row doctor-message">
                <div className="message-bubble">
                  <p>
                    Hello Ahmed, I reviewed your wound photo update. The healing
                    looks stable. Continue the same cleaning routine.
                  </p>
                  <span>10:15 AM</span>
                </div>
              </div>

              <div className="message-row patient-message">
                <div className="message-bubble">
                  <p>
                    Thank you doctor. I still feel mild pain when moving my leg.
                    Is that normal?
                  </p>
                  <span>10:18 AM</span>
                </div>
              </div>

              <div className="message-row doctor-message">
                <div className="message-bubble">
                  <p>
                    Mild pain can be normal at this stage. If the pain increases
                    or swelling appears, contact me immediately.
                  </p>
                  <span>10:20 AM</span>
                </div>
              </div>

              <div className="message-row patient-message">
                <div className="message-bubble attachment-bubble">
                  <span className="material-symbols-outlined">image</span>
                  <div>
                    <strong>Wound update photo</strong>
                    <small>Uploaded successfully</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="chat-input">
              <button className="chat-icon-btn">
                <span className="material-symbols-outlined">attach_file</span>
              </button>

              <input type="text" placeholder="Write your message..." />

              <button className="send-btn">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>

          <div className="panel chat-info-panel">
            <h2>Care Summary</h2>

            <div className="care-summary-card">
              <span className="material-symbols-outlined">assignment</span>
              <div>
                <h3>Current Plan</h3>
                <p>Wound care + medication + therapy preparation.</p>
              </div>
            </div>

            <div className="care-summary-card">
              <span className="material-symbols-outlined">event</span>
              <div>
                <h3>Next Visit</h3>
                <p>29 May • 10:30 AM • Online consultation.</p>
              </div>
            </div>

            <div className="care-summary-card warning-summary">
              <span className="material-symbols-outlined">warning</span>
              <div>
                <h3>Emergency Note</h3>
                <p>
                  Use emergency alert if bleeding, fever, or severe pain
                  appears.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PatientChat;
