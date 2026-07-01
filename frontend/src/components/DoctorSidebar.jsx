import { Link, useLocation, useNavigate } from "react-router-dom";
import AppLogo from "./AppLogo";

function DoctorSidebar() {
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
          to="/doctor-dashboard"
          className={path === "/doctor-dashboard" ? "active" : ""}
        >
          <span className="material-symbols-outlined">dashboard</span>
          Dashboard
        </Link>
        <Link
          to="/doctor-patients"
          className={path.startsWith("/doctor-patient") ? "active" : ""}
        >
          <span className="material-symbols-outlined">groups</span>
          Patients Management
        </Link>
        
        <Link
          to="/doctor-chat"
          className={path === "/doctor-chat" ? "active" : ""}
        >
          <span className="material-symbols-outlined">chat</span>
          Patient Chat
        </Link>
        <Link
          to="/doctor-profile"
          className={path === "/doctor-profile" ? "active" : ""}
        >
          <span className="material-symbols-outlined">person</span>
          Profile
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
export default DoctorSidebar;
