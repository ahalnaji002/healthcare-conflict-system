import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import API from "../../services/api";

function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setDoctor(res.data.user);
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load dashboard");
      }
    };

    fetchDoctorProfile();
  }, []);

  if (message) {
    return (
      <div style={{ padding: "30px", color: "red", fontWeight: "bold" }}>
        {message}
      </div>
    );
  }

  if (!doctor) {
    return <div style={{ padding: "30px" }}>Loading dashboard...</div>;
  }

  return (
    <>
      <section className="stats-grid">
        <div className="stat-box blue">
          <div>
            <p>Doctor ID</p>
            <h2>
              {doctor.doctor_id
                ? `DR-${String(doctor.doctor_id).padStart(3, "0")}`
                : "N/A"}
            </h2>
          </div>
          <span className="material-symbols-outlined">badge</span>
        </div>

        <div className="stat-box green">
          <div>
            <p>Account Status</p>
            <h2>{doctor.status || "active"}</h2>
          </div>
          <span className="material-symbols-outlined">verified_user</span>
        </div>

        <div className="stat-box orange">
          <div>
            <p>Specialty</p>
            <h2>{doctor.specialty || "Not set"}</h2>
          </div>
          <span className="material-symbols-outlined">medical_services</span>
        </div>

        <div className="stat-box red">
          <div>
            <p>License</p>
            <h2>{doctor.license_number || "N/A"}</h2>
          </div>
          <span className="material-symbols-outlined">workspace_premium</span>
        </div>
      </section>

      <section className="doctor-layout">
        <div className="content-left">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Doctor Information</h2>
                <p>Your professional account information.</p>
              </div>
            </div>

            <div className="profile-form-grid">
              <div className="profile-field">
                <label>Full Name</label>
                <input value={doctor.name || "Not provided"} readOnly />
              </div>

              <div className="profile-field">
                <label>Email</label>
                <input value={doctor.email || "Not provided"} readOnly />
              </div>

              <div className="profile-field">
                <label>Phone</label>
                <input value={doctor.phone || "Not provided"} readOnly />
              </div>

              <div className="profile-field">
                <label>Specialty</label>
                <input value={doctor.specialty || "Not provided"} readOnly />
              </div>

              <div className="profile-field">
                <label>License Number</label>
                <input
                  value={doctor.license_number || "Not provided"}
                  readOnly
                />
              </div>

              <div className="profile-field">
                <label>Clinic / Hospital</label>
                <input value={doctor.clinic_name || "Not provided"} readOnly />
              </div>

              <div className="profile-field">
                <label>Workplace</label>
                <input value={doctor.workplace || "Not provided"} readOnly />
              </div>

              <div className="profile-field">
                <label>Available Hours</label>
                <input
                  value={doctor.available_hours || "Not provided"}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="panel" id="patients">
            <div className="panel-header">
              <div>
                <h2>Assigned Patients</h2>
                <p>Assigned patient cases will appear here.</p>
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
                  <div className="patient-avatar">-</div>
                  <div>
                    <h3>No assigned patients yet</h3>
                    <p>Patients will appear after assignment.</p>
                  </div>
                </div>

                <span>Not available</span>
                <span className="priority-badge low">None</span>
                <span className="status pending">Waiting</span>
                <button className="mini-btn">Open</button>
              </div>
            </div>
          </div>

          <div className="panel" id="treatment">
            <div className="panel-header">
              <div>
                <h2>Treatment Plan Updates</h2>
                <p>Recent treatment plan changes will appear here.</p>
              </div>
            </div>

            <div className="doctor-update-list">
              <div className="doctor-update-item">
                <span className="material-symbols-outlined">edit_note</span>
                <div>
                  <h3>No recent updates</h3>
                  <p>Treatment updates will appear after patient follow-up.</p>
                  <small>Waiting for activity</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-right">
          <div className="panel progress-panel">
            <h2>Case Overview</h2>

            <div className="progress-circle">
              <span>--</span>
            </div>

            <p>
              Case progress will be calculated once patients are assigned to
              your account.
            </p>
          </div>

          <div className="panel">
            <h2>Critical Alerts</h2>

            <div className="alert-card">
              <span className="material-symbols-outlined">notifications</span>
              <div>
                <h3>No critical alerts</h3>
                <p>Urgent patient alerts will appear here.</p>
              </div>
            </div>
          </div>

          <div className="panel">
            <h2>Today’s Schedule</h2>

            <div className="appointment-card">
              <div className="appointment-date">
                <strong>--</strong>
                <span>---</span>
              </div>

              <div>
                <h3>No appointments scheduled</h3>
                <p>Your appointments will appear here.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DoctorDashboard;
