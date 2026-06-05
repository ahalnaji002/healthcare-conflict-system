import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

function NotFound() {
  return (
    <div className="auth-page">
      <header className="auth-header">
        <Link to="/" className="auth-logo">
          <div className="auth-logo-icon">
            <span className="material-symbols-outlined">medical_services</span>
          </div>

          <div>
            <h2>War Injuries Care</h2>
            <p>Smart Medical Follow-up System</p>
          </div>
        </Link>

        <nav className="auth-nav">
          <Link to="/">Home</Link>
          <Link to="/login" className="auth-nav-active">
            Login
          </Link>
        </nav>
      </header>

      <main className="auth-main not-found-main">
        <section className="auth-left">
          <div className="emergency-box">
            <span className="material-symbols-outlined">error</span>
            <div>
              <h3>Page Not Found</h3>
              <p>The page you are trying to access does not exist.</p>
            </div>
          </div>

          <h1>404</h1>
          <p className="auth-subtitle">
            This route is not available in the system. You can return to the
            home page or login again.
          </p>

          <div className="not-found-actions">
            <Link to="/" className="auth-primary-btn not-found-btn">
              Back to Home
            </Link>

            <Link to="/login" className="not-found-login-link">
              Go to Login
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NotFound;
