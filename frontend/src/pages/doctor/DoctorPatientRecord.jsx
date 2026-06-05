import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

function DoctorPatientRecord() {
  return (
    <div className="dashboard-page">
      

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <h1>Patient Medical Record</h1>
            <p>
              Review patient history, injury details, medication, and progress
              notes.
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

        <section className="record-layout">
          <div className="content-left">
            <div className="panel record-profile-card">
              <div className="record-profile-header">
                <div className="patient-avatar large-avatar">A</div>

                <div>
                  <h2>Ahmed Hashem</h2>
                  <p>Patient ID: PT-2026-001 • Gaza, Palestine</p>

                  <div className="profile-badges">
                    <span className="priority-badge critical">
                      Critical Priority
                    </span>
                    <span className="tag blue-tag">Lower Limb Injury</span>
                    <span className="tag green-tag">Stable</span>
                  </div>
                </div>
              </div>

              <div className="record-info-grid">
                <div className="record-info-item">
                  <p>Age</p>
                  <h3>24 years</h3>
                </div>

                <div className="record-info-item">
                  <p>Blood Type</p>
                  <h3>O+</h3>
                </div>

                <div className="record-info-item">
                  <p>Emergency Contact</p>
                  <h3>+970 599 111 222</h3>
                </div>

                <div className="record-info-item">
                  <p>Last Update</p>
                  <h3>Today, 11:30 AM</h3>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Injury Summary</h2>
                  <p>Main diagnosis and current medical condition.</p>
                </div>

                <button>Edit Record</button>
              </div>

              <div className="record-summary-box">
                <div className="summary-icon">
                  <span className="material-symbols-outlined">healing</span>
                </div>

                <div>
                  <h3>Lower Limb Injury with Wound Care Follow-up</h3>
                  <p>
                    Patient has a lower limb injury requiring wound cleaning,
                    antibiotic medication, pain control, and physical therapy
                    preparation. No active infection signs were recorded in the
                    latest review.
                  </p>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Medical Timeline</h2>
                  <p>Important updates and follow-up history.</p>
                </div>
              </div>

              <div className="treatment-timeline">
                <div className="timeline-item done">
                  <div className="timeline-dot">
                    <span className="material-symbols-outlined">check</span>
                  </div>

                  <div className="timeline-content">
                    <h3>Initial Assessment</h3>
                    <p>
                      Patient injury was reviewed and treatment plan created.
                    </p>
                    <span>20 May 2026</span>
                  </div>
                </div>

                <div className="timeline-item done">
                  <div className="timeline-dot">
                    <span className="material-symbols-outlined">
                      medication
                    </span>
                  </div>

                  <div className="timeline-content">
                    <h3>Medication Started</h3>
                    <p>
                      Antibiotic and pain relief medication schedule started.
                    </p>
                    <span>22 May 2026</span>
                  </div>
                </div>

                <div className="timeline-item active-step">
                  <div className="timeline-dot">
                    <span className="material-symbols-outlined">
                      photo_camera
                    </span>
                  </div>

                  <div className="timeline-content">
                    <h3>New Wound Photo Uploaded</h3>
                    <p>Patient uploaded a new wound image for review.</p>
                    <span>Today • 11:30 AM</span>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot">
                    <span className="material-symbols-outlined">
                      directions_walk
                    </span>
                  </div>

                  <div className="timeline-content">
                    <h3>Physical Therapy Stage</h3>
                    <p>Therapy will start after next review appointment.</p>
                    <span>Upcoming • 02 Jun 2026</span>
                  </div>
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
                Patient condition is improving, but still requires close
                follow-up and wound monitoring.
              </p>
            </div>

            <div className="panel">
              <h2>Current Medication</h2>

              <div className="record-med-list">
                <div className="record-med-item">
                  <span className="material-symbols-outlined">medication</span>
                  <div>
                    <h3>Amoxicillin 500mg</h3>
                    <p>After breakfast • 7 days</p>
                  </div>
                </div>

                <div className="record-med-item">
                  <span className="material-symbols-outlined">pill</span>
                  <div>
                    <h3>Pain Relief Tablet</h3>
                    <p>After lunch • As needed</p>
                  </div>
                </div>

                <div className="record-med-item">
                  <span className="material-symbols-outlined">healing</span>
                  <div>
                    <h3>Wound Cream</h3>
                    <p>Before sleep • Daily</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>Doctor Actions</h2>

              <div className="doctor-actions-grid">
                <Link to="/doctor-update-treatment">
                  <button className="message-btn">
                    <span className="material-symbols-outlined">edit_note</span>
                    Update Plan
                  </button>
                </Link>

                <Link to="/doctor-chat">
                  <button className="message-btn secondary-message-btn">
                    <span className="material-symbols-outlined">chat</span>
                    Message Patient
                  </button>
                </Link>

                <button className="message-btn secondary-message-btn">
                  <span className="material-symbols-outlined">download</span>
                  Export Record
                </button>
              </div>
            </div>

            <div className="panel">
              <h2>Latest Alert</h2>

              <div className="alert-card critical-alert">
                <span className="material-symbols-outlined">warning</span>
                <div>
                  <h3>Increased Pain Level</h3>
                  <p>Patient reported higher pain during movement.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DoctorPatientRecord;
