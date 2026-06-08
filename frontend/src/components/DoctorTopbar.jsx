function DoctorTopbar({ title, subtitle, doctor }) {
  return (
    <header className="dashboard-topbar">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="topbar-actions">
        <button className="emergency-action">
          <span className="material-symbols-outlined">notifications</span>
          Critical Alerts
        </button>

        <div className="topbar-user">
          <div className="user-avatar">
            {doctor?.name ? doctor.name.charAt(0).toUpperCase() : "D"}
          </div>

          <div className="topbar-user-info">
            <h4>Dr. {doctor?.name || "Doctor"}</h4>
            <p>{doctor?.specialty || doctor?.role || "doctor"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DoctorTopbar;
