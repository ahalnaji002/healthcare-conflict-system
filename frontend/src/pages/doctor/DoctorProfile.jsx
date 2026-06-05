import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

function DoctorProfile() {
  return (
    <div className="dashboard-page">
      

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <h1>Doctor Profile</h1>
            <p>
              Manage professional information, availability, and account
              settings.
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

        <section className="profile-layout">
          <div className="content-left">
            <div className="panel profile-main-card">
              <div className="profile-header-card doctor-profile-header">
                <div className="profile-photo">
                  <span className="material-symbols-outlined">stethoscope</span>
                </div>

                <div>
                  <h2>Dr. Samer Khaled</h2>
                  <p>Orthopedic Specialist • License: MED-2026-445</p>

                  <div className="profile-badges">
                    <span className="tag blue-tag">Verified Doctor</span>
                    <span className="tag green-tag">Available Today</span>
                  </div>
                </div>
              </div>

              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <span className="material-symbols-outlined">
                    medical_services
                  </span>
                  <div>
                    <p>Specialization</p>
                    <h3>Orthopedic</h3>
                  </div>
                </div>

                <div className="profile-info-item">
                  <span className="material-symbols-outlined">business</span>
                  <div>
                    <p>Workplace</p>
                    <h3>Al Shifa Medical Center</h3>
                  </div>
                </div>

                <div className="profile-info-item">
                  <span className="material-symbols-outlined">groups</span>
                  <div>
                    <p>Assigned Patients</p>
                    <h3>48 Patients</h3>
                  </div>
                </div>

                <div className="profile-info-item">
                  <span className="material-symbols-outlined">star</span>
                  <div>
                    <p>Experience</p>
                    <h3>12 Years</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Professional Information</h2>
                  <p>Medical profile details visible to patients and admins.</p>
                </div>

                <button>Edit</button>
              </div>

              <div className="profile-form-grid">
                <div className="profile-field">
                  <label>Full Name</label>
                  <input value="Dr. Samer Khaled" readOnly />
                </div>

                <div className="profile-field">
                  <label>Email</label>
                  <input value="samer.khaled@example.com" readOnly />
                </div>

                <div className="profile-field">
                  <label>Phone</label>
                  <input value="+970 599 222 333" readOnly />
                </div>

                <div className="profile-field">
                  <label>Medical License</label>
                  <input value="MED-2026-445" readOnly />
                </div>

                <div className="profile-field">
                  <label>Specialization</label>
                  <input value="Orthopedic Specialist" readOnly />
                </div>

                <div className="profile-field">
                  <label>Service Location</label>
                  <input value="Gaza, Palestine" readOnly />
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Availability Schedule</h2>
                  <p>Weekly consultation availability.</p>
                </div>

                <button>Update Schedule</button>
              </div>

              <div className="availability-grid">
                <div className="availability-card active-day">
                  <h3>Sunday</h3>
                  <p>09:00 AM - 02:00 PM</p>
                </div>

                <div className="availability-card active-day">
                  <h3>Monday</h3>
                  <p>10:00 AM - 04:00 PM</p>
                </div>

                <div className="availability-card">
                  <h3>Tuesday</h3>
                  <p>Not Available</p>
                </div>

                <div className="availability-card active-day">
                  <h3>Wednesday</h3>
                  <p>09:00 AM - 01:00 PM</p>
                </div>

                <div className="availability-card active-day">
                  <h3>Thursday</h3>
                  <p>11:00 AM - 03:00 PM</p>
                </div>

                <div className="availability-card">
                  <h3>Friday</h3>
                  <p>Not Available</p>
                </div>
              </div>
            </div>
          </div>

          <div className="content-right">
            <div className="panel progress-panel">
              <h2>Performance Summary</h2>

              <div className="progress-circle">
                <span>92%</span>
              </div>

              <p>
                Strong follow-up performance based on patient reviews, response
                time, and treatment updates.
              </p>
            </div>

            <div className="panel">
              <h2>Account Status</h2>

              <div className="security-list">
                <div className="security-item">
                  <span className="material-symbols-outlined">verified</span>
                  <div>
                    <h3>Verification</h3>
                    <p>Approved by system admin.</p>
                  </div>
                </div>

                <div className="security-item">
                  <span className="material-symbols-outlined">shield_lock</span>
                  <div>
                    <h3>Data Access</h3>
                    <p>Allowed to access assigned patient records only.</p>
                  </div>
                </div>

                <div className="security-item">
                  <span className="material-symbols-outlined">lock</span>
                  <div>
                    <h3>Password</h3>
                    <p>Last changed 45 days ago.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>Quick Actions</h2>

              <div className="doctor-actions-grid">
                <Link to="/doctor-patients">
                  <button className="message-btn">
                    <span className="material-symbols-outlined">groups</span>
                    View Patients
                  </button>
                </Link>

                <Link to="/doctor-chat">
                  <button className="message-btn secondary-message-btn">
                    <span className="material-symbols-outlined">chat</span>
                    Open Chat
                  </button>
                </Link>

                <button className="message-btn secondary-message-btn">
                  <span className="material-symbols-outlined">settings</span>
                  Account Settings
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DoctorProfile;
