import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function AdminLogs() {
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

          <Link to="/admin-logs" className="active">
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
            <h1>System Activity Logs</h1>
            <p>
              Monitor sensitive actions, access events, and security activity.
            </p>
          </div>

          <div className="topbar-actions">
            <button className="emergency-action">
              <span className="material-symbols-outlined">security</span>
              Security Alerts
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
              <p>Total Logs Today</p>
              <h2>642</h2>
            </div>
            <span className="material-symbols-outlined">history</span>
          </div>

          <div className="stat-box green">
            <div>
              <p>Successful Logins</p>
              <h2>518</h2>
            </div>
            <span className="material-symbols-outlined">login</span>
          </div>

          <div className="stat-box orange">
            <div>
              <p>Admin Actions</p>
              <h2>76</h2>
            </div>
            <span className="material-symbols-outlined">
              admin_panel_settings
            </span>
          </div>

          <div className="stat-box red">
            <div>
              <p>Security Warnings</p>
              <h2>4</h2>
            </div>
            <span className="material-symbols-outlined">warning</span>
          </div>
        </section>

        <section className="logs-layout">
          <div className="content-left">
            <div className="panel">
              <div className="panel-header admin-users-toolbar">
                <div>
                  <h2>Activity Log Table</h2>
                  <p>Track important activities across the platform.</p>
                </div>

                <div className="table-actions">
                  <div className="search-box">
                    <span className="material-symbols-outlined">search</span>
                    <input type="text" placeholder="Search logs..." />
                  </div>

                  <select className="filter-select">
                    <option>All Types</option>
                    <option>Login</option>
                    <option>Data Access</option>
                    <option>Admin Action</option>
                    <option>Security Alert</option>
                  </select>

                  <select className="filter-select">
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                </div>
              </div>

              <div className="logs-table">
                <div className="logs-row logs-head">
                  <span>Event</span>
                  <span>User</span>
                  <span>Role</span>
                  <span>Time</span>
                  <span>Risk</span>
                  <span>Action</span>
                </div>

                <div className="logs-row">
                  <div className="log-event-cell">
                    <span className="material-symbols-outlined">login</span>
                    <div>
                      <h3>Successful login</h3>
                      <p>User accessed the doctor portal.</p>
                    </div>
                  </div>

                  <span>Dr. Samer Khaled</span>
                  <span className="role-pill doctor-role">Doctor</span>
                  <span>5 min ago</span>
                  <span className="status taken">Low</span>

                  <button className="mini-btn">Details</button>
                </div>

                <div className="logs-row">
                  <div className="log-event-cell">
                    <span className="material-symbols-outlined">
                      clinical_notes
                    </span>
                    <div>
                      <h3>Patient record opened</h3>
                      <p>Medical record PT-2026-001 was accessed.</p>
                    </div>
                  </div>

                  <span>Dr. Samer Khaled</span>
                  <span className="role-pill doctor-role">Doctor</span>
                  <span>12 min ago</span>
                  <span className="status taken">Low</span>

                  <button className="mini-btn">Details</button>
                </div>

                <div className="logs-row warning-log-row">
                  <div className="log-event-cell">
                    <span className="material-symbols-outlined">warning</span>
                    <div>
                      <h3>Failed login attempts</h3>
                      <p>Multiple failed login attempts detected.</p>
                    </div>
                  </div>

                  <span>Unknown</span>
                  <span className="role-pill admin-role">Security</span>
                  <span>1 hour ago</span>
                  <span className="status pending">Medium</span>

                  <button className="mini-btn">Investigate</button>
                </div>

                <div className="logs-row">
                  <div className="log-event-cell">
                    <span className="material-symbols-outlined">
                      how_to_reg
                    </span>
                    <div>
                      <h3>Join request approved</h3>
                      <p>Admin approved a new NGO account.</p>
                    </div>
                  </div>

                  <span>Admin User</span>
                  <span className="role-pill admin-role">Admin</span>
                  <span>2 hours ago</span>
                  <span className="status taken">Low</span>

                  <button className="mini-btn">Details</button>
                </div>

                <div className="logs-row danger-log-row">
                  <div className="log-event-cell">
                    <span className="material-symbols-outlined">
                      shield_lock
                    </span>
                    <div>
                      <h3>Sensitive data export</h3>
                      <p>A report export was requested by admin.</p>
                    </div>
                  </div>

                  <span>Admin User</span>
                  <span className="role-pill admin-role">Admin</span>
                  <span>3 hours ago</span>
                  <span className="priority-badge critical">High</span>

                  <button className="mini-btn">Review</button>
                </div>
              </div>
            </div>
          </div>

          <div className="content-right">
            <div className="panel progress-panel">
              <h2>System Safety Score</h2>

              <div className="progress-circle">
                <span>94%</span>
              </div>

              <p>
                The platform is stable. Continue monitoring failed login
                attempts and sensitive data export actions.
              </p>
            </div>

            <div className="panel">
              <h2>Security Alerts</h2>

              <div className="alert-card critical-alert">
                <span className="material-symbols-outlined">warning</span>
                <div>
                  <h3>Multiple failed logins</h3>
                  <p>Detected from an unknown source within the last hour.</p>
                </div>
              </div>

              <div className="alert-card">
                <span className="material-symbols-outlined">download</span>
                <div>
                  <h3>Data export request</h3>
                  <p>Admin exported assistance report for review.</p>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>Log Categories</h2>

              <div className="analytics-list">
                <div className="analytics-item">
                  <span>Login Events</span>
                  <strong>58%</strong>
                </div>

                <div className="analytics-item">
                  <span>Data Access</span>
                  <strong>24%</strong>
                </div>

                <div className="analytics-item">
                  <span>Admin Actions</span>
                  <strong>12%</strong>
                </div>

                <div className="analytics-item">
                  <span>Security Alerts</span>
                  <strong>6%</strong>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>Admin Actions</h2>

              <div className="doctor-actions-grid">
                <button className="message-btn">
                  <span className="material-symbols-outlined">download</span>
                  Export Logs
                </button>

                <button className="message-btn secondary-message-btn">
                  <span className="material-symbols-outlined">filter_alt</span>
                  Apply Filters
                </button>

                <button className="message-btn secondary-message-btn">
                  <span className="material-symbols-outlined">
                    delete_sweep
                  </span>
                  Clear Old Logs
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminLogs;
