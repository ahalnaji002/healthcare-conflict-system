import { useState } from "react";
import API from "../services/api";
import "../auth.css";
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
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Register</button>
        </form>

        <div className="message">{message}</div>
      </div>
    </div>
  );
}

export default Register;
