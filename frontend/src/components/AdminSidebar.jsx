import { Link, useLocation } from "react-router-dom";

function AdminSidebar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <span className="material-symbols-outlined">admin_panel_settings</span>
        </div>
        <div>
          <h2>War Injuries Care</h2>
          <p>Admin Portal</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link to="/admin-dashboard" className={path === "/admin-dashboard" ? "active" : ""}>
          <span className="material-symbols-outlined">dashboard</span>
          Dashboard
        </Link>
        <Link to="/admin-users" className={path === "/admin-users" ? "active" : ""}>
          <span className="material-symbols-outlined">manage_accounts</span>
          Users
        </Link>
        <Link to="/admin-join-requests" className={path === "/admin-join-requests" ? "active" : ""}>
          <span className="material-symbols-outlined">person_add</span>
          Join Requests
        </Link>
        <Link to="/admin-assistance" className={path === "/admin-assistance" ? "active" : ""}>
          <span className="material-symbols-outlined">volunteer_activism</span>
          Assistance
        </Link>
        <Link to="/admin-logs" className={path === "/admin-logs" ? "active" : ""}>
          <span className="material-symbols-outlined">receipt_long</span>
          Logs
        </Link>
        <Link to="/admin-records" className={path === "/admin-records" ? "active" : ""}>
          <span className="material-symbols-outlined">folder_open</span>
          Records
        </Link>
        <Link to="/admin-reports" className={path === "/admin-reports" ? "active" : ""}>
          <span className="material-symbols-outlined">bar_chart</span>
          Reports
        </Link>
        <Link to="/admin-settings" className={path === "/admin-settings" ? "active" : ""}>
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
  );
}
export default AdminSidebar;