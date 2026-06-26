import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import "../../styles/emergencyAlert.css";
import "../../styles/auth.css";
import API from "../../services/api";

function EmergencyAlert() {
  const navigate = useNavigate();

  const [mobileNumber, setMobileNumber] = useState("");
  const [description, setDescription] = useState("");
  const [manualLocation, setManualLocation] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    };

    fetchProfile();
  }, []);

  const handleShareLocation = () => {
    setMessage("");

    if (!navigator.geolocation) {
      setMessage("Geolocation is not supported by this browser.");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });

        setIsLocating(false);
        setMessage("Location captured successfully.");
      },
      () => {
        setIsLocating(false);
        setMessage("Unable to access location. Please enter it manually.");
      },
    );
  };

  console.log("Current user:", user);
  const handleSendAlert = async () => {
    setMessage("");

    if (!mobileNumber.trim()) {
      setMessage("Please enter your mobile number.");
      return;
    }

    if (!description.trim()) {
      setMessage("Please describe the emergency case briefly.");
      return;
    }

    try {
      setIsSending(true);

      const payload = {
        patient_id: user?.patient_id || null,
        mobile_number: mobileNumber,
        description,
      };

      if (coordinates) {
        payload.lat = coordinates.lat;
        payload.long = coordinates.long;
      }

      if (manualLocation.trim()) {
        payload.manual_location = manualLocation;
      }

      await API.post("/emergency/panic", payload);

      setMessage("Emergency alert sent successfully.");

      setTimeout(() => {
        if (user?.role === "patient") {
          navigate("/patient-dashboard");
        } else if (user?.role === "doctor") {
          navigate("/doctor-dashboard");
        } else {
          navigate("/");
        }
      }, 1200);
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          err.response?.data?.detailed_error ||
          "Failed to send emergency alert.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="emergency-page">
      <main className="emergency-content">
        <header className="emergency-topbar">
          <div className="topbar-actions">
            <nav className="auth-nav">
              <button
                type="button"
                className="back-btn"
                onClick={() => navigate(-1)}
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back
              </button>

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

            {message && (
              <div
                style={{
                  marginBottom: "18px",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  background: message.includes("successfully")
                    ? "#e8f7ef"
                    : "#fff3f3",
                  color: message.includes("successfully")
                    ? "#166534"
                    : "#b91c1c",
                  fontWeight: "700",
                }}
              >
                {message}
              </div>
            )}

            <div className="emergency-form">
              <div className="location-section">
                <div>
                  <label>Share Location</label>

                  <div className="map-placeholder">
                    <div className="location-pin">
                      <span className="material-symbols-outlined">
                        location_on
                      </span>

                      {coordinates ? (
                        <p>
                          Location captured: {coordinates.lat.toFixed(4)},{" "}
                          {coordinates.long.toFixed(4)}
                        </p>
                      ) : (
                        <p>
                          {isLocating
                            ? "Pinpointing location..."
                            : "Location not shared yet"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="location-actions">
                  <button
                    type="button"
                    className="share-location-btn"
                    onClick={handleShareLocation}
                    disabled={isLocating}
                  >
                    <span className="material-symbols-outlined">
                      my_location
                    </span>
                    {isLocating
                      ? "Getting Location..."
                      : "Share Current Location"}
                  </button>

                  <label>Or enter manually:</label>
                  <input
                    type="text"
                    placeholder="e.g. Building 4, Floor 2, Room 204"
                    value={manualLocation}
                    onChange={(e) => setManualLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Mobile Number</label>
                <div className="input-with-icon">
                  <span className="material-symbols-outlined">call</span>
                  <input
                    type="text"
                    placeholder="+970599000000"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Short Description of the Case</label>
                <textarea
                  placeholder="Describe the emergency briefly"
                  maxLength="250"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <small>Limit to 250 characters for immediate review.</small>
              </div>

              <div className="emergency-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="send-alert-btn"
                  onClick={handleSendAlert}
                  disabled={isSending}
                >
                  <span className="material-symbols-outlined">send</span>
                  {isSending ? "Sending..." : "Send Emergency Alert"}
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
