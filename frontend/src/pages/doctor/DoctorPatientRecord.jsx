import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import API from "../../services/api";

function DoctorPatientRecord() {
  const { patientId } = useParams();

  const [patient, setPatient] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPatientRecord = async () => {
      try {
        if (!patientId) {
          setMessage("Patient ID is missing.");
          return;
        }

        const patientRes = await API.get(`/auth/doctor-patients/${patientId}`);
        setPatient(patientRes.data.patient);
      } catch (err) {
        setMessage(
          err.response?.data?.message || "Failed to load patient record",
        );
      }
    };

    fetchPatientRecord();
  }, [patientId]);

  if (message) {
    return (
      <div style={{ padding: "30px", color: "red", fontWeight: "bold" }}>
        {message}
      </div>
    );
  }

  if (!patient) {
    return <div style={{ padding: "30px" }}>Loading patient record...</div>;
  }

  const patientCode = `PT-${String(patient.patient_id).padStart(3, "0")}`;

  const birthDate = patient.date_of_birth
    ? new Date(patient.date_of_birth).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not provided";

  const firstLetter = patient.full_name
    ? patient.full_name.charAt(0).toUpperCase()
    : "P";

  return (
    <>
      <section className="record-layout">
        <div className="content-left">
          <div className="panel record-profile-card">
            <div className="record-profile-header">
              <div className="patient-avatar large-avatar">{firstLetter}</div>

              <div>
                <h2>{patient.full_name || "Unknown Patient"}</h2>

                <p>
                  Patient ID: {patientCode} • {patient.address || "No location"}
                </p>

                <div className="profile-badges">
                  <span className="priority-badge medium">Medium Priority</span>

                  <span className="tag blue-tag">
                    {patient.medical_condition || "No condition recorded"}
                  </span>

                  <span className="tag green-tag">
                    {patient.status || "active"}
                  </span>
                </div>
              </div>
            </div>

            <div className="record-info-grid">
              <div className="record-info-item">
                <p>Date of Birth</p>
                <h3>{birthDate}</h3>
              </div>

              <div className="record-info-item">
                <p>Blood Type</p>
                <h3>{patient.blood_type || "Not provided"}</h3>
              </div>

              <div className="record-info-item">
                <p>Emergency Contact</p>
                <h3>{patient.emergency_contact || "Not provided"}</h3>
              </div>

              <div className="record-info-item">
                <p>Phone</p>
                <h3>{patient.phone || "Not provided"}</h3>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Patient Personal Information</h2>
                <p>Basic patient data from the medical system.</p>
              </div>

              <button>Edit Record</button>
            </div>

            <div className="profile-form-grid">
              <div className="profile-field">
                <label>Full Name</label>
                <input value={patient.full_name || "Not provided"} readOnly />
              </div>

              <div className="profile-field">
                <label>Email</label>
                <input value={patient.email || "Not provided"} readOnly />
              </div>

              <div className="profile-field">
                <label>National ID</label>
                <input value={patient.national_id || "Not provided"} readOnly />
              </div>

              <div className="profile-field">
                <label>Gender</label>
                <input value={patient.gender || "Not provided"} readOnly />
              </div>

              <div className="profile-field">
                <label>Address</label>
                <input value={patient.address || "Not provided"} readOnly />
              </div>

              <div className="profile-field">
                <label>Status</label>
                <input value={patient.status || "active"} readOnly />
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Medical Condition Summary</h2>
                <p>Main diagnosis and current medical condition.</p>
              </div>
            </div>

            <div className="record-summary-box">
              <div className="summary-icon">
                <span className="material-symbols-outlined">healing</span>
              </div>

              <div>
                <h3>
                  {patient.medical_condition || "No medical condition recorded"}
                </h3>

                <p>
                  Chronic diseases:{" "}
                  {patient.chronic_diseases || "No chronic diseases recorded."}
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
              <div className="timeline-item active-step">
                <div className="timeline-dot">
                  <span className="material-symbols-outlined">assignment</span>
                </div>

                <div className="timeline-content">
                  <h3>Patient Assigned to Doctor</h3>
                  <p>
                    This patient is assigned to your medical follow-up list.
                  </p>
                  <span>Current assignment</span>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot">
                  <span className="material-symbols-outlined">
                    clinical_notes
                  </span>
                </div>

                <div className="timeline-content">
                  <h3>Future Medical Updates</h3>
                  <p>Treatment updates will appear here after doctor review.</p>
                  <span>Waiting for updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-right">
          <div className="panel progress-panel">
            <h2>Recovery Progress</h2>

            <div className="progress-circle">
              <span>--</span>
            </div>

            <p>
              Recovery progress will be updated after treatment plans and
              follow-up records are added.
            </p>
          </div>

          <div className="panel">
            <h2>Current Medication</h2>

            <div className="record-med-list">
              <div className="record-med-item">
                <span className="material-symbols-outlined">medication</span>

                <div>
                  <h3>No medication data yet</h3>
                  <p>Medication records will appear here later.</p>
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

            <div className="alert-card">
              <span className="material-symbols-outlined">notifications</span>

              <div>
                <h3>No active alerts</h3>
                <p>Patient alerts will appear here.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DoctorPatientRecord;
