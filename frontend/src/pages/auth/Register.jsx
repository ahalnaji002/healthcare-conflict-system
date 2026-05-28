import { useState } from "react";
import API from "../../services/api";
import "./auth.css";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle register
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/register", {
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
      });

      setMessage(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">❤️</div>

        <h1>Patient Register</h1>

        <p className="auth-subtitle">
          Create your account to access healthcare services.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />

            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
            />
          </div>

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
          </div>

          <button type="submit">Register</button>
        </form>

        <div className="message">{message}</div>
        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
