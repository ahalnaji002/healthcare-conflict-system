import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function NgoDashboard() {
  return (
    <div className="dashboard-page">
      <aside className="sidebar ngo-sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <span className="material-symbols-outlined">
              volunteer_activism
            </span>
          </div>

          <div>
            <h2>War Injuries Care</h2>
            <p>NGO Portal</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/ngo-dashboard" className="active">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>

          <Link to="/ngo-triage">
            <span className="material-symbols-outlined">rule</span>
            Triage Requests
          </Link>

          <Link to="/ngo-emergency">
            <span className="material-symbols-outlined">emergency</span>
            Emergency Coordination
          </Link>

          <Link to="/ngo-resources">
            <span className="material-symbols-outlined">inventory_2</span>
            Resource Allocation
          </Link>

          <Link to="/ngo-reports">
            <span className="material-symbols-outlined">analytics</span>
            Analytics Reports
          </Link>

          <Link to="/ngo-profile">
            <span className="material-symbols-outlined">business</span>
            NGO Profile
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
            <h1>NGO Dashboard</h1>
            <p>
              Manage assistance requests, emergency needs, and available
              resources.
            </p>
          </div>

          <div className="topbar-actions">
            <button className="emergency-action">
              <span className="material-symbols-outlined">emergency</span>
              Emergency Requests
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
              <p>Critical Requests</p>
              <h2>18</h2>
            </div>
            <span className="material-symbols-outlined">priority_high</span>
          </div>

          <div className="stat-box orange">
            <div>
              <p>Pending Requests</p>
              <h2>42</h2>
            </div>
            <span className="material-symbols-outlined">hourglass_top</span>
          </div>

          <div className="stat-box green">
            <div>
              <p>Approved Support</p>
              <h2>96</h2>
            </div>
            <span className="material-symbols-outlined">check_circle</span>
          </div>

          <div className="stat-box blue">
            <div>
              <p>Available Resources</p>
              <h2>12</h2>
            </div>
            <span className="material-symbols-outlined">inventory_2</span>
          </div>
        </section>

        <section className="ngo-layout">
          <div className="content-left">
            <div className="panel" id="triage">
              <div className="panel-header">
                <div>
                  <h2>Latest Assistance Requests</h2>
                  <p>Requests are sorted by urgency and patient need.</p>
                </div>

                <Link to="/ngo-triage">
                  <button>View All</button>
                </Link>
              </div>

              <div className="ngo-request-table">
                <div className="ngo-request-row ngo-request-head">
                  <span>Patient</span>
                  <span>Need</span>
                  <span>Location</span>
                  <span>Priority</span>
                  <span>Status</span>
                  <span>Action</span>
                </div>

                <div className="ngo-request-row">
                  <div className="patient-cell">
                    <div className="patient-avatar">A</div>
                    <div>
                      <h3>Ahmed Hashem</h3>
                      <p>PT-2026-001</p>
                    </div>
                  </div>

                  <span>Medical Supplies</span>
                  <span>Gaza</span>
                  <span className="priority-badge critical">Critical</span>
                  <span className="status pending">Under Review</span>
                  <button className="mini-btn">Review</button>
                </div>

                <div className="ngo-request-row">
                  <div className="patient-cell">
                    <div className="patient-avatar">M</div>
                    <div>
                      <h3>Mohammed Ali</h3>
                      <p>PT-2026-014</p>
                    </div>
                  </div>

                  <span>Transportation</span>
                  <span>Rafah</span>
                  <span className="priority-badge medium">Medium</span>
                  <span className="status pending">Pending</span>
                  <button className="mini-btn">Review</button>
                </div>

                <div className="ngo-request-row">
                  <div className="patient-cell">
                    <div className="patient-avatar">S</div>
                    <div>
                      <h3>Sara Nabil</h3>
                      <p>PT-2026-022</p>
                    </div>
                  </div>

                  <span>Financial Aid</span>
                  <span>Khan Younis</span>
                  <span className="priority-badge low">Low</span>
                  <span className="status taken">Approved</span>
                  <button className="mini-btn">Details</button>
                </div>
              </div>
            </div>

            <div className="panel" id="resources">
              <div className="panel-header">
                <div>
                  <h2>Resource Allocation</h2>
                  <p>
                    Available support categories and current stock capacity.
                  </p>
                </div>

                <Link to="/ngo-resources">
                  <button>Update Stock</button>
                </Link>
              </div>

              <div className="resource-grid">
                <div className="resource-card">
                  <span className="material-symbols-outlined">
                    medical_services
                  </span>
                  <div>
                    <h3>Medical Kits</h3>
                    <p>128 available kits</p>
                  </div>
                </div>

                <div className="resource-card">
                  <span className="material-symbols-outlined">
                    directions_car
                  </span>
                  <div>
                    <h3>Transport Support</h3>
                    <p>6 active vehicles</p>
                  </div>
                </div>

                <div className="resource-card">
                  <span className="material-symbols-outlined">payments</span>
                  <div>
                    <h3>Financial Aid</h3>
                    <p>34 pending allocations</p>
                  </div>
                </div>

                <div className="resource-card">
                  <span className="material-symbols-outlined">
                    wheelchair_pickup
                  </span>
                  <div>
                    <h3>Mobility Support</h3>
                    <p>18 devices available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-right">
            <div className="panel progress-panel">
              <h2>Support Completion</h2>

              <div className="progress-circle">
                <span>81%</span>
              </div>

              <p>
                Most approved assistance requests are being delivered on time
                with active NGO coordination.
              </p>
            </div>

            <div className="panel" id="emergency">
              <h2>Emergency Coordination</h2>

              <div className="alert-card critical-alert">
                <span className="material-symbols-outlined">emergency</span>
                <div>
                  <h3>Urgent Medical Kit</h3>
                  <p>Critical request from Gaza needs immediate review.</p>
                </div>
              </div>

              <div className="alert-card">
                <span className="material-symbols-outlined">
                  local_hospital
                </span>
                <div>
                  <h3>Hospital Transport</h3>
                  <p>Patient requires transport to rehabilitation center.</p>
                </div>
              </div>
            </div>

            <div className="panel" id="reports">
              <h2>Analytics Snapshot</h2>

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
              <h2>NGO Account</h2>

              <div className="doctor-info">
                <div className="doctor-avatar">
                  <span className="material-symbols-outlined">business</span>
                </div>

                <div>
                  <h3>Hope Relief NGO</h3>
                  <p>Medical & Humanitarian Support</p>
                </div>
              </div>

              <Link to="/ngo-profile">
                <button className="message-btn">
                  <span className="material-symbols-outlined">settings</span>
                  Manage Profile
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NgoDashboard;
