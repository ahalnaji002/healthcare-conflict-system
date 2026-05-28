import { useState } from "react";
import API from "../../services/api";
import "./auth.css";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);

      setMessage("Login successful");
    } catch {
      setMessage("Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">❤️</div>

        <h1>Login</h1>

        <p className="auth-subtitle">Access your healthcare account securely</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaEnvelope className="input-icon" />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <FaEye className="eye-icon" />
          </div>

          <button type="submit">Login</button>
        </form>

        <div className="message">{message}</div>

        <div className="auth-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
