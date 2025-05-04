import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>About</h3>
          <p>Your movie search website for exploring trending titles, detailed info, and personalized recommendations.</p>
        </div>

       
        <div className="footer-section">
          <h3>Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/DiscoverMovie">Discover Movies</Link></li>
            <li><Link to="/DiscoverTv">Discover Tv Shows</Link></li>
            <li><Link to="/dmca">DMCA</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

       
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://x.com/realDonaldTrump" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>

   
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Movie Hub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
