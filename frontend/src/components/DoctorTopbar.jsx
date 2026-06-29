import { useLocation, useNavigate } from "react-router-dom";

function DoctorTopbar({ title, subtitle, doctor }) {
  const navigate = useNavigate();
  const location = useLocation();

  const doctorName = doctor?.name || doctor?.full_name || "Doctor";
  const doctorInitial = doctorName ? doctorName.charAt(0).toUpperCase() : "D";

  const isCriticalAlertsPage = location.pathname === "/doctor-critical-alerts";

  return (
    <header className="dashboard-topbar">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="topbar-actions">
        {!isCriticalAlertsPage && (
          <button
            type="button"
            className="emergency-action"
            onClick={() => navigate("/doctor-critical-alerts")}
          >
            <span className="material-symbols-outlined">notifications</span>
            Critical Alerts
          </button>
        )}

        <div className="topbar-user">
          <div className="user-avatar">{doctorInitial}</div>

          <div className="topbar-user-info">
            <h4>Dr. {doctorName}</h4>
            <p>{doctor?.specialty || doctor?.role || "doctor"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DoctorTopbar;
