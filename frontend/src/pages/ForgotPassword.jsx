import { Link } from "react-router-dom";
import "../styles/auth.css";

function ForgotPassword() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password reset link sent. This is a UI prototype.");
  };

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
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <Link to="/join-request">Join Us</Link>
          <Link to="/login" className="auth-nav-active">
            Login
          </Link>
        </nav>
      </header>

      <main className="forgot-main">
        <section className="forgot-card">
          <div className="forgot-icon">
            <span className="material-symbols-outlined">lock_reset</span>
          </div>

          <h1>Reset Password</h1>

          <p className="forgot-subtitle">
            Enter your registered email address and we will send you a secure
            password reset link.
          </p>

          <form onSubmit={handleSubmit} className="forgot-form">
            <div className="form-group">
              <label>Email Address</label>

              <div className="input-wrapper">
                <span className="material-symbols-outlined">mail</span>
                <input type="email" placeholder="Enter your email address" />
              </div>
            </div>

            <button type="submit" className="auth-primary-btn">
              Send Reset Link
            </button>
          </form>

          <div className="forgot-bottom">
            <Link to="/login">
              <span className="material-symbols-outlined">arrow_back</span>
              Back to Login
            </Link>
          </div>
        </section>

        <section className="forgot-side">
          <div className="forgot-side-card">
            <span className="material-symbols-outlined">shield_lock</span>
            <h2>Secure Account Recovery</h2>
            <p>
              For patient safety and data protection, password recovery uses
              secure verification before restoring access.
            </p>
          </div>

          <div className="forgot-side-card warning">
            <span className="material-symbols-outlined">support_agent</span>
            <h2>Need Help?</h2>
            <p>
              If you cannot access your email, contact the system administrator
              or medical support team for identity verification.
            </p>
          </div>
        </section>
      </main>

      <footer className="auth-footer">
        <div>
          <h3>War Injuries Care</h3>
          <p>Empowering recovery through coordination.</p>
        </div>

        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact Us</a>
          <a href="#medical">Medical Disclaimer</a>
        </div>

        <p className="copyright">
          © 2026 War Injuries Care. University Project.
        </p>
      </footer>
    </div>
  );
}

export default ForgotPassword;
