import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function DoctorPatients() {
  return (
    <div className="dashboard-page">
      <aside className="sidebar doctor-sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <span className="material-symbols-outlined">medical_services</span>
          </div>

          <div>
            <h2>War Injuries Care</h2>
            <p>Doctor Portal</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/doctor-dashboard">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>

          <Link to="/doctor-patients" className="active">
            <span className="material-symbols-outlined">groups</span>
            Patients Management
          </Link>

          <a href="#records">
            <span className="material-symbols-outlined">clinical_notes</span>
            Medical Records
          </a>

          <Link to="/doctor-update-treatment">
            <span className="material-symbols-outlined">edit_note</span>
            Treatment Plans
          </Link>

          <Link to="/doctor-chat">
            <span className="material-symbols-outlined">chat</span>
            Patient Chat
          </Link>

          <Link to="/doctor-profile">
            <span className="material-symbols-outlined">person</span>
            Doctor Profile
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
            <h1>Patients Management</h1>
            <p>Review assigned patients, priorities, and follow-up status.</p>
          </div>

          <div className="topbar-actions">
            <button className="emergency-action">
              <span className="material-symbols-outlined">notifications</span>
              Critical Alerts
            </button>

            <div className="user-avatar">
              <span className="material-symbols-outlined">stethoscope</span>
            </div>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-box blue">
            <div>
              <p>Total Assigned</p>
              <h2>48</h2>
            </div>
            <span className="material-symbols-outlined">groups</span>
          </div>

          <div className="stat-box red">
            <div>
              <p>Critical Priority</p>
              <h2>6</h2>
            </div>
            <span className="material-symbols-outlined">priority_high</span>
          </div>

          <div className="stat-box orange">
            <div>
              <p>Need Review</p>
              <h2>14</h2>
            </div>
            <span className="material-symbols-outlined">rate_review</span>
          </div>

          <div className="stat-box green">
            <div>
              <p>Stable Cases</p>
              <h2>28</h2>
            </div>
            <span className="material-symbols-outlined">verified</span>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header patients-toolbar">
            <div>
              <h2>Assigned Patients List</h2>
              <p>Search, filter, and open patient medical records.</p>
            </div>

            <div className="table-actions">
              <div className="search-box">
                <span className="material-symbols-outlined">search</span>
                <input type="text" placeholder="Search patient..." />
              </div>

              <select className="filter-select">
                <option>All Priorities</option>
                <option>Critical</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          <div className="patients-management-table">
            <div className="patients-row patients-head">
              <span>Patient</span>
              <span>Condition</span>
              <span>Last Update</span>
              <span>Priority</span>
              <span>Status</span>
              <span>Action</span>
            </div>

            <div className="patients-row">
              <div className="patient-cell">
                <div className="patient-avatar">A</div>
                <div>
                  <h3>Ahmed Hashem</h3>
                  <p>PT-2026-001 • Gaza</p>
                </div>
              </div>

              <span>Lower limb injury</span>
              <span>Today, 11:30 AM</span>
              <span className="priority-badge critical">Critical</span>
              <span className="status pending">Needs Review</span>

              <div className="row-actions">
                <Link to="/doctor-patient-record">
                  <button className="mini-btn">Open Record</button>
                </Link>
                <button className="icon-mini-btn">
                  <span className="material-symbols-outlined">chat</span>
                </button>
              </div>
            </div>

            <div className="patients-row">
              <div className="patient-cell">
                <div className="patient-avatar">M</div>
                <div>
                  <h3>Mohammed Ali</h3>
                  <p>PT-2026-014 • Rafah</p>
                </div>
              </div>

              <span>Wound follow-up</span>
              <span>Yesterday, 04:15 PM</span>
              <span className="priority-badge medium">Medium</span>
              <span className="status taken">Stable</span>

              <div className="row-actions">
                <Link to="/doctor-patient-record">
                  <button className="mini-btn">Open Record</button>
                </Link>
                <button className="icon-mini-btn">
                  <span className="material-symbols-outlined">chat</span>
                </button>
              </div>
            </div>

            <div className="patients-row">
              <div className="patient-cell">
                <div className="patient-avatar">S</div>
                <div>
                  <h3>Sara Nabil</h3>
                  <p>PT-2026-022 • Khan Younis</p>
                </div>
              </div>

              <span>Physical therapy</span>
              <span>2 days ago</span>
              <span className="priority-badge low">Low</span>
              <span className="status taken">Improving</span>

              <div className="row-actions">
                <button className="mini-btn">Open Record</button>
                <button className="icon-mini-btn">
                  <span className="material-symbols-outlined">chat</span>
                </button>
              </div>
            </div>

            <div className="patients-row">
              <div className="patient-cell">
                <div className="patient-avatar">R</div>
                <div>
                  <h3>Rami Saleh</h3>
                  <p>PT-2026-031 • Gaza</p>
                </div>
              </div>

              <span>Post-surgery care</span>
              <span>Today, 09:00 AM</span>
              <span className="priority-badge critical">Critical</span>
              <span className="status pending">Urgent</span>

              <div className="row-actions">
                <button className="mini-btn">Open Record</button>
                <button className="icon-mini-btn">
                  <span className="material-symbols-outlined">chat</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DoctorPatients;
