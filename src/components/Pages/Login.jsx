import React, { useState } from "react";
import { loginUser } from "../Api/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../assets/AuthContext";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    console.log("Attempting to login with Email:", email, "and Password:", password);
    
    try {
      
      const data = await loginUser({ username: email, password });
      console.log("Login successful!");
      
     
      await login(data);
      
      
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError("Invalid login. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-section">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;