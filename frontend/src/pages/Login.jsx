import { useState } from "react";
import API from "../services/api";
import "../auth.css";

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
    } catch (error) {
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
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>

        <div className="message">{message}</div>

        <div className="auth-footer">
          Don’t have an account? <span>Register</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
