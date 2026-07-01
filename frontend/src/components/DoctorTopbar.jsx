import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

function DoctorTopbar({ title, subtitle, doctor }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [criticalCount, setCriticalCount] = useState(0);

  const doctorName = doctor?.name || doctor?.full_name || "Doctor";
  const doctorInitial = doctorName ? doctorName.charAt(0).toUpperCase() : "D";

  const isCriticalAlertsPage = location.pathname === "/doctor-critical-alerts";

  useEffect(() => {
    const fetchCriticalAlerts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const doctorId = user?.id || user?.user_id;

        if (!doctorId) return;

        const res = await API.get(`/emergency/doctor/${doctorId}`);

        setCriticalCount(res.data?.alerts?.length || 0);
      } catch (err) {
        console.error("Failed to fetch critical alerts:", err);
      }
    };

    fetchCriticalAlerts();

    const interval = setInterval(fetchCriticalAlerts, 5000);

    return () => clearInterval(interval);
  }, []);

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
            className={`emergency-action ${
              criticalCount > 0 ? "alert-blink" : ""
            }`}
            onClick={() => navigate("/doctor-critical-alerts")}
          >
            <span className="material-symbols-outlined">emergency</span>
            Critical Alerts
            {criticalCount > 0 && (
              <span className="emergency-count">{criticalCount}</span>
            )}
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
