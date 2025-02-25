import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/NavBar.css"

export const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav className="nav">
            <NavLink to="/" className="title">Movie Hub</NavLink>
            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <NavLink to="/">HomePage</NavLink>
                </li>
                <li>
                    <NavLink to="/">About</NavLink>
                </li>
                <li>
                    <NavLink to="/">Services</NavLink>
                </li>
                <li>
                    <NavLink to="/">AI Search</NavLink>
                </li>
                <li>
                    <NavLink to="/">LOL</NavLink>
                </li>
            </ul>
        </nav>
    );
};