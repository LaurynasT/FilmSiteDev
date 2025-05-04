import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import { useAuth } from "../assets/AuthContext";
import { logoutUser } from "../Api/Api";

export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call API to invalidate server-side token
      logout(); // Update auth context
      navigate("/login"); // Redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/login"); // Redirect anyway on error
    }
  };

  return (
    <nav className="nav">
      <NavLink to="/" className="title">Movie Hub</NavLink>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li><NavLink to="/">HomePage</NavLink></li>
        <li><NavLink to="/DiscoverTv">Discover Tv</NavLink></li>
        <li><NavLink to="/DiscoverMovie">Discover Movies</NavLink></li>
        <li><NavLink to="/About">About</NavLink></li>
        
        {!isAuthenticated ? (
          <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/signup">Signup</NavLink></li>
          </>
        ) : (
          <>
            <li><NavLink to="/AiSearch">AI Search</NavLink></li>
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="#" onClick={handleLogout}>Logout</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
};