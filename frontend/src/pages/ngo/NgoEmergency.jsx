//import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

function NgoEmergency() {
  return (
    <div className="dashboard-page">
      

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <h1>Emergency Coordination</h1>
            <p>
              Coordinate urgent cases, assign support teams, and track emergency
              response.
            </p>
          </div>

          <div className="topbar-actions">
            <button className="emergency-action">
              <span className="material-symbols-outlined">emergency</span>
              New Emergency
            </button>

            <div className="user-avatar">
              <span className="material-symbols-outlined">
                volunteer_activism
              </span>
            </div>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-box red">
            <div>
              <p>Active Emergencies</p>
              <h2>7</h2>
            </div>
            <span className="material-symbols-outlined">emergency</span>
          </div>

          <div className="stat-box orange">
            <div>
              <p>Waiting Assignment</p>
              <h2>12</h2>
            </div>
            <span className="material-symbols-outlined">pending_actions</span>
          </div>

          <div className="stat-box blue">
            <div>
              <p>Teams Available</p>
              <h2>5</h2>
            </div>
            <span className="material-symbols-outlined">groups</span>
          </div>

          <div className="stat-box green">
            <div>
              <p>Resolved Today</p>
              <h2>19</h2>
            </div>
            <span className="material-symbols-outlined">check_circle</span>
          </div>
        </section>

        <section className="emergency-layout">
          <div className="content-left">
            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Urgent Cases Queue</h2>
                  <p>Critical cases needing immediate NGO response.</p>
                </div>

                <button>Refresh</button>
              </div>

              <div className="emergency-case-list">
                <div className="emergency-case-card critical-case">
                  <div className="case-icon">
                    <span className="material-symbols-outlined">emergency</span>
                  </div>

                  <div className="case-content">
                    <h3>Urgent Medical Kit Needed</h3>
                    <p>
                      Patient Ahmed Hashem needs wound care materials and
                      antibiotics delivery within 24 hours.
                    </p>

                    <div className="case-meta">
                      <span>Location: Gaza</span>
                      <span>Priority: Critical</span>
                      <span>Submitted: 15 min ago</span>
                    </div>
                  </div>

                  <div className="case-actions">
                    <button className="mini-btn">Assign Team</button>
                    <button className="icon-mini-btn">
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    </button>
                  </div>
                </div>

                <div className="emergency-case-card">
                  <div className="case-icon orange-case">
                    <span className="material-symbols-outlined">
                      local_hospital
                    </span>
                  </div>

                  <div className="case-content">
                    <h3>Hospital Transport Request</h3>
                    <p>
                      Patient requires transportation to a rehabilitation center
                      for scheduled therapy follow-up.
                    </p>

                    <div className="case-meta">
                      <span>Location: Rafah</span>
                      <span>Priority: Medium</span>
                      <span>Submitted: 40 min ago</span>
                    </div>
                  </div>

                  <div className="case-actions">
                    <button className="mini-btn">Assign Driver</button>
                    <button className="icon-mini-btn">
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    </button>
                  </div>
                </div>

                <div className="emergency-case-card critical-case">
                  <div className="case-icon">
                    <span className="material-symbols-outlined">
                      wheelchair_pickup
                    </span>
                  </div>

                  <div className="case-content">
                    <h3>Mobility Support Required</h3>
                    <p>
                      Urgent wheelchair request for a patient with limited
                      movement after lower limb injury.
                    </p>

                    <div className="case-meta">
                      <span>Location: Khan Younis</span>
                      <span>Priority: Critical</span>
                      <span>Submitted: 1 hour ago</span>
                    </div>
                  </div>

                  <div className="case-actions">
                    <button className="mini-btn">Assign Resource</button>
                    <button className="icon-mini-btn">
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Response Teams</h2>
                  <p>Available field teams and current assignment status.</p>
                </div>

                <button>Manage Teams</button>
              </div>

              <div className="team-grid">
                <div className="team-card available-team">
                  <span className="material-symbols-outlined">groups</span>
                  <div>
                    <h3>Team Alpha</h3>
                    <p>Medical supplies delivery • Available</p>
                  </div>
                </div>

                <div className="team-card busy-team">
                  <span className="material-symbols-outlined">
                    directions_car
                  </span>
                  <div>
                    <h3>Transport Team</h3>
                    <p>Currently assigned • ETA 25 min</p>
                  </div>
                </div>

                <div className="team-card available-team">
                  <span className="material-symbols-outlined">inventory_2</span>
                  <div>
                    <h3>Warehouse Team</h3>
                    <p>Resource packing • Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-right">
            <div className="panel progress-panel">
              <h2>Emergency Response Rate</h2>

              <div className="progress-circle">
                <span>86%</span>
              </div>

              <p>
                Most urgent requests are assigned quickly. Critical requests
                need response within the first hour.
              </p>
            </div>

            <div className="panel">
              <h2>Live Coordination</h2>

              <div className="coordination-step active-step-card">
                <span className="material-symbols-outlined">report</span>
                <div>
                  <h3>Request Received</h3>
                  <p>Emergency request added to urgent queue.</p>
                </div>
              </div>

              <div className="coordination-step active-step-card">
                <span className="material-symbols-outlined">
                  assignment_ind
                </span>
                <div>
                  <h3>Team Assignment</h3>
                  <p>Assign field team or resource coordinator.</p>
                </div>
              </div>

              <div className="coordination-step">
                <span className="material-symbols-outlined">
                  local_shipping
                </span>
                <div>
                  <h3>Delivery / Transport</h3>
                  <p>Track support delivery to patient location.</p>
                </div>
              </div>

              <div className="coordination-step">
                <span className="material-symbols-outlined">task_alt</span>
                <div>
                  <h3>Case Resolved</h3>
                  <p>Confirm completion and update patient request status.</p>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>Critical Locations</h2>

              <div className="location-list">
                <div className="location-item">
                  <span className="request-dot urgent"></span>
                  <div>
                    <h3>Gaza</h3>
                    <p>9 active urgent requests</p>
                  </div>
                </div>

                <div className="location-item">
                  <span className="request-dot urgent"></span>
                  <div>
                    <h3>Rafah</h3>
                    <p>5 active urgent requests</p>
                  </div>
                </div>

                <div className="location-item">
                  <span className="request-dot normal"></span>
                  <div>
                    <h3>Khan Younis</h3>
                    <p>3 active urgent requests</p>
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

export default NgoEmergency;
