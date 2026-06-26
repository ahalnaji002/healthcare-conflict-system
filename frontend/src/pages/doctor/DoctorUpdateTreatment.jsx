import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

function DoctorUpdateTreatment() {
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
                <h3>Ahmed Hashem</h3>
                <p>PT-2026-001 • Lower limb injury • Critical priority</p>

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

            <form className="treatment-form">
              <div className="treatment-form-grid">
                <div className="treatment-field">
                  <label>Plan Title</label>
                  <input
                    type="text"
                    defaultValue="Lower Limb Injury Recovery Plan"
                  />
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
                  <input type="date" defaultValue="2026-05-28" />
                </div>

                <div className="treatment-field">
                  <label>Next Review Date</label>
                  <input type="date" defaultValue="2026-06-02" />
                </div>
              </div>

              <div className="treatment-field">
                <label>Medication Instructions</label>
                <textarea
                  rows="4"
                  defaultValue="Continue Amoxicillin 500mg after breakfast for 7 days. Pain relief tablet after lunch only when needed. Apply wound cream before sleep daily."
                />
              </div>

              <div className="treatment-field">
                <label>Wound Care Instructions</label>
                <textarea
                  rows="4"
                  defaultValue="Clean the wound once daily using sterile saline. Keep the wound dry after cleaning. Upload a wound photo every two days for review."
                />
              </div>

              <div className="treatment-field">
                <label>Physical Therapy Notes</label>
                <textarea
                  rows="4"
                  defaultValue="Begin light mobility exercises after the next review if pain remains low and wound condition stays stable."
                />
              </div>

              <div className="treatment-actions">
                <button type="button" className="secondary-plan-btn">
                  Save as Draft
                </button>

                <button type="button" className="submit-plan-btn">
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
              <Link to="/doctor-patient-record">
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
