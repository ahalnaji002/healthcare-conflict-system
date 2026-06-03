import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

function PatientProfile() {
  return (
      <>
        <header className="dashboard-topbar">
          <div>
            <h1>Patient Profile</h1>
            <p>
              Manage your personal, medical, and emergency contact information.
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

        <section className="profile-layout">
          <div className="content-left">
            <div className="panel profile-main-card">
              <div className="profile-header-card">
                <div className="profile-photo">
                  <span className="material-symbols-outlined">person</span>
                </div>

                <div>
                  <h2>Ahmed Hashem</h2>
                  <p>Patient ID: PT-2026-001</p>

                  <div className="profile-badges">
                    <span className="tag blue-tag">Active Patient</span>
                    <span className="tag green-tag">Stable Condition</span>
                  </div>
                </div>
              </div>

              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <span className="material-symbols-outlined">mail</span>
                  <div>
                    <p>Email</p>
                    <h3>ahmed@example.com</h3>
                  </div>
                </div>

                <div className="profile-info-item">
                  <span className="material-symbols-outlined">call</span>
                  <div>
                    <p>Phone</p>
                    <h3>+970 599 000 000</h3>
                  </div>
                </div>

                <div className="profile-info-item">
                  <span className="material-symbols-outlined">location_on</span>
                  <div>
                    <p>Address</p>
                    <h3>Gaza, Palestine</h3>
                  </div>
                </div>

                <div className="profile-info-item">
                  <span className="material-symbols-outlined">cake</span>
                  <div>
                    <p>Date of Birth</p>
                    <h3>12 Jan 2002</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Personal Information</h2>
                  <p>Basic patient details used for medical follow-up.</p>
                </div>

                <button>Edit</button>
              </div>

              <div className="profile-form-grid">
                <div className="profile-field">
                  <label>Full Name</label>
                  <input value="Ahmed Hashem" readOnly />
                </div>

                <div className="profile-field">
                  <label>National ID</label>
                  <input value="ID-000-000-000" readOnly />
                </div>

                <div className="profile-field">
                  <label>Gender</label>
                  <input value="Male" readOnly />
                </div>

                <div className="profile-field">
                  <label>Blood Type</label>
                  <input value="O+" readOnly />
                </div>

                <div className="profile-field">
                  <label>City</label>
                  <input value="Gaza" readOnly />
                </div>

                <div className="profile-field">
                  <label>Preferred Language</label>
                  <input value="Arabic / English" readOnly />
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Medical History Summary</h2>
                  <p>Important medical notes for doctors and care providers.</p>
                </div>
              </div>

              <div className="medical-history-box">
                <div className="history-item">
                  <span className="material-symbols-outlined">healing</span>
                  <div>
                    <h3>Primary Injury</h3>
                    <p>
                      Lower limb injury requiring wound care and physical
                      therapy.
                    </p>
                  </div>
                </div>

                <div className="history-item">
                  <span className="material-symbols-outlined">allergy</span>
                  <div>
                    <h3>Allergies</h3>
                    <p>No known medicine allergies recorded.</p>
                  </div>
                </div>

                <div className="history-item">
                  <span className="material-symbols-outlined">medication</span>
                  <div>
                    <h3>Current Medication</h3>
                    <p>Antibiotics, pain relief, wound care cream.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-right">
            <div className="panel">
              <h2>Emergency Contact</h2>

              <div className="emergency-contact-card">
                <div className="doctor-avatar">
                  <span className="material-symbols-outlined">contacts</span>
                </div>

                <div>
                  <h3>Mohammed Hashem</h3>
                  <p>Brother</p>
                  <strong>+970 599 111 222</strong>
                </div>
              </div>

              <button className="message-btn">
                <span className="material-symbols-outlined">edit</span>
                Update Contact
              </button>
            </div>

            <div className="panel">
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

              <Link to="/patient-chat">
                <button className="message-btn">
                  <span className="material-symbols-outlined">chat</span>
                  Message Doctor
                </button>
              </Link>
            </div>

            <div className="panel">
              <h2>Account Security</h2>

              <div className="security-list">
                <div className="security-item">
                  <span className="material-symbols-outlined">lock</span>
                  <div>
                    <h3>Password</h3>
                    <p>Last changed 30 days ago.</p>
                  </div>
                </div>

                <div className="security-item">
                  <span className="material-symbols-outlined">
                    verified_user
                  </span>
                  <div>
                    <h3>Data Protection</h3>
                    <p>Your medical data is encrypted.</p>
                  </div>
                </div>
              </div>

              <button className="message-btn secondary-message-btn">
                <span className="material-symbols-outlined">settings</span>
                Security Settings
              </button>
            </div>
          </div>
        </section>
      </>
  );
}

export default PatientProfile;
