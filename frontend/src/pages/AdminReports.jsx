import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function AdminReports() {
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

          <Link to="/admin-records">
            <span className="material-symbols-outlined">database</span>
            System Records
          </Link>

          <Link to="/admin-reports" className="active">
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
            <h1>Reports Analytics</h1>
            <p>
              Generate system reports for users, medical cases, NGO support, and
              security activity.
            </p>
          </div>

          <div className="topbar-actions">
            <button className="emergency-action">
              <span className="material-symbols-outlined">download</span>
              Export Report
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

          <div className="stat-box green">
            <div>
              <p>Resolved Cases</p>
              <h2>219</h2>
            </div>
            <span className="material-symbols-outlined">task_alt</span>
          </div>

          <div className="stat-box orange">
            <div>
              <p>Pending Requests</p>
              <h2>74</h2>
            </div>
            <span className="material-symbols-outlined">hourglass_top</span>
          </div>

          <div className="stat-box red">
            <div>
              <p>Security Alerts</p>
              <h2>4</h2>
            </div>
            <span className="material-symbols-outlined">warning</span>
          </div>
        </section>

        <section className="admin-reports-layout">
          <div className="content-left">
            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>System Growth Overview</h2>
                  <p>
                    Monthly growth across patients, doctors, NGOs, and admins.
                  </p>
                </div>

                <button>Monthly</button>
              </div>

              <div className="progress-chart report-vertical-chart">
                <div className="chart-bar" style={{ height: "42%" }}>
                  <span>Feb</span>
                </div>

                <div className="chart-bar" style={{ height: "58%" }}>
                  <span>Mar</span>
                </div>

                <div className="chart-bar" style={{ height: "74%" }}>
                  <span>Apr</span>
                </div>

                <div className="chart-bar active-bar" style={{ height: "88%" }}>
                  <span>May</span>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Users by Role</h2>
                  <p>Distribution of registered users in the platform.</p>
                </div>
              </div>

              <div className="report-chart-card">
                <div className="horizontal-bar-item">
                  <div className="bar-label">
                    <span>Patients</span>
                    <strong>78%</strong>
                  </div>
                  <div className="horizontal-bar">
                    <span style={{ width: "78%" }}></span>
                  </div>
                </div>

                <div className="horizontal-bar-item">
                  <div className="bar-label">
                    <span>Doctors</span>
                    <strong>11%</strong>
                  </div>
                  <div className="horizontal-bar">
                    <span style={{ width: "11%" }}></span>
                  </div>
                </div>

                <div className="horizontal-bar-item">
                  <div className="bar-label">
                    <span>NGOs</span>
                    <strong>7%</strong>
                  </div>
                  <div className="horizontal-bar">
                    <span style={{ width: "7%" }}></span>
                  </div>
                </div>

                <div className="horizontal-bar-item">
                  <div className="bar-label">
                    <span>Admins</span>
                    <strong>4%</strong>
                  </div>
                  <div className="horizontal-bar">
                    <span style={{ width: "4%" }}></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Assistance Request Analytics</h2>
                  <p>Humanitarian support requests grouped by category.</p>
                </div>
              </div>

              <div className="location-report-grid">
                <div className="location-report-card critical-location">
                  <h3>Medical Supplies</h3>
                  <p>46% of requests</p>
                  <span>Highest demand</span>
                </div>

                <div className="location-report-card">
                  <h3>Transportation</h3>
                  <p>24% of requests</p>
                  <span>Medium demand</span>
                </div>

                <div className="location-report-card">
                  <h3>Financial Aid</h3>
                  <p>18% of requests</p>
                  <span>Stable demand</span>
                </div>

                <div className="location-report-card">
                  <h3>Mobility Support</h3>
                  <p>12% of requests</p>
                  <span>Growing demand</span>
                </div>
              </div>
            </div>
          </div>

          <div className="content-right">
            <div className="panel progress-panel">
              <h2>System Performance</h2>

              <div className="progress-circle">
                <span>94%</span>
              </div>

              <p>
                Overall platform performance is stable with strong user activity
                and consistent request processing.
              </p>
            </div>

            <div className="panel">
              <h2>Key Insights</h2>

              <div className="insight-list">
                <div className="insight-item">
                  <span className="material-symbols-outlined">trending_up</span>
                  <div>
                    <h3>Patient usage increased</h3>
                    <p>Patient dashboard activity increased this month.</p>
                  </div>
                </div>

                <div className="insight-item">
                  <span className="material-symbols-outlined">
                    medical_services
                  </span>
                  <div>
                    <h3>Medical supplies demand is high</h3>
                    <p>
                      Medical supplies remain the most requested support type.
                    </p>
                  </div>
                </div>

                <div className="insight-item">
                  <span className="material-symbols-outlined">security</span>
                  <div>
                    <h3>Security alerts are low</h3>
                    <p>Only a few suspicious login attempts were detected.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>Report Generator</h2>

              <div className="report-generator-form">
                <div className="treatment-field">
                  <label>Report Type</label>
                  <select defaultValue="system">
                    <option value="system">System Overview</option>
                    <option value="users">Users Report</option>
                    <option value="assistance">Assistance Report</option>
                    <option value="security">Security Report</option>
                  </select>
                </div>

                <div className="treatment-field">
                  <label>Date Range</label>
                  <select defaultValue="monthly">
                    <option value="weekly">This Week</option>
                    <option value="monthly">This Month</option>
                    <option value="yearly">This Year</option>
                  </select>
                </div>

                <button className="message-btn">
                  <span className="material-symbols-outlined">download</span>
                  Generate Report
                </button>
              </div>
            </div>

            <div className="panel">
              <h2>Quick Actions</h2>

              <div className="doctor-actions-grid">
                <button className="message-btn secondary-message-btn">
                  <span className="material-symbols-outlined">print</span>
                  Print Summary
                </button>

                <button className="message-btn secondary-message-btn">
                  <span className="material-symbols-outlined">share</span>
                  Share Analytics
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminReports;
