import { Link } from "react-router-dom";
import { useState } from "react";
import "../../styles/dashboard.css";
import API from "../../services/api";
import API from "../../services/api";

function JoinRequest() {
  const [role, setRole] = useState("doctor");
  const [message, setMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target.password.value !== e.target.confirmPassword.value) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await API.post("/auth/register-staff", {
        name: e.target.fullName.value,
        email: e.target.email.value,
        password: e.target.password.value,
        role: role,
        phone: e.target.phone.value,
        address: e.target.address.value,
        license: role === "doctor" ? e.target.license.value : null,
        hospital: role === "doctor" ? e.target.organization.value : null,
        specialization:
          role === "doctor" ? e.target.specialization.value : null,
        experience: role === "doctor" ? e.target.experience.value : null,
        ngo_name: role === "ngo" ? e.target.organization.value : null,
        ngo_field: role === "ngo" ? e.target.specialization.value : null,
        registration_number: role === "ngo" ? e.target.license.value : null,
        services_description: role === "ngo" ? e.target.experience.value : null,
      });

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="form-page">
      <header className="form-header">
        <Link to="/" className="form-logo">
          War Injuries Care
        </Link>

        <nav className="form-nav">
          <Link to="/">Home</Link>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <Link to="/join-request" className="active-link">
            Join Us
          </Link>
        </nav>

        <div className="form-header-actions">
          <Link to="/login">Login</Link>
          <button type="button" className="emergency-btn">
            Emergency Help
          </button>
        </div>
      </header>

      <main className="register-main">
        <div className="register-layout">
          <aside className="register-info">
            <div className="info-primary-card">
              <h1>Join as a Medical or Humanitarian Partner</h1>
              <p>
                Submit a professional join request to support patients,
                coordinate care, and manage humanitarian assistance.
              </p>
            </div>

            <div className="info-small-card">
              <div className="info-card-title">
                <span className="material-symbols-outlined">verified</span>
                <h3>Admin Approval Required</h3>
              </div>
              <p>
                Doctor and NGO accounts are reviewed by the system admin before
                activation to protect patient privacy and system security.
              </p>
            </div>

            <div className="info-small-card">
              <div className="info-card-title">
                <span className="material-symbols-outlined">
                  health_and_safety
                </span>
                <h3>Trusted Care Network</h3>
              </div>
              <p>
                Approved doctors can manage patient treatment plans, while NGOs
                can review assistance requests and coordinate support.
              </p>
            </div>

            <div className="image-card">
              <div className="image-overlay">
                <p>
                  "Together, doctors and humanitarian organizations can make
                  follow-up care more reachable."
                </p>
              </div>
            </div>
          </aside>

          <section className="register-card">
            <h2>Doctor / NGO Join Request</h2>

            <div className="join-role-toggle">
              <button
                type="button"
                className={role === "doctor" ? "join-role active" : "join-role"}
                onClick={() => setRole("doctor")}
              >
                <span className="material-symbols-outlined">
                  medical_services
                </span>
                Doctor
              </button>

              <button
                type="button"
                className={role === "ngo" ? "join-role active" : "join-role"}
                onClick={() => setRole("ngo")}
              >
                <span className="material-symbols-outlined">
                  volunteer_activism
                </span>
                NGO
              </button>
            </div>

            <form onSubmit={handleSubmit} className="patient-form">
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="fullName">
                    {role === "doctor"
                      ? "Doctor Full Name"
                      : "Contact Person Name"}
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder={
                      role === "doctor"
                        ? "Enter doctor's legal name"
                        : "Enter responsible contact name"
                    }
                  />
                </div>

                <div className="field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                  />
                </div>

                <div className="field">
                  <label htmlFor="phone">Phone Number</label>
                  <input id="phone" type="tel" placeholder="+970 000 000 000" />
                </div>

                <div className="field">
                  <label htmlFor="organization">
                    {role === "doctor" ? "Hospital / Clinic Name" : "NGO Name"}
                  </label>
                  <input
                    id="organization"
                    type="text"
                    placeholder={
                      role === "doctor"
                        ? "Enter hospital or clinic"
                        : "Enter NGO organization name"
                    }
                  />
                </div>

                <div className="field">
                  <label htmlFor="specialization">
                    {role === "doctor" ? "Medical Specialization" : "NGO Field"}
                  </label>
                  <select id="specialization" defaultValue="">
                    <option value="" disabled>
                      Select option
                    </option>

                    {role === "doctor" ? (
                      <>
                        <option value="orthopedic">Orthopedic</option>
                        <option value="general">General Medicine</option>
                        <option value="surgery">Surgery</option>
                        <option value="physical-therapy">
                          Physical Therapy
                        </option>
                        <option value="psychology">
                          Psychological Support
                        </option>
                      </>
                    ) : (
                      <>
                        <option value="medical-aid">Medical Aid</option>
                        <option value="food-support">Food Support</option>
                        <option value="financial-aid">Financial Aid</option>
                        <option value="mobility-support">
                          Mobility Support
                        </option>
                        <option value="emergency-support">
                          Emergency Support
                        </option>
                      </>
                    )}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="license">
                    {role === "doctor"
                      ? "Medical License Number"
                      : "Registration Number"}
                  </label>
                  <input
                    id="license"
                    type="text"
                    placeholder={
                      role === "doctor"
                        ? "Enter license number"
                        : "Enter NGO registration number"
                    }
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="address">Work Address / Location</label>
                <input
                  id="address"
                  type="text"
                  placeholder="City, area, street, or service location"
                />
              </div>

              <div className="field">
                <label htmlFor="experience">
                  {role === "doctor"
                    ? "Professional Experience"
                    : "Humanitarian Services Description"}
                </label>
                <textarea
                  id="experience"
                  rows="4"
                  placeholder={
                    role === "doctor"
                      ? "Briefly describe your medical experience and patient care background..."
                      : "Briefly describe your NGO services, target groups, and support capacity..."
                  }
                ></textarea>
              </div>

              <div className="form-grid">
                <div className="field">
                  <label htmlFor="password">Create Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Min. 8 characters"
                  />
                </div>

                <div className="field">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repeat password"
                  />
                </div>
              </div>

              <div className="upload-box">
                <div>
                  <span className="material-symbols-outlined">upload_file</span>
                  <h3>Upload Verification Documents</h3>
                  <p>
                    Upload license, ID, registration paper, or supporting
                    documents for admin review.
                  </p>
                </div>

                <button type="button">Choose File</button>
              </div>

              <div className="form-bottom">
                <label className="terms-check">
                  <input type="checkbox" />
                  <span>
                    I confirm that all submitted information is accurate and
                    agree to the <a href="#terms">Terms of Service</a>.
                  </span>
                </label>

                {message && (
                  <p style={{ color: "green", marginBottom: "10px" }}>
                    {message}
                  </p>
                )}
                <button type="submit" className="submit-btn">
                  Submit Request
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>

      <footer className="form-footer">
        <div>
          <h3>War Injuries Care</h3>
          <p>© 2026 War Injuries Care. All rights reserved.</p>
        </div>

        <div className="form-footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact Us</a>
          <a href="#medical">Medical Disclaimer</a>
        </div>
      </footer>
    </div>
  );
}

export default JoinRequest;
