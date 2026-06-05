import { Link, useLocation } from "react-router-dom";

function NgoSidebar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <span className="material-symbols-outlined">health_and_safety</span>
        </div>
        <div>
          <h2>War Injuries Care</h2>
          <p>NGO Portal</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link to="/ngo-dashboard" className={path === "/ngo-dashboard" ? "active" : ""}>
          <span className="material-symbols-outlined">dashboard</span>
          Dashboard
        </Link>
        <Link to="/ngo-triage" className={path === "/ngo-triage" ? "active" : ""}>
          <span className="material-symbols-outlined">local_hospital</span>
          Triage
        </Link>
        <Link to="/ngo-emergency" className={path === "/ngo-emergency" ? "active" : ""}>
          <span className="material-symbols-outlined">emergency</span>
          Emergency
        </Link>
        <Link to="/ngo-resources" className={path === "/ngo-resources" ? "active" : ""}>
          <span className="material-symbols-outlined">inventory_2</span>
          Resources
        </Link>
        <Link to="/ngo-reports" className={path === "/ngo-reports" ? "active" : ""}>
          <span className="material-symbols-outlined">assessment</span>
          Reports
        </Link>
        <Link to="/ngo-profile" className={path === "/ngo-profile" ? "active" : ""}>
          <span className="material-symbols-outlined">person</span>
          Profile
        </Link>
      </nav>
      <div className="sidebar-footer">
        <Link to="/login">
          <span className="material-symbols-outlined">logout</span>
          Logout
        </Link>
      </div>
    </aside>
  );
}
export default NgoSidebar;