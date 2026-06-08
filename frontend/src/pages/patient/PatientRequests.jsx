import "../../styles/dashboard.css";
import PatientTopbar from "../../components/PatientTopbar";
import { useEffect, useState } from "react";
import API from "../../services/api";

function PatientRequests() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setUser(res.data.user);
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load page");
      }
    };

    fetchProfile();
  }, []);

  if (message) {
    return <div style={{ padding: "30px", color: "red" }}>{message}</div>;
  }

  if (!user) {
    return <div style={{ padding: "30px" }}>Loading...</div>;
  }
  return (
    <>
      <PatientTopbar
        title="Assistance Requests"
        subtitle={`Welcome back, ${user.name || "Patient"}. Track your medical and humanitarian requests.`}
        user={user}
      />

      <section className="stats-grid">
        <div className="stat-box blue">
          <div>
            <p>Total Requests</p>
            <h2>9</h2>
          </div>
          <span className="material-symbols-outlined">request_page</span>
        </div>

        <div className="stat-box green">
          <div>
            <p>Approved</p>
            <h2>5</h2>
          </div>
          <span className="material-symbols-outlined">check_circle</span>
        </div>

        <div className="stat-box orange">
          <div>
            <p>Under Review</p>
            <h2>3</h2>
          </div>
          <span className="material-symbols-outlined">hourglass_top</span>
        </div>

        <div className="stat-box red">
          <div>
            <p>Urgent</p>
            <h2>1</h2>
          </div>
          <span className="material-symbols-outlined">priority_high</span>
        </div>
      </section>

      <section className="requests-layout">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Submit New Request</h2>
              <p>Choose the support type and describe your need.</p>
            </div>
          </div>

          <form className="request-form">
            <div className="request-type-grid">
              <label className="request-type-card active-request-type">
                <input type="radio" name="type" defaultChecked />
                <span className="material-symbols-outlined">
                  medical_services
                </span>
                <h3>Medical Supplies</h3>
                <p>Medicine, wound care, medical tools.</p>
              </label>

              <label className="request-type-card">
                <input type="radio" name="type" />
                <span className="material-symbols-outlined">
                  directions_car
                </span>
                <h3>Transportation</h3>
                <p>Transport to hospital or clinic.</p>
              </label>

              <label className="request-type-card">
                <input type="radio" name="type" />
                <span className="material-symbols-outlined">payments</span>
                <h3>Financial Aid</h3>
                <p>Support for treatment expenses.</p>
              </label>
            </div>

            <div className="request-field">
              <label>Priority Level</label>
              <select>
                <option>Critical</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div className="request-field">
              <label>Request Description</label>
              <textarea
                rows="5"
                placeholder="Describe your need clearly..."
              ></textarea>
            </div>

            <button type="button" className="submit-request-btn">
              Submit Assistance Request
            </button>
          </form>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Request Tracking</h2>
              <p>Follow your submitted requests.</p>
            </div>

            <button>View All</button>
          </div>

          <div className="request-track-list">
            <div className="request-track-card critical">
              <div className="request-track-top">
                <div>
                  <h3>Medical Supplies</h3>
                  <p>Wound dressing and antiseptic materials.</p>
                </div>
                <span className="status pending">Under Review</span>
              </div>

              <div className="track-progress">
                <span className="done"></span>
                <span className="done"></span>
                <span></span>
                <span></span>
              </div>

              <small>Submitted: 26 May 2026 • Priority: Critical</small>
            </div>

            <div className="request-track-card approved">
              <div className="request-track-top">
                <div>
                  <h3>Transportation Support</h3>
                  <p>Transport to rehabilitation center.</p>
                </div>
                <span className="status taken">Approved</span>
              </div>

              <div className="track-progress">
                <span className="done"></span>
                <span className="done"></span>
                <span className="done"></span>
                <span className="done"></span>
              </div>

              <small>Submitted: 20 May 2026 • Priority: Medium</small>
            </div>

            <div className="request-track-card">
              <div className="request-track-top">
                <div>
                  <h3>Financial Aid</h3>
                  <p>Support for medical examination fees.</p>
                </div>
                <span className="status pending">Pending</span>
              </div>

              <div className="track-progress">
                <span className="done"></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <small>Submitted: 18 May 2026 • Priority: Low</small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PatientRequests;
