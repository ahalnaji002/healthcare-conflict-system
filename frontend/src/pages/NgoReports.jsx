import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function NgoReports() {
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
          <Link to="/ngo-dashboard">
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

          <Link to="/ngo-reports" className="active">
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
            <h1>Analytics Reports</h1>
            <p>
              Analyze assistance requests, resource usage, and support
              performance.
            </p>
          </div>

          <div className="topbar-actions">
            <button className="emergency-action">
              <span className="material-symbols-outlined">download</span>
              Export Report
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
              <p>Total Requests</p>
              <h2>248</h2>
            </div>
            <span className="material-symbols-outlined">request_page</span>
          </div>

          <div className="stat-box green">
            <div>
              <p>Resolved</p>
              <h2>196</h2>
            </div>
            <span className="material-symbols-outlined">task_alt</span>
          </div>

          <div className="stat-box orange">
            <div>
              <p>Pending</p>
              <h2>42</h2>
            </div>
            <span className="material-symbols-outlined">hourglass_top</span>
          </div>

          <div className="stat-box red">
            <div>
              <p>Critical</p>
              <h2>18</h2>
            </div>
            <span className="material-symbols-outlined">priority_high</span>
          </div>
        </section>

        <section className="reports-layout">
          <div className="content-left">
            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Requests by Category</h2>
                  <p>Distribution of support requests across service types.</p>
                </div>

                <button>Monthly</button>
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

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Monthly Support Performance</h2>
                  <p>
                    Number of resolved requests during the last four months.
                  </p>
                </div>
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
                <div className="chart-bar active-bar" style={{ height: "86%" }}>
                  <span>May</span>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Location-Based Needs</h2>
                  <p>High-demand areas based on incoming requests.</p>
                </div>
              </div>

              <div className="location-report-grid">
                <div className="location-report-card critical-location">
                  <h3>Gaza</h3>
                  <p>86 requests</p>
                  <span>High demand</span>
                </div>

                <div className="location-report-card">
                  <h3>Rafah</h3>
                  <p>54 requests</p>
                  <span>Medium demand</span>
                </div>

                <div className="location-report-card">
                  <h3>Khan Younis</h3>
                  <p>37 requests</p>
                  <span>Medium demand</span>
                </div>

                <div className="location-report-card">
                  <h3>North Gaza</h3>
                  <p>29 requests</p>
                  <span>Growing demand</span>
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
                Most requests are resolved successfully, with critical cases
                requiring faster allocation and delivery.
              </p>
            </div>

            <div className="panel">
              <h2>Key Insights</h2>

              <div className="insight-list">
                <div className="insight-item">
                  <span className="material-symbols-outlined">trending_up</span>
                  <div>
                    <h3>Medical supplies demand increased</h3>
                    <p>Medical kit requests are the highest this month.</p>
                  </div>
                </div>

                <div className="insight-item">
                  <span className="material-symbols-outlined">warning</span>
                  <div>
                    <h3>Critical requests need faster response</h3>
                    <p>18 urgent requests are currently active.</p>
                  </div>
                </div>

                <div className="insight-item">
                  <span className="material-symbols-outlined">inventory_2</span>
                  <div>
                    <h3>Stock monitoring required</h3>
                    <p>Wound dressing packs are approaching low stock.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>Report Actions</h2>

              <div className="doctor-actions-grid">
                <button className="message-btn">
                  <span className="material-symbols-outlined">download</span>
                  Download PDF
                </button>

                <button className="message-btn secondary-message-btn">
                  <span className="material-symbols-outlined">print</span>
                  Print Report
                </button>

                <button className="message-btn secondary-message-btn">
                  <span className="material-symbols-outlined">share</span>
                  Share Summary
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NgoReports;
