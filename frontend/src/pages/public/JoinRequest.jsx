import { useState } from "react";
import "../../styles/dashboard.css";
import API from "../../services/api";
import AuthHeader from "../../components/AuthHeader";

function JoinRequest() {
  const [role, setRole] = useState("doctor");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [documentFile, setDocumentFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missingFields = [];

    if (!e.target.fullName.value.trim()) missingFields.push("Full Name");
    if (!e.target.email.value.trim()) missingFields.push("Email Address");
    if (!e.target.phone.value.trim()) missingFields.push("Phone Number");
    if (!e.target.organization.value.trim()) {
      missingFields.push(
        role === "doctor" ? "Hospital / Clinic Name" : "NGO Name",
      );
    }
    if (!e.target.specialization.value) {
      missingFields.push(
        role === "doctor" ? "Medical Specialization" : "NGO Field",
      );
    }
    if (!e.target.license.value.trim()) {
      missingFields.push(
        role === "doctor" ? "Medical License Number" : "Registration Number",
      );
    }
    if (!e.target.address.value.trim())
      missingFields.push("Work Address / Location");
    if (!e.target.experience.value.trim()) {
      missingFields.push(
        role === "doctor"
          ? "Professional Experience"
          : "Humanitarian Services Description",
      );
    }
    if (!e.target.password.value.trim()) missingFields.push("Password");
    if (!e.target.confirmPassword.value.trim())
      missingFields.push("Confirm Password");
    if (!documentFile) missingFields.push("Verification Documents");
    if (!e.target.terms.checked) missingFields.push("Terms Confirmation");

    if (missingFields.length > 0) {
      setMessageType("error");
      setMessage(
        `Please complete the following fields: ${missingFields.join(", ")}`,
      );
      return;
    }

    if (e.target.password.value !== e.target.confirmPassword.value) {
      setMessageType("error");
      setMessage("Passwords do not match");
      return;
    }

    if (!documentFile) {
      setMessageType("error");
      setMessage("Please upload verification documents");
      return;
    }

    if (!e.target.terms.checked) {
      setMessageType("error");
      setMessage("You must confirm that the submitted information is accurate");
      return;
    }

    if (e.target.password.value.length < 6) {
      setMessageType("error");
      setMessage("Password must be at least 6 characters");
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

      setMessageType("success");
      setMessage(res.data.message);
    } catch (err) {
      setMessageType("error");
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="form-page">
      <AuthHeader />
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

                <input
                  type="file"
                  id="documents"
                  style={{ display: "none" }}
                  onChange={(e) => setDocumentFile(e.target.files[0])}
                />

                {documentFile && <p>{documentFile.name}</p>}

                <label htmlFor="documents" className="upload-btn">
                  Choose File
                </label>
              </div>

              <div className="form-bottom">
                <label className="terms-check">
                  <input type="checkbox" name="terms" />
                  <span>
                    I confirm that all submitted information is accurate and
                    agree to the <a href="#terms">Terms of Service</a>.
                  </span>
                </label>

                {message && (
                  <p
                    className={
                      messageType === "success"
                        ? "success-message"
                        : "error-message"
                    }
                  >
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
