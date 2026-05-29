import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function NgoTriage() {
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

          <Link to="/ngo-triage" className="active">
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
            <h1>Triage Requests Table</h1>
            <p>
              Filter, prioritize, and review humanitarian assistance requests.
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
              <p>Critical</p>
              <h2>18</h2>
            </div>
            <span className="material-symbols-outlined">priority_high</span>
          </div>

          <div className="stat-box orange">
            <div>
              <p>Medium</p>
              <h2>32</h2>
            </div>
            <span className="material-symbols-outlined">hourglass_top</span>
          </div>

          <div className="stat-box green">
            <div>
              <p>Low</p>
              <h2>47</h2>
            </div>
            <span className="material-symbols-outlined">check_circle</span>
          </div>

          <div className="stat-box blue">
            <div>
              <p>Total Requests</p>
              <h2>97</h2>
            </div>
            <span className="material-symbols-outlined">request_page</span>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header triage-toolbar">
            <div>
              <h2>Incoming Assistance Requests</h2>
              <p>
                Requests sorted by urgency, location, and required support type.
              </p>
            </div>

            <div className="table-actions">
              <div className="search-box">
                <span className="material-symbols-outlined">search</span>
                <input
                  type="text"
                  placeholder="Search patient or location..."
                />
              </div>

              <select className="filter-select">
                <option>All Priorities</option>
                <option>Critical</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

              <select className="filter-select">
                <option>All Types</option>
                <option>Medical Supplies</option>
                <option>Transportation</option>
                <option>Financial Aid</option>
                <option>Mobility Support</option>
              </select>
            </div>
          </div>

          <div className="triage-table">
            <div className="triage-row triage-head">
              <span>Patient</span>
              <span>Request Type</span>
              <span>Location</span>
              <span>Priority</span>
              <span>Status</span>
              <span>Submitted</span>
              <span>Action</span>
            </div>

            <div className="triage-row critical-row">
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
              <span>Today</span>

              <div className="row-actions">
                <button className="mini-btn">Review</button>
                <button className="icon-mini-btn">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>

            <div className="triage-row">
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
              <span>Yesterday</span>

              <div className="row-actions">
                <button className="mini-btn">Review</button>
                <button className="icon-mini-btn">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>

            <div className="triage-row">
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
              <span>2 days ago</span>

              <div className="row-actions">
                <button className="mini-btn">Details</button>
                <button className="icon-mini-btn">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>

            <div className="triage-row critical-row">
              <div className="patient-cell">
                <div className="patient-avatar">R</div>
                <div>
                  <h3>Rami Saleh</h3>
                  <p>PT-2026-031</p>
                </div>
              </div>

              <span>Mobility Support</span>
              <span>Gaza</span>
              <span className="priority-badge critical">Critical</span>
              <span className="status pending">Needs Action</span>
              <span>Today</span>

              <div className="row-actions">
                <button className="mini-btn">Review</button>
                <button className="icon-mini-btn">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NgoTriage;
