import { Link } from "react-router-dom";
import "../styles/emergencyAlert.css";
import "../styles/auth.css";
import "../../styles/dashboard.css";

function EmergencyAlert() {
  return (
    <div className="emergency-page">
      <main className="emergency-content">
        <header className="emergency-topbar">
          <div className="topbar-actions">
            <nav className="auth-nav">
              <Link to="/">Home</Link>
            </nav>
          </div>
        </header>

        <section className="emergency-wrapper">
          <div className="emergency-card">
            <div className="emergency-card-header">
              <div className="warning-icon">
                <span className="material-symbols-outlined">warning</span>
              </div>

              <div>
                <h1>Emergency Alert</h1>
                <p>
                  Send an urgent alert to request immediate medical attention.
                </p>
              </div>
            </div>

            <div className="emergency-note">
              <span className="material-symbols-outlined">info</span>
              The alert will be sent immediately to the medical team.
            </div>

            <div className="emergency-form">
              <div className="location-section">
                <div>
                  <label>Share Location</label>

                  <div className="map-placeholder">
                    <div className="location-pin">
                      <span className="material-symbols-outlined">
                        location_on
                      </span>
                      <p>Pinpointing location...</p>
                    </div>
                  </div>
                </div>

                <div className="location-actions">
                  <button type="button" className="share-location-btn">
                    <span className="material-symbols-outlined">
                      my_location
                    </span>
                    Share Current Location
                  </button>

                  <label>Or enter manually:</label>
                  <input
                    type="text"
                    placeholder="e.g. Building 4, Floor 2, Room 204"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Mobile Number</label>
                <div className="input-with-icon">
                  <span className="material-symbols-outlined">call</span>
                  <input type="text" placeholder="+1 (555) 012-3456" />
                </div>
              </div>

              <div className="form-group">
                <label>Short Description of the Case</label>
                <textarea placeholder="Describe the emergency briefly"></textarea>
                <small>Limit to 250 characters for immediate review.</small>
              </div>

              <div className="emergency-buttons">
                <Link to="/patient-dashboard" className="cancel-btn">
                  Cancel
                </Link>

                <button type="button" className="send-alert-btn">
                  <span className="material-symbols-outlined">send</span>
                  Send Emergency Alert
                </button>
              </div>
            </div>

            <div className="emergency-footer-note">
              <span className="material-symbols-outlined">contact_support</span>
              <p>
                In case of system failure, please contact our 24/7 hotline
                directly at <strong>+1 (800) WAR-CARE</strong>.
              </p>
            </div>
          </div>

          <div className="info-cards">
            <div className="info-card">
              <span className="material-symbols-outlined">speed</span>
              <h3>Quick Response</h3>
              <p>Average response time is under 4 minutes.</p>
            </div>

            <div className="info-card">
              <span className="material-symbols-outlined">shield</span>
              <h3>Secure & Private</h3>
              <p>Your location and data are encrypted end-to-end.</p>
            </div>

            <div className="info-card">
              <span className="material-symbols-outlined">
                medical_services
              </span>
              <h3>Care Team Informed</h3>
              <p>Your medical history is shared with responders.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default EmergencyAlert;
