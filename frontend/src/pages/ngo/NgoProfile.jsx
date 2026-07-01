import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import API from "../../services/api";

function NgoProfile() {
  const [ngo, setNgo] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchNgoProfile = async () => {
      try {
        const res = await API.get("/requests/ngo/profile");
        setNgo(res.data);
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load NGO profile");
      }
    };

    fetchNgoProfile();
  }, []);

  if (message) {
    return <p className="error-message">{message}</p>;
  }

  if (!ngo) {
    return <p style={{ padding: "30px" }}>Loading NGO profile...</p>;
  }

  return (
    <>
      <section className="profile-layout">
        <div className="content-left">
          <div className="panel profile-main-card">
            <div className="profile-header-card ngo-profile-header">
              <div className="profile-photo">
                <span className="material-symbols-outlined">business</span>
              </div>

              <div>
                <h2>{ngo.organization_name || "NGO Organization"}</h2>
                <p>{ngo.organization_type || "Humanitarian Support"}</p>

                <div className="profile-badges">
                  <span className="tag blue-tag">Verified NGO</span>
                  <span className="tag green-tag">Active Partner</span>
                </div>
              </div>
            </div>

            <div className="profile-info-grid">
              <div className="profile-info-item">
                <span className="material-symbols-outlined">badge</span>
                <div>
                  <p>NGO ID</p>
                  <h3>
                    {ngo.ngo_id
                      ? `NGO-${String(ngo.ngo_id).padStart(3, "0")}`
                      : "N/A"}
                  </h3>
                </div>
              </div>

              <div className="profile-info-item">
                <span className="material-symbols-outlined">location_on</span>
                <div>
                  <p>Service Area</p>
                  <h3>{ngo.service_area || "Not provided"}</h3>
                </div>
              </div>

              <div className="profile-info-item">
                <span className="material-symbols-outlined">support_agent</span>
                <div>
                  <p>Organization Type</p>
                  <h3>{ngo.organization_type || "Not provided"}</h3>
                </div>
              </div>

              <div className="profile-info-item">
                <span className="material-symbols-outlined">
                  volunteer_activism
                </span>
                <div>
                  <p>Support Categories</p>
                  <h3>{ngo.support_categories || "Not provided"}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Organization Information</h2>
                <p>Official NGO details used for coordination.</p>
              </div>
            </div>

            <div className="profile-form-grid">
              <div className="profile-field">
                <label>Organization Name</label>
                <input
                  value={ngo.organization_name || "Not provided"}
                  readOnly
                />
              </div>

              <div className="profile-field">
                <label>Organization Type</label>
                <input
                  value={ngo.organization_type || "Not provided"}
                  readOnly
                />
              </div>

              <div className="profile-field">
                <label>Service Area</label>
                <input value={ngo.service_area || "Not provided"} readOnly />
              </div>

              <div className="profile-field">
                <label>Support Categories</label>
                <input
                  value={ngo.support_categories || "Not provided"}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        <div className="content-right">
          <div className="panel">
            <h2>Verification Status</h2>

            <div className="security-list">
              <div className="security-item">
                <span className="material-symbols-outlined">verified</span>
                <div>
                  <h3>Admin Approved</h3>
                  <p>NGO account verified by system administrator.</p>
                </div>
              </div>

              <div className="security-item">
                <span className="material-symbols-outlined">shield_lock</span>
                <div>
                  <h3>Data Access</h3>
                  <p>Access limited to assigned assistance requests.</p>
                </div>
              </div>

              <div className="security-item">
                <span className="material-symbols-outlined">task_alt</span>
                <div>
                  <h3>Organization Status</h3>
                  <p>Safe</p>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <h2>Quick Actions</h2>

            <div className="doctor-actions-grid">
              <Link to="/ngo-dashboard">
                <button className="message-btn">
                  <span className="material-symbols-outlined">dashboard</span>
                  Dashboard
                </button>
              </Link>

              <Link to="/ngo-triage">
                <button className="message-btn secondary-message-btn">
                  <span className="material-symbols-outlined">history</span>
                  Request History
                </button>
              </Link>

              <Link to="/ngo-reports">
                <button className="message-btn secondary-message-btn">
                  <span className="material-symbols-outlined">analytics</span>
                  View Reports
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NgoProfile;
