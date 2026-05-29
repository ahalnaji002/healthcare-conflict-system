import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function AdminDashboard() {
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
          <Link to="/admin-dashboard" className="active">
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
            <h1>Admin Dashboard</h1>
            <p>
              Monitor users, join requests, assistance cases, and system
              activity.
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
              <p>Total Users</p>
              <h2>1,248</h2>
            </div>
            <span className="material-symbols-outlined">groups</span>
          </div>

          <div className="stat-box orange">
            <div>
              <p>Pending Join Requests</p>
              <h2>23</h2>
            </div>
            <span className="material-symbols-outlined">how_to_reg</span>
          </div>

          <div className="stat-box green">
            <div>
              <p>Active Cases</p>
              <h2>386</h2>
            </div>
            <span className="material-symbols-outlined">medical_services</span>
          </div>

          <div className="stat-box red">
            <div>
              <p>Security Alerts</p>
              <h2>4</h2>
            </div>
            <span className="material-symbols-outlined">warning</span>
          </div>
        </section>

        <section className="admin-layout">
          <div className="content-left">
            <div className="panel" id="users">
              <div className="panel-header">
                <div>
                  <h2>Users Overview</h2>
                  <p>System users grouped by role and current activity.</p>
                </div>

                <Link to="/admin-users">
                  <button>Manage Users</button>
                </Link>
              </div>

              <div className="admin-role-grid">
                <div className="admin-role-card">
                  <span className="material-symbols-outlined">
                    personal_injury
                  </span>
                  <div>
                    <h3>Patients</h3>
                    <p>984 registered patients</p>
                  </div>
                  <strong>78%</strong>
                </div>

                <div className="admin-role-card">
                  <span className="material-symbols-outlined">stethoscope</span>
                  <div>
                    <h3>Doctors</h3>
                    <p>142 approved doctors</p>
                  </div>
                  <strong>11%</strong>
                </div>

                <div className="admin-role-card">
                  <span className="material-symbols-outlined">
                    volunteer_activism
                  </span>
                  <div>
                    <h3>NGOs</h3>
                    <p>86 active organizations</p>
                  </div>
                  <strong>7%</strong>
                </div>

                <div className="admin-role-card">
                  <span className="material-symbols-outlined">
                    admin_panel_settings
                  </span>
                  <div>
                    <h3>Admins</h3>
                    <p>36 system managers</p>
                  </div>
                  <strong>4%</strong>
                </div>
              </div>
            </div>

            <div className="panel" id="join-requests">
              <div className="panel-header">
                <div>
                  <h2>Pending Join Requests</h2>
                  <p>Doctors and NGOs waiting for admin approval.</p>
                </div>

                <Link to="/admin-join-requests">
                  <button>View All</button>
                </Link>
              </div>

              <div className="admin-table">
                <div className="admin-row admin-head">
                  <span>Applicant</span>
                  <span>Type</span>
                  <span>Specialization</span>
                  <span>Status</span>
                  <span>Action</span>
                </div>

                <div className="admin-row">
                  <div className="patient-cell">
                    <div className="patient-avatar">D</div>
                    <div>
                      <h3>Dr. Lina Omar</h3>
                      <p>lina.omar@example.com</p>
                    </div>
                  </div>

                  <span>Doctor</span>
                  <span>Surgery</span>
                  <span className="status pending">Pending</span>

                  <div className="row-actions">
                    <button className="mini-btn">Approve</button>
                    <button className="icon-mini-btn">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                </div>

                <div className="admin-row">
                  <div className="patient-cell">
                    <div className="patient-avatar">N</div>
                    <div>
                      <h3>Care Bridge NGO</h3>
                      <p>contact@carebridge.org</p>
                    </div>
                  </div>

                  <span>NGO</span>
                  <span>Medical Aid</span>
                  <span className="status pending">Pending</span>

                  <div className="row-actions">
                    <button className="mini-btn">Approve</button>
                    <button className="icon-mini-btn">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel" id="assistance">
              <div className="panel-header">
                <div>
                  <h2>Assistance Requests Summary</h2>
                  <p>Overview of humanitarian and medical support requests.</p>
                </div>
              </div>

              <div className="report-chart-card">
                <div className="horizontal-bar-item">
                  <div className="bar-label">
                    <span>Medical Supplies</span>
                    <strong>46%</strong>
                  </div>
                  <div className="horizontal-bar">
                    <span style={{ width: "46%" }}></span>
                  </div>
                </div>

                <div className="horizontal-bar-item">
                  <div className="bar-label">
                    <span>Transportation</span>
                    <strong>24%</strong>
                  </div>
                  <div className="horizontal-bar">
                    <span style={{ width: "24%" }}></span>
                  </div>
                </div>

                <div className="horizontal-bar-item">
                  <div className="bar-label">
                    <span>Financial Aid</span>
                    <strong>18%</strong>
                  </div>
                  <div className="horizontal-bar">
                    <span style={{ width: "18%" }}></span>
                  </div>
                </div>

                <div className="horizontal-bar-item">
                  <div className="bar-label">
                    <span>Mobility Support</span>
                    <strong>12%</strong>
                  </div>
                  <div className="horizontal-bar">
                    <span style={{ width: "12%" }}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-right">
            <div className="panel progress-panel">
              <h2>System Health</h2>

              <div className="progress-circle">
                <span>94%</span>
              </div>

              <p>
                System activity is stable with active user growth and normal
                request processing.
              </p>
            </div>

            <div className="panel" id="logs">
              <h2>Recent Activity Logs</h2>

              <div className="activity-log-list">
                <div className="activity-log-item">
                  <span className="material-symbols-outlined">login</span>
                  <div>
                    <h3>Doctor login</h3>
                    <p>Dr. Samer Khaled accessed patient records.</p>
                    <small>5 minutes ago</small>
                  </div>
                </div>

                <div className="activity-log-item">
                  <span className="material-symbols-outlined">how_to_reg</span>
                  <div>
                    <h3>Join request submitted</h3>
                    <p>New NGO submitted verification documents.</p>
                    <small>20 minutes ago</small>
                  </div>
                </div>

                <div className="activity-log-item warning-log">
                  <span className="material-symbols-outlined">warning</span>
                  <div>
                    <h3>Security alert</h3>
                    <p>Multiple failed login attempts detected.</p>
                    <small>1 hour ago</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel" id="records">
              <h2>System Records</h2>

              <div className="security-list">
                <div className="security-item">
                  <span className="material-symbols-outlined">database</span>
                  <div>
                    <h3>Patient Records</h3>
                    <p>984 records stored securely.</p>
                  </div>
                </div>

                <div className="security-item">
                  <span className="material-symbols-outlined">shield_lock</span>
                  <div>
                    <h3>Data Protection</h3>
                    <p>Encrypted access controls enabled.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel" id="settings">
              <h2>Quick Admin Actions</h2>

              <div className="doctor-actions-grid">
                <button className="message-btn">
                  <span className="material-symbols-outlined">
                    manage_accounts
                  </span>
                  Manage Users
                </button>

                <button className="message-btn secondary-message-btn">
                  <span className="material-symbols-outlined">analytics</span>
                  Generate Report
                </button>

                <Link to="/admin-settings">
                  <button className="message-btn secondary-message-btn">
                    <span className="material-symbols-outlined">settings</span>
                    System Settings
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
