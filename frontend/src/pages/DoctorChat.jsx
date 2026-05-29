import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function DoctorChat() {
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
          <Link to="/doctor-dashboard">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>

          <Link to="/doctor-patients">
            <span className="material-symbols-outlined">groups</span>
            Patients Management
          </Link>

          <Link to="/doctor-patient-record">
            <span className="material-symbols-outlined">clinical_notes</span>
            Medical Records
          </Link>

          <Link to="/doctor-update-treatment">
            <span className="material-symbols-outlined">edit_note</span>
            Treatment Plans
          </Link>

          <Link to="/doctor-chat" className="active">
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
            <h1>Patient Chat</h1>
            <p>
              Communicate with patients, review updates, and respond securely.
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

        <section className="chat-layout">
          <div className="panel chat-contacts-panel">
            <div className="panel-header">
              <div>
                <h2>Patients</h2>
                <p>Select a patient conversation.</p>
              </div>
            </div>

            <div className="chat-contact active-contact">
              <div className="patient-avatar">A</div>

              <div>
                <h3>Ahmed Hashem</h3>
                <p>New wound photo • 2 min ago</p>
              </div>

              <span className="online-dot"></span>
            </div>

            <div className="chat-contact">
              <div className="patient-avatar">M</div>

              <div>
                <h3>Mohammed Ali</h3>
                <p>Medication question • 15 min ago</p>
              </div>
            </div>

            <div className="chat-contact">
              <div className="patient-avatar">S</div>

              <div>
                <h3>Sara Nabil</h3>
                <p>Therapy progress update • 1 hour ago</p>
              </div>
            </div>

            <div className="chat-contact">
              <div className="patient-avatar">R</div>

              <div>
                <h3>Rami Saleh</h3>
                <p>Pain level increased • Urgent</p>
              </div>

              <span className="urgent-dot"></span>
            </div>
          </div>

          <div className="panel chat-panel">
            <div className="chat-header">
              <div className="doctor-info">
                <div className="patient-avatar">A</div>

                <div>
                  <h3>Ahmed Hashem</h3>
                  <p>Online now • Critical priority case</p>
                </div>
              </div>

              <div className="chat-header-actions">
                <Link to="/doctor-patient-record">
                  <button className="mini-btn">
                    <span className="material-symbols-outlined">
                      clinical_notes
                    </span>
                    Record
                  </button>
                </Link>

                <button className="mini-btn">
                  <span className="material-symbols-outlined">video_call</span>
                  Video Call
                </button>
              </div>
            </div>

            <div className="chat-messages">
              <div className="message-row patient-message doctor-view-patient">
                <div className="message-bubble">
                  <p>
                    Doctor, I uploaded a new wound photo. I still feel pain
                    while walking.
                  </p>
                  <span>10:12 AM</span>
                </div>
              </div>

              <div className="message-row patient-message doctor-view-patient">
                <div className="message-bubble attachment-bubble patient-attachment">
                  <span className="material-symbols-outlined">image</span>
                  <div>
                    <strong>Wound update photo</strong>
                    <small>Uploaded successfully</small>
                  </div>
                </div>
              </div>

              <div className="message-row doctor-message doctor-view-doctor">
                <div className="message-bubble">
                  <p>
                    I reviewed the photo. The wound looks stable, but keep
                    cleaning it daily and avoid pressure on the injured leg.
                  </p>
                  <span>10:18 AM</span>
                </div>
              </div>

              <div className="message-row doctor-message doctor-view-doctor">
                <div className="message-bubble">
                  <p>
                    If pain increases or swelling appears, send an emergency
                    alert immediately.
                  </p>
                  <span>10:20 AM</span>
                </div>
              </div>
            </div>

            <div className="chat-input">
              <button className="chat-icon-btn">
                <span className="material-symbols-outlined">attach_file</span>
              </button>

              <input type="text" placeholder="Write medical advice..." />

              <button className="send-btn">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>

          <div className="panel chat-info-panel">
            <h2>Patient Summary</h2>

            <div className="care-summary-card">
              <span className="material-symbols-outlined">priority_high</span>
              <div>
                <h3>Priority</h3>
                <p>Critical case requiring close follow-up.</p>
              </div>
            </div>

            <div className="care-summary-card">
              <span className="material-symbols-outlined">healing</span>
              <div>
                <h3>Condition</h3>
                <p>Lower limb injury with wound care monitoring.</p>
              </div>
            </div>

            <div className="care-summary-card">
              <span className="material-symbols-outlined">medication</span>
              <div>
                <h3>Medication</h3>
                <p>Antibiotics, pain relief, wound care cream.</p>
              </div>
            </div>

            <div className="care-summary-card warning-summary">
              <span className="material-symbols-outlined">warning</span>
              <div>
                <h3>Latest Alert</h3>
                <p>Patient reported increased pain while walking.</p>
              </div>
            </div>

            <Link to="/doctor-update-treatment">
              <button className="message-btn">
                <span className="material-symbols-outlined">edit_note</span>
                Update Treatment Plan
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DoctorChat;
