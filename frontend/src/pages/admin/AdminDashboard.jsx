import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/dashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentRequests, setRecentRequests] = useState([]);

  const systemHealth = stats
    ? Math.max(
        0,
        100 - stats.security_alerts * 10 - stats.pending_join_requests * 2,
      )
    : 0;

  const [animatedHealth, setAnimatedHealth] = useState(0);

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      const speed = Math.max(1, Math.ceil((systemHealth - current) / 12));

      current += speed;

      if (current >= systemHealth) {
        current = systemHealth;
        clearInterval(interval);
      }

      setAnimatedHealth(current);
    }, 25);

    return () => clearInterval(interval);
  }, [systemHealth]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) return;

        setStats(data.stats);
        setRecentRequests(data.recentRequests);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboard();
  }, [token]);

  return (
    <>
      <section className="stats-grid">
        <div className="stat-box blue">
          <div>
            <p>Total Users</p>
            <h2>{stats?.total_users ?? 0}</h2>{" "}
          </div>
          <span className="material-symbols-outlined">groups</span>
        </div>

        <div className="stat-box orange">
          <div>
            <p>Pending Join Requests</p>
            <h2>{stats?.pending_join_requests ?? 0}</h2>{" "}
          </div>
          <span className="material-symbols-outlined">how_to_reg</span>
        </div>

        <div className="stat-box green">
          <div>
            <p>Active Cases</p>
            <h2>{stats?.active_cases ?? 0}</h2>{" "}
          </div>
          <span className="material-symbols-outlined">medical_services</span>
        </div>

        <div className="stat-box red">
          <div>
            <p>Security Alerts</p>
            <h2>{stats?.security_alerts ?? 0}</h2>{" "}
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
                  <p>{stats?.total_patients ?? 0} registered patients</p>
                </div>

                <strong>
                  {stats?.total_users
                    ? Math.round(
                        (stats.total_patients / stats.total_users) * 100,
                      )
                    : 0}
                  %
                </strong>
              </div>

              <div className="admin-role-card">
                <span className="material-symbols-outlined">stethoscope</span>

                <div>
                  <h3>Doctors</h3>
                  <p>{stats?.total_doctors ?? 0} approved doctors</p>
                </div>

                <strong>
                  {stats?.total_users
                    ? Math.round(
                        (stats.total_doctors / stats.total_users) * 100,
                      )
                    : 0}
                  %
                </strong>
              </div>

              <div className="admin-role-card">
                <span className="material-symbols-outlined">
                  volunteer_activism
                </span>

                <div>
                  <h3>NGOs</h3>
                  <p>{stats?.total_ngos ?? 0} active organizations</p>
                </div>

                <strong>
                  {stats?.total_users
                    ? Math.round((stats.total_ngos / stats.total_users) * 100)
                    : 0}
                  %
                </strong>
              </div>

              <div className="admin-role-card">
                <span className="material-symbols-outlined">
                  admin_panel_settings
                </span>

                <div>
                  <h3>Admins</h3>
                  <p>{stats?.total_admins ?? 0} system managers</p>
                </div>

                <strong>
                  {stats?.total_users
                    ? Math.round((stats.total_admins / stats.total_users) * 100)
                    : 0}
                  %
                </strong>
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
              {recentRequests.length === 0 ? (
                <div className="admin-row">
                  <span>No pending join requests found.</span>
                </div>
              ) : (
                recentRequests.map((request) => (
                  <div className="admin-row" key={request.join_request_id}>
                    <div className="patient-cell">
                      <div className="patient-avatar">
                        {request.name?.charAt(0).toUpperCase() || "?"}
                      </div>

                      <div>
                        <h3>{request.name}</h3>
                        <p>{request.email}</p>
                      </div>
                    </div>

                    <span>
                      {request.request_type === "doctor" ? "Doctor" : "NGO"}
                    </span>
                    <span>{request.specialty || "N/A"}</span>
                    <span className="status pending">Pending</span>

                    <div className="row-actions">
                      <button className="mini-btn">Approve</button>
                      <button className="icon-mini-btn">
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
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

            <div
              className="progress-circle"
              style={{ "--progress": `${animatedHealth}%` }}
            >
              <span className="health-percent">{animatedHealth}%</span>
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
              <Link to="/admin-users">
                <button className="message-btn">
                  <span className="material-symbols-outlined">
                    manage_accounts
                  </span>
                  Manage Users
                </button>
              </Link>

              <Link to="/admin-reports">
                <button className="message-btn secondary-message-btn">
                  <span className="material-symbols-outlined">analytics</span>
                  Generate Report
                </button>
              </Link>

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
    </>
  );
}

export default AdminDashboard;
