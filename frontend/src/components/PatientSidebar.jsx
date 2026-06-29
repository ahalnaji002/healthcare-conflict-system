import { Link, useLocation, useNavigate } from "react-router-dom";
import AppLogo from "./AppLogo";

function PatientSidebar() {
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
          to="/patient-dashboard"
          className={path === "/patient-dashboard" ? "active" : ""}
        >
          <span className="material-symbols-outlined">dashboard</span>
          Dashboard
        </Link>

        <Link
          to="/patient-medications"
          className={path === "/patient-medications" ? "active" : ""}
        >
          <span className="material-symbols-outlined">medication</span>
          Medication Reminders
        </Link>

        <Link
          to="/patient-appointments"
          className={path === "/patient-appointments" ? "active" : ""}
        >
          <span className="material-symbols-outlined">calendar_month</span>
          Appointments
        </Link>

        <Link
          to="/patient-treatment"
          className={path === "/patient-treatment" ? "active" : ""}
        >
          <span className="material-symbols-outlined">assignment</span>
          Treatment Plan
        </Link>

        <Link
          to="/patient-requests"
          className={path === "/patient-requests" ? "active" : ""}
        >
          <span className="material-symbols-outlined">volunteer_activism</span>
          Assistance Requests
        </Link>

        <Link
          to="/patient-progress"
          className={path === "/patient-progress" ? "active" : ""}
        >
          <span className="material-symbols-outlined">monitoring</span>
          Health Progress
        </Link>

        <Link
          to="/patient-chat"
          className={path === "/patient-chat" ? "active" : ""}
        >
          <span className="material-symbols-outlined">chat</span>
          Doctor Chat
        </Link>

        <Link
          to="/patient-profile"
          className={path === "/patient-profile" ? "active" : ""}
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

export default PatientSidebar;
