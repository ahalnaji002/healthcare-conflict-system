import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppLogo from "./AppLogo";

function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const [pendingCount, setPendingCount] = useState(0);
  const [assistanceCount, setAssistanceCount] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setPendingCount(data.stats?.pending_join_requests || 0);
          setAssistanceCount(data.stats?.pending_assistance_requests || 0);
        }
      } catch (err) {
        console.error("FETCH PENDING COUNT ERROR:", err);
      }
    };

    fetchPendingCount();

    const interval = setInterval(fetchPendingCount, 10000);

    return () => clearInterval(interval);
  }, [token]);

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
          to="/admin-appoint-doctor"
          className={path === "/admin-appoint-doctor" ? "active" : ""}
        >
          <span className="material-symbols-outlined">assignment_ind</span>
          Appoint Doctor
        </Link>

        <Link
          to="/admin-join-requests"
          className={
            path === "/admin-join-requests"
              ? "active sidebar-link-badge"
              : "sidebar-link-badge"
          }
        >
          <span className="material-symbols-outlined">how_to_reg</span>
          Join Requests
          {pendingCount > 0 && (
            <span className="sidebar-badge">{pendingCount}</span>
          )}
        </Link>

        <Link
          to="/admin-assistance"
          className={
            path === "/admin-assistance"
              ? "active sidebar-link-badge"
              : "sidebar-link-badge"
          }
        >
          <span className="material-symbols-outlined">volunteer_activism</span>
          Assistance
          {assistanceCount > 0 && (
            <span className="sidebar-badge">{assistanceCount}</span>
          )}
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
