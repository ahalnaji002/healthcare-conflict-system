import { useLocation, useNavigate } from "react-router-dom";

function AdminTopbar({ title, subtitle, admin }) {
  const navigate = useNavigate();
  const location = useLocation();

  const adminName = admin?.name || admin?.full_name || "Admin";
  const adminInitial = adminName ? adminName.charAt(0).toUpperCase() : "A";

  const isEmergencyPage = location.pathname === "/admin-emergency-alerts";

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
            className="emergency-action"
            onClick={() => navigate("/admin-emergency-alerts")}
          >
            <span className="material-symbols-outlined">emergency</span>
            Emergency Alert
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
