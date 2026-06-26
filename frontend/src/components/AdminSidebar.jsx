import { Link, useLocation, useNavigate } from "react-router-dom";
import AppLogo from "./AppLogo";

function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <AppLogo variant="sidebar" />
      </div>

      <nav className="sidebar-nav">
        <Link
          to="/admin-dashboard"
          className={path === "/admin-dashboard" ? "active" : ""}
        >
          <span className="material-symbols-outlined">dashboard</span>
          Dashboard
        </Link>

        <Link
          to="/admin-users"
          className={path === "/admin-users" ? "active" : ""}
        >
          <span className="material-symbols-outlined">groups</span>
          Users
        </Link>

        <Link
          to="/admin-join-requests"
          className={path === "/admin-join-requests" ? "active" : ""}
        >
          <span className="material-symbols-outlined">how_to_reg</span>
          Join Requests
        </Link>

        <Link
          to="/admin-assistance"
          className={path === "/admin-assistance" ? "active" : ""}
        >
          <span className="material-symbols-outlined">volunteer_activism</span>
          Assistance
        </Link>

        <Link
          to="/admin-records"
          className={path === "/admin-records" ? "active" : ""}
        >
          <span className="material-symbols-outlined">clinical_notes</span>
          Records
        </Link>

        <Link
          to="/admin-reports"
          className={path === "/admin-reports" ? "active" : ""}
        >
          <span className="material-symbols-outlined">bar_chart</span>
          Reports
        </Link>

        <Link
          to="/admin-logs"
          className={path === "/admin-logs" ? "active" : ""}
        >
          <span className="material-symbols-outlined">history</span>
          Logs
        </Link>

        <Link
          to="/admin-settings"
          className={path === "/admin-settings" ? "active" : ""}
        >
          <span className="material-symbols-outlined">settings</span>
          Settings
        </Link>
      </nav>

      <div className="sidebar-footer">
        <button
          type="button"
          onClick={handleLogout}
          className="sidebar-logout-btn"
        >
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
