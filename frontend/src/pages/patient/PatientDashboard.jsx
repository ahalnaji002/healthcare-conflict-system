import { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import API from "../../services/api";
import PatientTopbar from "../../components/PatientTopbar";

function PatientDashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setUser(res.data.user);
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load dashboard");
      }
    };

    fetchProfile();
  }, []);

  if (message) {
    return (
      <div style={{ padding: "30px", color: "red", fontWeight: "bold" }}>
        {message}
      </div>
    );
  }

  if (!user) {
    return <div style={{ padding: "30px" }}>Loading dashboard...</div>;
  }

  return (
    <>
      <PatientTopbar
        title="Patient Dashboard"
        subtitle={`Welcome back, ${user.name || "Patient"}. Here is your medical follow-up summary.`}
        user={user}
      />

      <section className="stats-grid">
        <div className="stat-box blue">
          <div>
            <p>Patient ID</p>
            <h2>
              {user.patient_id
                ? `PT-${String(user.patient_id).padStart(3, "0")}`
                : "N/A"}
            </h2>
          </div>
          <span className="material-symbols-outlined">badge</span>
        </div>

        <div className="stat-box green">
          <div>
            <p>Account Status</p>
            <h2>{user.status || "active"}</h2>
          </div>
          <span className="material-symbols-outlined">verified_user</span>
        </div>

        <div className="stat-box orange">
          <div>
            <p>Medical Condition</p>
            <h2>{user.medical_condition ? "Recorded" : "None"}</h2>
          </div>
          <span className="material-symbols-outlined">clinical_notes</span>
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
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Patient Summary</h2>
                <p>Your current personal and medical information.</p>
              </div>
            </div>

            <div className="profile-form-grid">
              <div className="profile-field">
                <label>Full Name</label>
                <input value={user.name || "Not provided"} readOnly />
              </div>

              <div className="profile-field">
                <label>Email</label>
                <input value={user.email || "Not provided"} readOnly />
              </div>

              <div className="profile-field">
                <label>Phone</label>
                <input value={user.phone || "Not provided"} readOnly />
              </div>

              <div className="profile-field">
                <label>Address</label>
                <input value={user.address || "Not provided"} readOnly />
              </div>

              <div className="profile-field">
                <label>Gender</label>
                <input value={user.gender || "Not provided"} readOnly />
              </div>

              <div className="profile-field">
                <label>Blood Type</label>
                <input value={user.blood_type || "Not provided"} readOnly />
              </div>
            </div>
          </div>

          <div className="panel" id="medications">
            <div className="panel-header">
              <div>
                <h2>Medical History Summary</h2>
                <p>Important notes for doctors and care providers.</p>
              </div>
            </div>

            <div className="medicine-list">
              <div className="medicine-item">
                <div className="medicine-icon blue-icon">
                  <span className="material-symbols-outlined">healing</span>
                </div>
                <div>
                  <h3>Primary Medical Condition</h3>
                  <p>
                    {user.medical_condition || "No medical condition recorded."}
                  </p>
                </div>
                <span className="status taken">Active</span>
              </div>

              <div className="medicine-item">
                <div className="medicine-icon orange-icon">
                  <span className="material-symbols-outlined">
                    monitor_heart
                  </span>
                </div>
                <div>
                  <h3>Chronic Diseases</h3>
                  <p>
                    {user.chronic_diseases || "No chronic diseases recorded."}
                  </p>
                </div>
                <span className="status pending">Info</span>
              </div>

              <div className="medicine-item">
                <div className="medicine-icon green-icon">
                  <span className="material-symbols-outlined">contacts</span>
                </div>
                <div>
                  <h3>Emergency Contact</h3>
                  <p>{user.emergency_contact || "Not provided"}</p>
                </div>
                <span className="status pending">Contact</span>
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
                <strong>--</strong>
                <span>---</span>
              </div>

              <div>
                <h3>No upcoming appointments</h3>
                <p>Your appointments will appear here once scheduled.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="content-right">
          <div className="panel progress-panel" id="progress">
            <h2>Health Progress</h2>

            <div className="progress-circle">
              <span>--</span>
            </div>

            <p>
              Your health progress will be updated by your assigned doctor after
              each follow-up.
            </p>
          </div>

          <div className="panel" id="requests">
            <div className="panel-header simple">
              <h2>Assistance Requests</h2>
            </div>

            <div className="request-item">
              <span className="request-dot normal"></span>
              <div>
                <h3>No active requests</h3>
                <p>Your assistance requests will appear here.</p>
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
                <h3>Not assigned yet</h3>
                <p>Doctor information will appear here.</p>
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
