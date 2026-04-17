import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { isAdmin, adminLogout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    adminLogout();
    navigate('/');
    toast.success('Admin logged out');
    setMobileOpen(false);
  }

  function closeMenu() {
    setMobileOpen(false);
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" onClick={closeMenu} className="navbar-logo-link">
          <img
            src="/logo.png"
            alt="Orthonexis Physiotherapy Health Group"
            className="navbar-logo-img"
          />
        </Link>

        <div className="navbar-nav desktop-nav">
          <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/book" className={`nav-link ${pathname === '/book' ? 'active' : ''}`}>Book Appointment</Link>
          <Link to="/reviews" className={`nav-link ${pathname === '/reviews' ? 'active' : ''}`}>Reviews</Link>
          <a href="tel:+254729113409" className="nav-link">Call Us</a>
          <a
            href="https://wa.me/254704719695?text=Hello%20Orthonexis%2C%20I%20would%20like%20to%20book%20an%20appointment"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            WhatsApp
          </a>
        </div>

        <div className="nav-right-desktop">
          {isAdmin ? (
            <Link to="/admin/reviews" className="btn btn-outline" style={{marginRight:8}}>📝 Reviews</Link>
            <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/admin-orthonexis" className="btn btn-outline">Staff Login</Link>
          )}
        </div>

        <button
          className="hamburger"
          type="button"
          aria-label="Open menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={mobileOpen ? 'ham-line ham-top-open' : 'ham-line'}></span>
          <span className={mobileOpen ? 'ham-line ham-mid-open' : 'ham-line'}></span>
          <span className={mobileOpen ? 'ham-line ham-bot-open' : 'ham-line'}></span>
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/book" className="mobile-nav-link" onClick={closeMenu}>Book Appointment</Link>
          <Link to="/reviews" className="mobile-nav-link" onClick={closeMenu}>Reviews</Link>
          <a href="tel:+254729113409" className="mobile-contact-btn blue-btn" onClick={closeMenu}>📞 Call Us</a>
          <a
            href="https://wa.me/254704719695?text=Hello%20Orthonexis%2C%20I%20would%20like%20to%20book%20an%20appointment"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-contact-btn green-btn"
            onClick={closeMenu}
          >
            💬 WhatsApp
          </a>
          {isAdmin ? (
            <Link to="/admin/reviews" className="mobile-nav-link" onClick={closeMenu}>📝 Patient Reviews</Link>
            <button className="mobile-nav-link mobile-logout" onClick={handleLogout}>Logout Admin</button>
          ) : (
            <Link to="/admin-orthonexis" className="mobile-nav-link" onClick={closeMenu}>Staff Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
