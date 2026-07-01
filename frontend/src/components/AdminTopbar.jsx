import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminTopbar({ title, subtitle, admin }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [emergencyCount, setEmergencyCount] = useState(0);

  const adminName = admin?.name || admin?.full_name || "Admin";
  const adminInitial = adminName ? adminName.charAt(0).toUpperCase() : "A";

  const isEmergencyPage = location.pathname === "/admin-emergency-alerts";

  useEffect(() => {
    const fetchEmergencyAlerts = async () => {
      try {
        const res = await API.get("/emergency/active");
        setEmergencyCount(res.data?.alerts?.length || 0);
      } catch (err) {
        console.error("Failed to fetch emergency alerts:", err);
      }
    };

    fetchEmergencyAlerts();

    const interval = setInterval(fetchEmergencyAlerts, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="dashboard-topbar">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="topbar-actions">
        {!isEmergencyPage && (
          <button
            type="button"
            className={`emergency-action ${emergencyCount > 0 ? "alert-blink" : ""}`}
            onClick={() => navigate("/admin-emergency-alerts")}
          >
            <span className="material-symbols-outlined">emergency</span>
            Critical Alert
            {emergencyCount > 0 && (
              <span className="emergency-count">{emergencyCount}</span>
            )}{" "}
          </button>
        )}

        <div className="topbar-user">
          <div className="user-avatar admin-avatar">{adminInitial}</div>

          <div className="topbar-user-info">
            <h4>{adminName}</h4>
            <p>{admin?.role || "admin"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminTopbar;
