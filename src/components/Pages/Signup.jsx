import React, { useState } from "react";
import { registerUser } from "../Api/Api";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

 
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const data = await registerUser(form);
      setMessage("Signup successful! You can now log in.");
      setForm({ name: "", email: "", password: "", confirmPassword: "" });

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-section">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            name="name"
            type="text"
            placeholder="Username"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <div className="password-wrapper">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            
          </div>

          <div className="password-wrapper">
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Signup</button>
        </form>

        {message && <p className="auth-success">{message}</p>}
        {error && <p className="auth-error">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
