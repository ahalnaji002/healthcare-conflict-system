import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import API from "../../services/api";
import PatientTopbar from "../../components/PatientTopbar";

function PatientProfile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setUser(res.data.user);
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load profile");
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
    return <div style={{ padding: "30px" }}>Loading profile...</div>;
  }

  const formattedDate = user.date_of_birth
    ? new Date(user.date_of_birth).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not provided";

  return (
    <>
      <PatientTopbar
        title="Patient Profile"
        subtitle="Manage your personal, medical, and emergency contact information."
        user={user}
      />

      <section className="profile-layout">
        <div className="content-left">
          <div className="panel profile-main-card">
            <div className="profile-header-card">
              <div className="profile-photo">
                <span className="material-symbols-outlined">person</span>
              </div>

              <div>
                <h2>{user.name || "Patient"}</h2>
                <p>
                  Patient ID:{" "}
                  {user.patient_id
                    ? `PT-2026-${String(user.patient_id).padStart(3, "0")}`
                    : "Not provided"}
                </p>

                <div className="profile-badges">
                  <span className="tag blue-tag">Active Patient</span>
                  <span className="tag green-tag">
                    {user.status || "active"}
                  </span>
                </div>
              </div>
            </div>

            <div className="profile-info-grid">
              <div className="profile-info-item">
                <span className="material-symbols-outlined">mail</span>
                <div>
                  <p>Email</p>
                  <h3>{user.email || "Not provided"}</h3>
                </div>
              </div>

              <div className="profile-info-item">
                <span className="material-symbols-outlined">call</span>
                <div>
                  <p>Phone</p>
                  <h3>{user.phone || "Not provided"}</h3>
                </div>
              </div>

              <div className="profile-info-item">
                <span className="material-symbols-outlined">location_on</span>
                <div>
                  <p>Address</p>
                  <h3>{user.address || "Not provided"}</h3>
                </div>
              </div>

              <div className="profile-info-item">
                <span className="material-symbols-outlined">cake</span>
                <div>
                  <p>Date of Birth</p>
                  <h3>{formattedDate}</h3>
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
                <input value={user.name || ""} readOnly />
              </div>

              <div className="profile-field">
                <label>National ID</label>
                <input value={user.national_id || "Not provided"} readOnly />
              </div>

              <div className="profile-field">
                <label>Gender</label>
                <input value={user.gender || "Not provided"} readOnly />
              </div>

              <div className="profile-field">
                <label>Blood Type</label>
                <input value={user.blood_type || "Not provided"} readOnly />
              </div>

              <div className="profile-field">
                <label>City</label>
                <input value={user.city || "Not provided"} readOnly />
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
                    {user.medical_condition || "No medical condition recorded."}
                  </p>
                </div>
              </div>

              <div className="history-item">
                <span className="material-symbols-outlined">allergy</span>
                <div>
                  <h3>Chronic Diseases</h3>
                  <p>
                    {user.chronic_diseases || "No chronic diseases recorded."}
                  </p>
                </div>
              </div>

              <div className="history-item">
                <span className="material-symbols-outlined">medication</span>
                <div>
                  <h3>Emergency Contact</h3>
                  <p>{user.emergency_contact || "Not provided"}</p>
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
                <h3>{user.emergency_contact || "Not provided"}</h3>
                <p>Emergency Contact</p>
                <strong>{user.phone || "Not provided"}</strong>
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
                <h3>Not assigned yet</h3>
                <p>Doctor information will appear here.</p>
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
                  <p>Protected account password.</p>
                </div>
              </div>

              <div className="security-item">
                <span className="material-symbols-outlined">verified_user</span>
                <div>
                  <h3>Account Verification</h3>
                  <p>
                    {user.is_verified
                      ? "Your account is verified."
                      : "Your account is not verified."}
                  </p>
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
