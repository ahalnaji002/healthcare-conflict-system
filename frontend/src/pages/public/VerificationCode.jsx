import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../../styles/dashboard.css";
import API from "../../services/api";
import AppLogo from "../../components/AppLogo";

function VerificationCode() {
  const navigate = useNavigate();
  const location = useLocation();

  const inputRefs = useRef([]);

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [seconds, setSeconds] = useState(60);

  const userId =
    location.state?.user_id || localStorage.getItem("verify_user_id");

  const email = location.state?.email || localStorage.getItem("verify_email");

  const role =
    location.state?.role || localStorage.getItem("verify_role") || "patient";

  const missingVerificationInfo = !userId && !email;

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const maskEmail = (value) => {
    if (!value) return "your email address";

    const [name, domain] = value.split("@");

    if (!domain) return value;

    const visiblePart = name.slice(0, 2);
    return `${visiblePart}****@${domain}`;
  };

  const handleInputChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(0, 1);

    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedValue = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedValue) return;

    const newCode = ["", "", "", "", "", ""];

    pastedValue.split("").forEach((digit, index) => {
      newCode[index] = digit;
    });

    setCode(newCode);

    const nextIndex = Math.min(pastedValue.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    const finalCode = code.join("");

    if (missingVerificationInfo) {
      setMessage("Missing verification information. Please register again.");
      setMessageType("error");
      return;
    }

    if (finalCode.length !== 6) {
      setMessage("Please enter the full 6-digit verification code.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await API.post("/auth/verify-code", {
        user_id: userId,
        email,
        code: finalCode,
      });

      setMessage("Account activated successfully. Redirecting to login...");
      setMessageType("success");

      localStorage.removeItem("verify_user_id");
      localStorage.removeItem("verify_email");
      localStorage.removeItem("verify_role");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Invalid or expired verification code.",
      );
      setMessageType("error");
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (seconds > 0) return;

    if (missingVerificationInfo) {
      setMessage("Missing verification information. Please register again.");
      setMessageType("error");
      return;
    }

    try {
      setResending(true);
      setMessage("");

      await API.post("/auth/resend-code", {
        user_id: userId,
        email,
      });

      setMessage("A new verification code has been sent.");
      setMessageType("success");
      setSeconds(60);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to resend verification code.",
      );
      setMessageType("error");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="verification-page">
      <main className="verification-main">
        <div className="verification-container">
          <div className="verification-brand">
            <div className="logo-area">
              <AppLogo variant="small" />
            </div>
          </div>

          <section className="verification-card">
            <div className="verification-card-body">
              <div className="verification-header-row">
                <div>
                  <h2>Activate Your Account</h2>
                  <p>
                    We sent an activation code to your email or phone number.
                    Please enter the code below to activate your account.
                  </p>
                </div>

                <span className="verification-role-badge">
                  <span className="material-symbols-outlined">
                    medical_information
                  </span>
                  {role}
                </span>
              </div>

              <div className="verification-sent-box">
                <span className="material-symbols-outlined">
                  mark_email_read
                </span>

                <div>
                  <p>Sent to</p>
                  <h3>{maskEmail(email)}</h3>
                </div>

                <Link to="/patient-register">Change</Link>
              </div>

              {message && (
                <div
                  className={`verification-message ${
                    messageType === "success"
                      ? "verification-message-success"
                      : "verification-message-error"
                  }`}
                >
                  <span className="material-symbols-outlined">
                    {messageType === "success" ? "check_circle" : "error"}
                  </span>
                  <p>{message}</p>
                </div>
              )}

              <form onSubmit={handleVerify}>
                <div className="otp-inputs" onPaste={handlePaste}>
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="otp-input"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="verification-primary-btn"
                  disabled={loading}
                >
                  <span className="material-symbols-outlined">
                    verified_user
                  </span>
                  {loading ? "Activating..." : "Activate Account"}
                </button>
              </form>

              <div className="verification-resend">
                <p>
                  Didn&apos;t receive the code?{" "}
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={seconds > 0 || resending}
                  >
                    {resending ? "Sending..." : "Resend Code"}
                  </button>
                </p>

                {seconds > 0 && (
                  <small>
                    Resend code in <strong>{seconds}</strong> seconds
                  </small>
                )}
              </div>
            </div>

            <div className="verification-footer-links">
              <Link to="/login">
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Login
              </Link>

              <a href="#help">
                <span className="material-symbols-outlined">help</span>
                Get Help
              </a>
            </div>
          </section>

          <p className="verification-note">
            <strong>Note:</strong> Clinical roles Doctor/NGO will be activated
            once administrative verification is complete.
          </p>
        </div>
      </main>

      <footer className="verification-footer">
        <p>© 2026 War Injuries Care. University Project.</p>

        <div>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

export default VerificationCode;
