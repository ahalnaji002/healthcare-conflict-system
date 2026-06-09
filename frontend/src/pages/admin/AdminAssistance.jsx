
//import { Link } from "react-router-dom";
import "../../styles/dashboard.css";


function AdminAssistance() {
  return (
    <div className="dashboard-page">
      

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <h1>Assistance Requests Management</h1>
            <p>
              Monitor patient assistance requests and NGO response status across
              the system.
            </p>
          </div>

          <div className="topbar-actions">
            <button className="emergency-action">
              <span className="material-symbols-outlined">priority_high</span>
              Critical Requests
            </button>

            <div className="user-avatar">
              <span className="material-symbols-outlined">
                admin_panel_settings
              </span>
            </div>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-box blue">
            <div>
              <p>Total Requests</p>
              <h2>386</h2>
            </div>
            <span className="material-symbols-outlined">request_page</span>
          </div>

          <div className="stat-box red">
            <div>
              <p>Critical</p>
              <h2>31</h2>
            </div>
            <span className="material-symbols-outlined">priority_high</span>
          </div>

          <div className="stat-box orange">
            <div>
              <p>Under Review</p>
              <h2>74</h2>
            </div>
            <span className="material-symbols-outlined">hourglass_top</span>
          </div>

          <div className="stat-box green">
            <div>
              <p>Completed</p>
              <h2>219</h2>
            </div>
            <span className="material-symbols-outlined">task_alt</span>
          </div>
        </section>

        <section className="admin-assistance-layout">
          <div className="content-left">
            <div className="panel">
              <div className="panel-header admin-users-toolbar">
                <div>
                  <h2>All Assistance Requests</h2>
                  <p>
                    Review request status, priority, assigned NGO, and response
                    progress.
                  </p>
                </div>

                <div className="table-actions">
                  <div className="search-box">
                    <span className="material-symbols-outlined">search</span>
                    <input
                      type="text"
                      placeholder="Search patient, NGO, or location..."
                    />
                  </div>

                  <select className="filter-select">
                    <option>All Priorities</option>
                    <option>Critical</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>

                  <select className="filter-select">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Under Review</option>
                    <option>Approved</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              <div className="assistance-admin-table">
                <div className="assistance-admin-row assistance-admin-head">
                  <span>Patient</span>
                  <span>Request</span>
                  <span>Assigned NGO</span>
                  <span>Priority</span>
                  <span>Status</span>
                  <span>Action</span>
                </div>

                <div className="assistance-admin-row critical-row">
                  <div className="patient-cell">
                    <div className="patient-avatar">A</div>
                    <div>
                      <h3>Ahmed Hashem</h3>
                      <p>Gaza • PT-2026-001</p>
                    </div>
                  </div>

                  <span>Medical Supplies</span>
                  <span>Hope Relief NGO</span>
                  <span className="priority-badge critical">Critical</span>
                  <span className="status pending">Under Review</span>

                  <div className="row-actions">
                    <button className="mini-btn">Monitor</button>
                    <button className="icon-mini-btn">
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    </button>
                  </div>
                </div>

                <div className="assistance-admin-row">
                  <div className="patient-cell">
                    <div className="patient-avatar">M</div>
                    <div>
                      <h3>Mohammed Ali</h3>
                      <p>Rafah • PT-2026-014</p>
                    </div>
                  </div>

                  <span>Transportation</span>
                  <span>Care Bridge NGO</span>
                  <span className="priority-badge medium">Medium</span>
                  <span className="status pending">Pending</span>

                  <div className="row-actions">
                    <button className="mini-btn">Assign</button>
                    <button className="icon-mini-btn">
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    </button>
                  </div>
                </div>

                <div className="assistance-admin-row">
                  <div className="patient-cell">
                    <div className="patient-avatar">S</div>
                    <div>
                      <h3>Sara Nabil</h3>
                      <p>Khan Younis • PT-2026-022</p>
                    </div>
                  </div>

                  <span>Financial Aid</span>
                  <span>Hope Relief NGO</span>
                  <span className="priority-badge low">Low</span>
                  <span className="status taken">Completed</span>

                  <div className="row-actions">
                    <button className="mini-btn">Details</button>
                    <button className="icon-mini-btn">
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    </button>
                  </div>
                </div>

                <div className="assistance-admin-row critical-row">
                  <div className="patient-cell">
                    <div className="patient-avatar">R</div>
                    <div>
                      <h3>Rami Saleh</h3>
                      <p>North Gaza • PT-2026-031</p>
                    </div>
                  </div>

                  <span>Mobility Support</span>
                  <span>Not Assigned</span>
                  <span className="priority-badge critical">Critical</span>
                  <span className="status pending">Needs NGO</span>

                  <div className="row-actions">
                    <button className="mini-btn">Assign NGO</button>
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
                  <h2>NGO Response Overview</h2>
                  <p>
                    Compare active organizations by assigned cases and
                    completion rate.
                  </p>
                </div>
              </div>

              <div className="ngo-response-grid">
                <div className="ngo-response-card">
                  <span className="material-symbols-outlined">business</span>
                  <div>
                    <h3>Hope Relief NGO</h3>
                    <p>86 assigned cases • 79 completed</p>
                  </div>
                  <strong>92%</strong>
                </div>

                <div className="ngo-response-card">
                  <span className="material-symbols-outlined">business</span>
                  <div>
                    <h3>Care Bridge NGO</h3>
                    <p>54 assigned cases • 43 completed</p>
                  </div>
                  <strong>80%</strong>
                </div>

                <div className="ngo-response-card warning-response">
                  <span className="material-symbols-outlined">warning</span>
                  <div>
                    <h3>North Health Support</h3>
                    <p>31 assigned cases • 18 completed</p>
                  </div>
                  <strong>58%</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="content-right">
            <div className="panel progress-panel">
              <h2>Resolution Rate</h2>

              <div className="progress-circle">
                <span>79%</span>
              </div>

              <p>
                Most assistance cases are completed, but critical requests still
                need faster NGO assignment.
              </p>
            </div>

            <div className="panel">
              <h2>Critical Monitoring</h2>

              <div className="alert-card critical-alert">
                <span className="material-symbols-outlined">warning</span>
                <div>
                  <h3>Unassigned Critical Case</h3>
                  <p>
                    Rami Saleh needs mobility support but has no NGO assigned.
                  </p>
                </div>
              </div>

              <div className="alert-card">
                <span className="material-symbols-outlined">inventory_2</span>
                <div>
                  <h3>Medical Kit Demand</h3>
                  <p>Medical supply requests increased this week.</p>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>Request Categories</h2>

              <div className="analytics-list">
                <div className="analytics-item">
                  <span>Medical Supplies</span>
                  <strong>46%</strong>
                </div>

                <div className="analytics-item">
                  <span>Transportation</span>
                  <strong>24%</strong>
                </div>

                <div className="analytics-item">
                  <span>Financial Aid</span>
                  <strong>18%</strong>
                </div>

                <div className="analytics-item">
                  <span>Mobility Support</span>
                  <strong>12%</strong>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>Admin Actions</h2>

              <div className="doctor-actions-grid">
                <button className="message-btn">
                  <span className="material-symbols-outlined">
                    assignment_ind
                  </span>
                  Assign NGO
                </button>

                <button className="message-btn secondary-message-btn">
                  <span className="material-symbols-outlined">download</span>
                  Export Requests
                </button>

                <button className="message-btn secondary-message-btn">
                  <span className="material-symbols-outlined">analytics</span>
                  Generate Summary
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminAssistance;
