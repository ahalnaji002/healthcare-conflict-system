import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";

function DoctorUpdateTreatment() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await API.get(`/auth/doctor-patients/${patientId}`);
        setPatient(res.data.patient);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load patient data");
      }
    };

    if (patientId) fetchPatient();
  }, [patientId]);
const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  setError("");

  try {
    const res = await API.post("/medical/prescribe", {
      patient_id: patientId, 
      medicine_name: e.target.medicine_name.value,
      dose: e.target.dose.value,
      freq: e.target.freq.value,
      instructions: e.target.instructions.value,
      start_date: e.target.start_date.value,
      end_date: e.target.end_date.value,
    });
    setMessage(res.data.message);
    e.target.reset();
  } catch (err) {
    setError(err.response?.data?.message || "Failed to update treatment plan");
  }
};
  return (
    <>
      <section className="update-treatment-layout">
        <div className="content-left">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Selected Patient</h2>
                <p>Current patient whose treatment plan is being updated.</p>
              </div>

              <Link to="/doctor-patients">
                <button>Change Patient</button>
              </Link>
            </div>

            <div className="selected-patient-card">
              <div className="patient-avatar large-avatar">A</div>

              <div>
                <h3>{patient?.full_name || "Loading..."}</h3>
                <p>
                  {patient?.patient_id ? `PT-${String(patient.patient_id).padStart(3, "0")}` : ""}
                  {" • "}
                  {patient?.medical_condition || "No condition recorded"}
                </p>
                <div className="profile-badges">
                  <span className="priority-badge critical">Critical</span>
                  <span className="tag blue-tag">Wound Care</span>
                  <span className="tag orange-tag">Needs Review</span>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Treatment Plan Form</h2>
                <p>Update medication, wound care, therapy, and doctor notes.</p>
              </div>
            </div>

            <form className="treatment-form" onSubmit={handleSubmit}>
              <div className="treatment-form-grid">
                <div className="treatment-field">
                  <label>Medicine Name</label>
                  <input type="text" name="medicine_name" />
                </div>

                <div className="treatment-field">
                  <label>Priority Level</label>
                  <select defaultValue="critical">
                    <option value="critical">Critical</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div className="treatment-field">
                  <label>Start Date</label>
                  <input type="date" name="start_date" />
                </div>

                <div className="treatment-field">
                  <label>Next Review Date</label>
                  <input type="date" name="end_date"  />
                </div>
              </div>

              <div className="treatment-field">
                <label>Medication Instructions</label>
                <textarea rows="4" name="instructions"  />
              </div>

              <div className="treatment-field">
                <label>Dose</label>
                <textarea rows="4" name="dose"  />
              </div>

              <div className="treatment-field">
                <label>Frequency</label>
                <textarea rows="4" name="freq"  />
              </div>

              <div className="treatment-actions">
                {message && <p style={{ color: "green", marginBottom: "10px" }}>{message}</p>}
                {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
                <button type="button" className="secondary-plan-btn">
                  Save as Draft
                </button>

                <button type="submit" className="submit-plan-btn">
                  Update Treatment Plan
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="content-right">
          <div className="panel">
            <h2>Current Plan Status</h2>

            <div className="progress-circle">
              <span>72%</span>
            </div>

            <p className="side-note">
              Patient is improving, but still needs wound monitoring and
              medication adherence follow-up.
            </p>
          </div>

          <div className="panel">
            <h2>Plan Checklist</h2>

            <div className="checklist-list">
              <label className="checklist-item">
                <input type="checkbox" defaultChecked />
                <span>Medication schedule updated</span>
              </label>

              <label className="checklist-item">
                <input type="checkbox" defaultChecked />
                <span>Wound care instructions reviewed</span>
              </label>

              <label className="checklist-item">
                <input type="checkbox" />
                <span>Physical therapy approval pending</span>
              </label>

              <label className="checklist-item">
                <input type="checkbox" />
                <span>Next review appointment confirmed</span>
              </label>
            </div>
          </div>

          <div className="panel">
            <h2>Recent Updates</h2>

            <div className="doctor-update-list">
              <div className="doctor-update-item compact-update">
                <span className="material-symbols-outlined">edit_note</span>

                <div>
                  <h3>Medication phase extended</h3>
                  <small>Today • 11:30 AM</small>
                </div>
              </div>

              <div className="doctor-update-item compact-update">
                <span className="material-symbols-outlined">photo_camera</span>

                <div>
                  <h3>Wound photo reviewed</h3>
                  <small>Yesterday • 08:15 PM</small>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <h2>Quick Actions</h2>

            <div className="doctor-actions-grid">
              <Link to={`/doctor-patient-record/${patientId}`}>
                <button className="message-btn secondary-message-btn">
                  <span className="material-symbols-outlined">
                    clinical_notes
                  </span>
                  Open Record
                </button>
              </Link>

              <Link to="/doctor-chat">
                <button className="message-btn secondary-message-btn">
                  <span className="material-symbols-outlined">chat</span>
                  Message Patient
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DoctorUpdateTreatment;
