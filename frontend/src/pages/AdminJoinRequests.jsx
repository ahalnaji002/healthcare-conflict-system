import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function AdminJoinRequests() {
  return (
    <div className="dashboard-page">
      <aside className="sidebar admin-sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <span className="material-symbols-outlined">
              admin_panel_settings
            </span>
          </div>

          <div>
            <h2>War Injuries Care</h2>
            <p>Admin Portal</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/admin-dashboard">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>

          <Link to="/admin-users">
            <span className="material-symbols-outlined">manage_accounts</span>
            Users Management
          </Link>

          <Link to="/admin-join-requests" className="active">
            <span className="material-symbols-outlined">how_to_reg</span>
            Join Requests
          </Link>

          <Link to="/admin-assistance">
            <span className="material-symbols-outlined">
              volunteer_activism
            </span>
            Assistance Requests
          </Link>

          <Link to="/admin-logs">
            <span className="material-symbols-outlined">history</span>
            Activity Logs
          </Link>

          <Link to="/admin-records">
            <span className="material-symbols-outlined">database</span>
            System Records
          </Link>

          <Link to="/admin-reports">
            <span className="material-symbols-outlined">analytics</span>
            Reports Analytics
          </Link>

          <Link to="/admin-settings">
            <span className="material-symbols-outlined">settings</span>
            Settings
          </Link>
        </nav>

        <div className="sidebar-footer">
          <Link to="/login">
            <span className="material-symbols-outlined">logout</span>
            Logout
          </Link>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <h1>Join Requests Review</h1>
            <p>
              Review doctor and NGO registration requests before account
              activation.
            </p>
          </div>

          <div className="topbar-actions">
            <button className="emergency-action">
              <span className="material-symbols-outlined">security</span>
              Verification Center
            </button>

            <div className="user-avatar">
              <span className="material-symbols-outlined">
                admin_panel_settings
              </span>
            </div>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-box orange">
            <div>
              <p>Pending Requests</p>
              <h2>23</h2>
            </div>
            <span className="material-symbols-outlined">pending_actions</span>
          </div>

          <div className="stat-box green">
            <div>
              <p>Approved This Week</p>
              <h2>41</h2>
            </div>
            <span className="material-symbols-outlined">check_circle</span>
          </div>

          <div className="stat-box red">
            <div>
              <p>Rejected</p>
              <h2>7</h2>
            </div>
            <span className="material-symbols-outlined">cancel</span>
          </div>

          <div className="stat-box blue">
            <div>
              <p>Need Documents</p>
              <h2>9</h2>
            </div>
            <span className="material-symbols-outlined">description</span>
          </div>
        </section>

        <section className="join-review-layout">
          <div className="content-left">
            <div className="panel">
              <div className="panel-header admin-users-toolbar">
                <div>
                  <h2>Pending Verification Requests</h2>
                  <p>Review submitted information and uploaded documents.</p>
                </div>

                <div className="table-actions">
                  <div className="search-box">
                    <span className="material-symbols-outlined">search</span>
                    <input type="text" placeholder="Search applicants..." />
                  </div>

                  <select className="filter-select">
                    <option>All Types</option>
                    <option>Doctors</option>
                    <option>NGOs</option>
                  </select>
                </div>
              </div>

              <div className="join-request-list">
                <div className="join-request-card">
                  <div className="join-request-main">
                    <div className="patient-avatar">L</div>

                    <div>
                      <h3>Dr. Lina Omar</h3>
                      <p>Surgery Specialist • lina.omar@example.com</p>

                      <div className="profile-badges">
                        <span className="role-pill doctor-role">Doctor</span>
                        <span className="status pending">Pending</span>
                      </div>
                    </div>
                  </div>

                  <div className="join-request-details">
                    <div>
                      <p>License Number</p>
                      <h4>MED-PENDING-221</h4>
                    </div>

                    <div>
                      <p>Hospital / Clinic</p>
                      <h4>Al Amal Medical Center</h4>
                    </div>

                    <div>
                      <p>Submitted</p>
                      <h4>Today, 09:20 AM</h4>
                    </div>
                  </div>

                  <div className="join-request-actions">
                    <button className="mini-btn">Approve</button>
                    <button className="secondary-plan-btn">Request Docs</button>
                    <button className="icon-mini-btn danger-icon-btn">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                </div>

                <div className="join-request-card">
                  <div className="join-request-main">
                    <div className="patient-avatar">C</div>

                    <div>
                      <h3>Care Bridge NGO</h3>
                      <p>Medical Aid Organization • contact@carebridge.org</p>

                      <div className="profile-badges">
                        <span className="role-pill ngo-role">NGO</span>
                        <span className="status pending">Pending</span>
                      </div>
                    </div>
                  </div>

                  <div className="join-request-details">
                    <div>
                      <p>Registration Number</p>
                      <h4>NGO-PENDING-884</h4>
                    </div>

                    <div>
                      <p>Support Field</p>
                      <h4>Medical Supplies</h4>
                    </div>

                    <div>
                      <p>Submitted</p>
                      <h4>Yesterday, 04:50 PM</h4>
                    </div>
                  </div>

                  <div className="join-request-actions">
                    <button className="mini-btn">Approve</button>
                    <button className="secondary-plan-btn">Request Docs</button>
                    <button className="icon-mini-btn danger-icon-btn">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                </div>

                <div className="join-request-card needs-docs-card">
                  <div className="join-request-main">
                    <div className="patient-avatar">N</div>

                    <div>
                      <h3>North Health Support</h3>
                      <p>Humanitarian Support NGO • northhealth@example.org</p>

                      <div className="profile-badges">
                        <span className="role-pill ngo-role">NGO</span>
                        <span className="status pending">Needs Documents</span>
                      </div>
                    </div>
                  </div>

                  <div className="join-request-details">
                    <div>
                      <p>Registration Number</p>
                      <h4>NGO-PENDING-771</h4>
                    </div>

                    <div>
                      <p>Support Field</p>
                      <h4>Transport Support</h4>
                    </div>

                    <div>
                      <p>Submitted</p>
                      <h4>2 days ago</h4>
                    </div>
                  </div>

                  <div className="join-request-actions">
                    <button className="mini-btn">Review</button>
                    <button className="secondary-plan-btn">Message</button>
                    <button className="icon-mini-btn danger-icon-btn">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-right">
            <div className="panel progress-panel">
              <h2>Verification Progress</h2>

              <div className="progress-circle">
                <span>68%</span>
              </div>

              <p>
                Most requests are processed quickly. Some applicants still need
                to upload missing verification documents.
              </p>
            </div>

            <div className="panel">
              <h2>Review Checklist</h2>

              <div className="checklist-list">
                <label className="checklist-item">
                  <input type="checkbox" defaultChecked />
                  <span>Check identity information</span>
                </label>

                <label className="checklist-item">
                  <input type="checkbox" defaultChecked />
                  <span>Review professional license</span>
                </label>

                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Validate organization documents</span>
                </label>

                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Confirm service area and role permissions</span>
                </label>
              </div>
            </div>

            <div className="panel">
              <h2>Verification Notes</h2>

              <div className="reminder-note">
                <h3>Admin Review Required</h3>
                <p>
                  Doctor and NGO accounts should not be activated before
                  verifying license, documents, and contact information.
                </p>
              </div>

              <button className="message-btn">
                <span className="material-symbols-outlined">download</span>
                Export Pending List
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminJoinRequests;
