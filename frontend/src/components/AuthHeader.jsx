import { Link, useLocation } from "react-router-dom";
import AppLogo from "./AppLogo";

function AuthHeader() {
  const location = useLocation();
  const path = location.pathname;

  const isJoinPage = path === "/join-request";
  const isLoginPage = path === "/login";

  return (
    <header className="auth-shared-header">
      <Link to="/" className="auth-shared-logo">
        <AppLogo variant="login" />
      </Link>

      <nav className="auth-shared-nav">
        <Link to="/">Home</Link>

        <a href="/#about">About</a>

        <a href="/#services">Services</a>

        <Link to="/join-request" className={isJoinPage ? "auth-blue-btn" : ""}>
          Join Us
        </Link>

        <Link to="/login" className={isLoginPage ? "auth-blue-btn" : ""}>
          Login
        </Link>

        <Link to="/emergency-alert" className="auth-emergency-link">
          <span className="material-symbols-outlined">emergency</span>
          Emergency Help
        </Link>
      </nav>
    </header>
  );
}

export default AuthHeader;
