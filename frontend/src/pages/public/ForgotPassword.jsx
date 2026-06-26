import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [step, setStep] = useState("email");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSendCode = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to send reset code");
        return;
      }

      setMessage(data.message || "Reset code sent to your email.");
      setStep("reset");
    } catch (err) {
      console.error("FORGOT PASSWORD ERROR:", err);
      setError("Server connection error");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!code.trim() || !newPassword || !confirmPassword) {
      setError("Reset code, new password, and confirm password are required");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to reset password");
        return;
      }

      setMessage("Password changed successfully. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("RESET PASSWORD ERROR:", err);
      setError("Server connection error");
    } finally {
      setLoading(false);
    }
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
            {step === "email"
              ? "Enter your registered email address and we will send you a secure reset code."
              : "Enter the reset code sent to your email and choose a new password."}
          </p>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          {step === "email" ? (
            <form onSubmit={handleSendCode} className="forgot-form">
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <span className="material-symbols-outlined">mail</span>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="auth-primary-btn"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Code"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="forgot-form">
              <div className="form-group">
                <label>Reset Code</label>
                <div className="input-wrapper">
                  <span className="material-symbols-outlined">pin</span>
                  <input
                    type="text"
                    placeholder="Enter reset code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>New Password</label>
                <div className="input-wrapper">
                  <span className="material-symbols-outlined">lock</span>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-wrapper">
                  <span className="material-symbols-outlined">lock</span>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="auth-primary-btn"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              <button
                type="button"
                className="auth-primary-btn"
                style={{
                  background: "#fff",
                  color: "#00478d",
                  border: "2px solid #00478d",
                  marginTop: "10px",
                }}
                onClick={() => {
                  setStep("email");
                  setMessage("");
                  setError("");
                  setCode("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
              >
                Change Email
              </button>
            </form>
          )}

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
