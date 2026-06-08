function PatientTopbar({ title, subtitle, user }) {
  return (
    <header className="dashboard-topbar">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="topbar-actions">
        <button className="emergency-action">
          <span className="material-symbols-outlined">emergency</span>
          Emergency Alert
        </button>

        <div className="topbar-user">
          <div className="user-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : "P"}
          </div>

          <div className="topbar-user-info">
            <h4>{user?.name || "Patient"}</h4>
            <p>{user?.role || "patient"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default PatientTopbar;
