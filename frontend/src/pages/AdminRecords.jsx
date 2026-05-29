import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function AdminRecords() {
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

          <Link to="/admin-join-requests">
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

          <Link to="/admin-records" className="active">
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
            <h1>System Records Management</h1>
            <p>
              Manage patient records, medical files, assistance data, and system
              storage overview.
            </p>
          </div>

          <div className="topbar-actions">
            <button className="emergency-action">
              <span className="material-symbols-outlined">backup</span>
              Backup Records
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
              <p>Patient Records</p>
              <h2>984</h2>
            </div>
            <span className="material-symbols-outlined">folder_shared</span>
          </div>

          <div className="stat-box green">
            <div>
              <p>Medical Files</p>
              <h2>2,431</h2>
            </div>
            <span className="material-symbols-outlined">description</span>
          </div>

          <div className="stat-box orange">
            <div>
              <p>Assistance Records</p>
              <h2>386</h2>
            </div>
            <span className="material-symbols-outlined">
              volunteer_activism
            </span>
          </div>

          <div className="stat-box red">
            <div>
              <p>Flagged Records</p>
              <h2>8</h2>
            </div>
            <span className="material-symbols-outlined">flag</span>
          </div>
        </section>

        <section className="records-layout">
          <div className="content-left">
            <div className="panel">
              <div className="panel-header admin-users-toolbar">
                <div>
                  <h2>Records Database</h2>
                  <p>Search and monitor important system records.</p>
                </div>

                <div className="table-actions">
                  <div className="search-box">
                    <span className="material-symbols-outlined">search</span>
                    <input type="text" placeholder="Search records..." />
                  </div>

                  <select className="filter-select">
                    <option>All Records</option>
                    <option>Patient Records</option>
                    <option>Medical Files</option>
                    <option>Assistance Requests</option>
                    <option>System Logs</option>
                  </select>
                </div>
              </div>

              <div className="records-table">
                <div className="records-row records-head">
                  <span>Record</span>
                  <span>Type</span>
                  <span>Owner</span>
                  <span>Last Updated</span>
                  <span>Status</span>
                  <span>Action</span>
                </div>

                <div className="records-row">
                  <div className="record-cell">
                    <span className="material-symbols-outlined">
                      folder_shared
                    </span>
                    <div>
                      <h3>PT-2026-001 Medical Record</h3>
                      <p>Lower limb injury follow-up record.</p>
                    </div>
                  </div>

                  <span>Patient Record</span>
                  <span>Ahmed Hashem</span>
                  <span>Today</span>
                  <span className="status taken">Updated</span>

                  <div className="row-actions">
                    <button className="mini-btn">Open</button>
                    <button className="icon-mini-btn">
                      <span className="material-symbols-outlined">
                        download
                      </span>
                    </button>
                  </div>
                </div>

                <div className="records-row">
                  <div className="record-cell">
                    <span className="material-symbols-outlined">
                      description
                    </span>
                    <div>
                      <h3>Wound Photo Report</h3>
                      <p>Photo review uploaded by patient.</p>
                    </div>
                  </div>

                  <span>Medical File</span>
                  <span>Dr. Samer Khaled</span>
                  <span>Yesterday</span>
                  <span className="status taken">Reviewed</span>

                  <div className="row-actions">
                    <button className="mini-btn">Open</button>
                    <button className="icon-mini-btn">
                      <span className="material-symbols-outlined">
                        download
                      </span>
                    </button>
                  </div>
                </div>

                <div className="records-row warning-log-row">
                  <div className="record-cell">
                    <span className="material-symbols-outlined">flag</span>
                    <div>
                      <h3>Assistance Request AR-884</h3>
                      <p>Critical mobility support request not assigned.</p>
                    </div>
                  </div>

                  <span>Assistance</span>
                  <span>Rami Saleh</span>
                  <span>Today</span>
                  <span className="status pending">Flagged</span>

                  <div className="row-actions">
                    <button className="mini-btn">Review</button>
                    <button className="icon-mini-btn danger-icon-btn">
                      <span className="material-symbols-outlined">
                        priority_high
                      </span>
                    </button>
                  </div>
                </div>

                <div className="records-row">
                  <div className="record-cell">
                    <span className="material-symbols-outlined">history</span>
                    <div>
                      <h3>Security Log Export</h3>
                      <p>Admin exported activity logs report.</p>
                    </div>
                  </div>

                  <span>System Log</span>
                  <span>Admin User</span>
                  <span>3 hours ago</span>
                  <span className="status taken">Archived</span>

                  <div className="row-actions">
                    <button className="mini-btn">Open</button>
                    <button className="icon-mini-btn">
                      <span className="material-symbols-outlined">
                        download
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Record Categories</h2>
                  <p>Database distribution by stored record type.</p>
                </div>
              </div>

              <div className="record-category-grid">
                <div className="record-category-card">
                  <span className="material-symbols-outlined">
                    personal_injury
                  </span>
                  <div>
                    <h3>Patient Profiles</h3>
                    <p>Personal and medical identity data.</p>
                  </div>
                  <strong>984</strong>
                </div>

                <div className="record-category-card">
                  <span className="material-symbols-outlined">
                    clinical_notes
                  </span>
                  <div>
                    <h3>Treatment Plans</h3>
                    <p>Doctor updates and medical instructions.</p>
                  </div>
                  <strong>721</strong>
                </div>

                <div className="record-category-card">
                  <span className="material-symbols-outlined">
                    volunteer_activism
                  </span>
                  <div>
                    <h3>Assistance Requests</h3>
                    <p>NGO support and request tracking.</p>
                  </div>
                  <strong>386</strong>
                </div>

                <div className="record-category-card">
                  <span className="material-symbols-outlined">history</span>
                  <div>
                    <h3>Activity Logs</h3>
                    <p>System access and sensitive actions.</p>
                  </div>
                  <strong>8.2K</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="content-right">
            <div className="panel progress-panel">
              <h2>Storage Health</h2>

              <div className="progress-circle">
                <span>88%</span>
              </div>

              <p>
                Records storage is stable. Regular backups are recommended for
                medical and assistance data.
              </p>
            </div>

            <div className="panel">
              <h2>Data Integrity</h2>

              <div className="security-list">
                <div className="security-item">
                  <span className="material-symbols-outlined">
                    verified_user
                  </span>
                  <div>
                    <h3>Encrypted Data</h3>
                    <p>Medical records are stored with protected access.</p>
                  </div>
                </div>

                <div className="security-item">
                  <span className="material-symbols-outlined">backup</span>
                  <div>
                    <h3>Last Backup</h3>
                    <p>System backup completed 6 hours ago.</p>
                  </div>
                </div>

                <div className="security-item">
                  <span className="material-symbols-outlined">sync</span>
                  <div>
                    <h3>Data Sync</h3>
                    <p>All active records are synchronized successfully.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>Flagged Records</h2>

              <div className="alert-card critical-alert">
                <span className="material-symbols-outlined">flag</span>
                <div>
                  <h3>8 records need review</h3>
                  <p>Some records are missing updates or assignment details.</p>
                </div>
              </div>

              <div className="alert-card">
                <span className="material-symbols-outlined">description</span>
                <div>
                  <h3>Missing document</h3>
                  <p>One NGO verification file requires re-upload.</p>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>Record Actions</h2>

              <div className="doctor-actions-grid">
                <button className="message-btn">
                  <span className="material-symbols-outlined">backup</span>
                  Run Backup
                </button>

                <button className="message-btn secondary-message-btn">
                  <span className="material-symbols-outlined">download</span>
                  Export Records
                </button>

                <button className="message-btn secondary-message-btn">
                  <span className="material-symbols-outlined">sync</span>
                  Sync Database
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminRecords;
