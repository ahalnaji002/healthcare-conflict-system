import "../../styles/dashboard.css";

function AdminUsers() {
  return (
    <>
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
            <p>Active Accounts</p>
            <h2>1,104</h2>
          </div>
          <span className="material-symbols-outlined">verified</span>
        </div>

        <div className="stat-box orange">
          <div>
            <p>Pending Review</p>
            <h2>23</h2>
          </div>
          <span className="material-symbols-outlined">pending_actions</span>
        </div>

        <div className="stat-box red">
          <div>
            <p>Suspended</p>
            <h2>12</h2>
          </div>
          <span className="material-symbols-outlined">block</span>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header admin-users-toolbar">
          <div>
            <h2>System Users</h2>
            <p>Search, filter, activate, suspend, or update user roles.</p>
          </div>

          <div className="table-actions">
            <div className="search-box">
              <span className="material-symbols-outlined">search</span>
              <input type="text" placeholder="Search users..." />
            </div>

            <select className="filter-select">
              <option>All Roles</option>
              <option>Patients</option>
              <option>Doctors</option>
              <option>NGOs</option>
              <option>Admins</option>
            </select>

            <select className="filter-select">
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Suspended</option>
            </select>
          </div>
        </div>

        <div className="admin-users-table">
          <div className="admin-users-row admin-users-head">
            <span>User</span>
            <span>Role</span>
            <span>Email</span>
            <span>Status</span>
            <span>Last Active</span>
            <span>Actions</span>
          </div>

          <div className="admin-users-row">
            <div className="patient-cell">
              <div className="patient-avatar">A</div>
              <div>
                <h3>Ahmed Hashem</h3>
                <p>PT-2026-001</p>
              </div>
            </div>

            <span className="role-pill patient-role">Patient</span>
            <span>ahmed@example.com</span>
            <span className="status taken">Active</span>
            <span>Today</span>

            <div className="row-actions">
              <button className="mini-btn">Edit</button>
              <button className="icon-mini-btn">
                <span className="material-symbols-outlined">visibility</span>
              </button>
              <button className="icon-mini-btn danger-icon-btn">
                <span className="material-symbols-outlined">block</span>
              </button>
            </div>
          </div>

          <div className="admin-users-row">
            <div className="patient-cell">
              <div className="patient-avatar">S</div>
              <div>
                <h3>Dr. Samer Khaled</h3>
                <p>MED-2026-445</p>
              </div>
            </div>

            <span className="role-pill doctor-role">Doctor</span>
            <span>samer.khaled@example.com</span>
            <span className="status taken">Active</span>
            <span>10 min ago</span>

            <div className="row-actions">
              <button className="mini-btn">Edit</button>
              <button className="icon-mini-btn">
                <span className="material-symbols-outlined">visibility</span>
              </button>
              <button className="icon-mini-btn danger-icon-btn">
                <span className="material-symbols-outlined">block</span>
              </button>
            </div>
          </div>

          <div className="admin-users-row">
            <div className="patient-cell">
              <div className="patient-avatar">H</div>
              <div>
                <h3>Hope Relief NGO</h3>
                <p>NGO-2026-448</p>
              </div>
            </div>

            <span className="role-pill ngo-role">NGO</span>
            <span>contact@hoperelief.org</span>
            <span className="status taken">Active</span>
            <span>Yesterday</span>

            <div className="row-actions">
              <button className="mini-btn">Edit</button>
              <button className="icon-mini-btn">
                <span className="material-symbols-outlined">visibility</span>
              </button>
              <button className="icon-mini-btn danger-icon-btn">
                <span className="material-symbols-outlined">block</span>
              </button>
            </div>
          </div>

          <div className="admin-users-row">
            <div className="patient-cell">
              <div className="patient-avatar">L</div>
              <div>
                <h3>Dr. Lina Omar</h3>
                <p>MED-PENDING</p>
              </div>
            </div>

            <span className="role-pill doctor-role">Doctor</span>
            <span>lina.omar@example.com</span>
            <span className="status pending">Pending</span>
            <span>Not active</span>

            <div className="row-actions">
              <button className="mini-btn">Review</button>
              <button className="icon-mini-btn">
                <span className="material-symbols-outlined">visibility</span>
              </button>
              <button className="icon-mini-btn danger-icon-btn">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminUsers;
