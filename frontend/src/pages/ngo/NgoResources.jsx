//import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

function NgoResources() {
  return (
    <div className="dashboard-page">
      

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <h1>Resource Allocation</h1>
            <p>
              Manage available support resources and assign them to patient
              requests.
            </p>
          </div>

          <div className="topbar-actions">
            <button className="emergency-action">
              <span className="material-symbols-outlined">inventory_2</span>
              Update Stock
            </button>

            <div className="user-avatar">
              <span className="material-symbols-outlined">
                volunteer_activism
              </span>
            </div>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-box blue">
            <div>
              <p>Medical Kits</p>
              <h2>128</h2>
            </div>
            <span className="material-symbols-outlined">medical_services</span>
          </div>

          <div className="stat-box green">
            <div>
              <p>Vehicles</p>
              <h2>6</h2>
            </div>
            <span className="material-symbols-outlined">directions_car</span>
          </div>

          <div className="stat-box orange">
            <div>
              <p>Pending Allocation</p>
              <h2>34</h2>
            </div>
            <span className="material-symbols-outlined">pending_actions</span>
          </div>

          <div className="stat-box red">
            <div>
              <p>Low Stock Items</p>
              <h2>4</h2>
            </div>
            <span className="material-symbols-outlined">warning</span>
          </div>
        </section>

        <section className="resources-layout">
          <div className="content-left">
            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Available Resources</h2>
                  <p>Current resources ready for assignment.</p>
                </div>

                <button>Add Resource</button>
              </div>

              <div className="resource-allocation-grid">
                <div className="allocation-card">
                  <div className="allocation-icon blue-icon">
                    <span className="material-symbols-outlined">
                      medical_services
                    </span>
                  </div>

                  <div>
                    <h3>Medical Kits</h3>
                    <p>
                      Wound dressing, antiseptics, basic medication supplies.
                    </p>
                  </div>

                  <div className="allocation-stock">
                    <strong>128</strong>
                    <span>Available</span>
                  </div>
                </div>

                <div className="allocation-card">
                  <div className="allocation-icon green-icon">
                    <span className="material-symbols-outlined">
                      directions_car
                    </span>
                  </div>

                  <div>
                    <h3>Transport Vehicles</h3>
                    <p>
                      Vehicles available for hospital and therapy transport.
                    </p>
                  </div>

                  <div className="allocation-stock">
                    <strong>6</strong>
                    <span>Available</span>
                  </div>
                </div>

                <div className="allocation-card low-stock">
                  <div className="allocation-icon orange-icon">
                    <span className="material-symbols-outlined">
                      wheelchair_pickup
                    </span>
                  </div>

                  <div>
                    <h3>Mobility Devices</h3>
                    <p>Wheelchairs, crutches, and movement support devices.</p>
                  </div>

                  <div className="allocation-stock">
                    <strong>18</strong>
                    <span>Available</span>
                  </div>
                </div>

                <div className="allocation-card">
                  <div className="allocation-icon blue-icon">
                    <span className="material-symbols-outlined">payments</span>
                  </div>

                  <div>
                    <h3>Financial Aid Budget</h3>
                    <p>
                      Allocated budget for treatment and examination expenses.
                    </p>
                  </div>

                  <div className="allocation-stock">
                    <strong>34</strong>
                    <span>Cases</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Assign Resource to Request</h2>
                  <p>Select request and allocate the appropriate support.</p>
                </div>
              </div>

              <form className="allocation-form">
                <div className="treatment-form-grid">
                  <div className="treatment-field">
                    <label>Patient Request</label>
                    <select defaultValue="ahmed">
                      <option value="ahmed">
                        Ahmed Hashem — Medical Supplies
                      </option>
                      <option value="mohammed">
                        Mohammed Ali — Transportation
                      </option>
                      <option value="sara">Sara Nabil — Financial Aid</option>
                      <option value="rami">
                        Rami Saleh — Mobility Support
                      </option>
                    </select>
                  </div>

                  <div className="treatment-field">
                    <label>Resource Type</label>
                    <select defaultValue="medical-kit">
                      <option value="medical-kit">Medical Kit</option>
                      <option value="transport">Transport Vehicle</option>
                      <option value="financial">Financial Aid</option>
                      <option value="mobility">Mobility Device</option>
                    </select>
                  </div>

                  <div className="treatment-field">
                    <label>Quantity</label>
                    <input type="number" defaultValue="1" />
                  </div>

                  <div className="treatment-field">
                    <label>Assigned Team</label>
                    <select defaultValue="alpha">
                      <option value="alpha">Team Alpha</option>
                      <option value="transport">Transport Team</option>
                      <option value="warehouse">Warehouse Team</option>
                    </select>
                  </div>
                </div>

                <div className="treatment-field">
                  <label>Allocation Notes</label>
                  <textarea
                    rows="4"
                    defaultValue="Prepare medical kit and deliver it to the patient location within 24 hours."
                  ></textarea>
                </div>

                <div className="treatment-actions">
                  <button type="button" className="secondary-plan-btn">
                    Save Draft
                  </button>

                  <button type="button" className="submit-plan-btn">
                    Assign Resource
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="content-right">
            <div className="panel progress-panel">
              <h2>Allocation Capacity</h2>

              <div className="progress-circle">
                <span>74%</span>
              </div>

              <p>
                Resource capacity is stable, but mobility devices and medical
                kits should be monitored closely.
              </p>
            </div>

            <div className="panel">
              <h2>Low Stock Alerts</h2>

              <div className="alert-card critical-alert">
                <span className="material-symbols-outlined">warning</span>
                <div>
                  <h3>Wound Dressing Packs</h3>
                  <p>Only 12 packs remaining in stock.</p>
                </div>
              </div>

              <div className="alert-card">
                <span className="material-symbols-outlined">
                  wheelchair_pickup
                </span>
                <div>
                  <h3>Wheelchairs</h3>
                  <p>High demand from mobility support requests.</p>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>Recent Allocations</h2>

              <div className="allocation-history">
                <div className="allocation-history-item">
                  <span className="material-symbols-outlined">
                    medical_services
                  </span>
                  <div>
                    <h3>Medical Kit</h3>
                    <p>Assigned to Ahmed Hashem</p>
                    <small>Today • 01:20 PM</small>
                  </div>
                </div>

                <div className="allocation-history-item">
                  <span className="material-symbols-outlined">
                    directions_car
                  </span>
                  <div>
                    <h3>Transport Vehicle</h3>
                    <p>Assigned to Mohammed Ali</p>
                    <small>Today • 10:45 AM</small>
                  </div>
                </div>

                <div className="allocation-history-item">
                  <span className="material-symbols-outlined">payments</span>
                  <div>
                    <h3>Financial Aid</h3>
                    <p>Approved for Sara Nabil</p>
                    <small>Yesterday • 04:30 PM</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NgoResources;
