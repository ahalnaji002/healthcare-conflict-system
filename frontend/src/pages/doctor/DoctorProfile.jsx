import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import API from "../../services/api";
import DoctorTopbar from "../../components/DoctorTopbar";

function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setDoctor(res.data.user);
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load profile");
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
    return <div style={{ padding: "30px" }}>Loading profile...</div>;
  }

  return (
    <>
      <DoctorTopbar
        title="Doctor Profile"
        subtitle={`Welcome back, Dr. ${
          doctor.name || "Doctor"
        }. Manage professional information, availability, and account settings.`}
        doctor={doctor}
      />

      <section className="profile-layout">
        <div className="content-left">
          <div className="panel profile-main-card">
            <div className="profile-header-card doctor-profile-header">
              <div className="profile-photo">
                <span className="material-symbols-outlined">stethoscope</span>
              </div>

              <div>
                <h2>Dr. {doctor.name || "Doctor"}</h2>
                <p>
                  {doctor.specialty || "Specialty not provided"} • License:{" "}
                  {doctor.license_number || "Not provided"}
                </p>

                <div className="profile-badges">
                  <span className="tag blue-tag">
                    {doctor.is_verified ? "Verified Doctor" : "Not Verified"}
                  </span>
                  <span className="tag green-tag">
                    {doctor.status || "active"}
                  </span>
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
                  <h3>{doctor.specialty || "Not provided"}</h3>
                </div>
              </div>

              <div className="profile-info-item">
                <span className="material-symbols-outlined">business</span>
                <div>
                  <p>Workplace</p>
                  <h3>{doctor.workplace || "Not provided"}</h3>
                </div>
              </div>

              <div className="profile-info-item">
                <span className="material-symbols-outlined">
                  local_hospital
                </span>
                <div>
                  <p>Clinic / Hospital</p>
                  <h3>{doctor.clinic_name || "Not provided"}</h3>
                </div>
              </div>

              <div className="profile-info-item">
                <span className="material-symbols-outlined">schedule</span>
                <div>
                  <p>Available Hours</p>
                  <h3>{doctor.available_hours || "Not provided"}</h3>
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
                <input value={`Dr. ${doctor.name || "Doctor"}`} readOnly />
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
                <label>Medical License</label>
                <input
                  value={doctor.license_number || "Not provided"}
                  readOnly
                />
              </div>

              <div className="profile-field">
                <label>Specialization</label>
                <input value={doctor.specialty || "Not provided"} readOnly />
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
                <h3>Current Availability</h3>
                <p>
                  {doctor.available_hours || "No available hours provided."}
                </p>
              </div>

              <div className="availability-card">
                <h3>Clinic</h3>
                <p>{doctor.clinic_name || "Not provided"}</p>
              </div>

              <div className="availability-card">
                <h3>Workplace</h3>
                <p>{doctor.workplace || "Not provided"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="content-right">
          <div className="panel progress-panel">
            <h2>Performance Summary</h2>

            <div className="progress-circle">
              <span>--</span>
            </div>

            <p>
              Performance data will appear after patients are assigned and
              follow-up records are added.
            </p>
          </div>

          <div className="panel">
            <h2>Account Status</h2>

            <div className="security-list">
              <div className="security-item">
                <span className="material-symbols-outlined">verified</span>
                <div>
                  <h3>Verification</h3>
                  <p>
                    {doctor.is_verified
                      ? "Approved by system admin."
                      : "Account is not verified yet."}
                  </p>
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
                  <p>Protected account password.</p>
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
    </>
  );
}

export default DoctorProfile;
