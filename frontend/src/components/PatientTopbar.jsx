import { useNavigate } from "react-router-dom";

function PatientTopbar({ title, subtitle, patient, user }) {
  const navigate = useNavigate();

  const currentPatient = patient || user;

  const patientName =
    currentPatient?.name || currentPatient?.full_name || "Patient";

  return (
    <header className="dashboard-topbar">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="topbar-actions">
        <button
          type="button"
          className="emergency-action"
          onClick={() => navigate("/emergency-alert")}
        >
          <span className="material-symbols-outlined">emergency</span>
          Emergency Alert
        </button>

        <div className="topbar-user">
          <div className="user-avatar">
            {patientName ? patientName.charAt(0).toUpperCase() : "P"}
          </div>

          <div className="topbar-user-info">
            <h4>{patientName}</h4>
            <p>{currentPatient?.role || "patient"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default PatientTopbar;
