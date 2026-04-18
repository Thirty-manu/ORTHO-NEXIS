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

  function closeMenu() { setMobileOpen(false); }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">

        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="navbar-logo-link">

        </Link>

        {/* Desktop nav */}
        <div className="navbar-nav desktop-nav">
          <Link to="/" className={`nav-link ${pathname==='/'?'active':''}`}>Home</Link>
          <Link to="/book" className={`nav-link ${pathname==='/book'?'active':''}`}>Book Appointment</Link>
          <Link to="/reviews" className={`nav-link ${pathname==='/reviews'?'active':''}`}>Reviews</Link>
          <a href="tel:+254729113409" className="nav-link">Call Us</a>
          <a href="https://wa.me/254704719695?text=Hello%20Orthonexis%2C%20I%20would%20like%20to%20book%20an%20appointment" target="_blank" rel="noopener noreferrer" className="nav-link">WhatsApp Us</a>
        </div>

        {/* Desktop right */}
        <div className="nav-right-desktop">
          {isAdmin ? (
            <>
              <Link to="/admin-orthonexis/reviews" className="btn btn-outline" style={{marginRight:8}}>📝 Reviews</Link>
              <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/admin-orthonexis" className="btn btn-outline">Staff Login</Link>
          )}
        </div>

        {/* Mobile: horizontal nav + hamburger */}
        <div className="mobile-nav-row">
          <div className="mobile-nav-links">
            <Link to="/" className={`nav-link ${pathname==='/'?'active':''}`} onClick={closeMenu}>Home</Link>
            <Link to="/book" className={`nav-link ${pathname==='/book'?'active':''}`} onClick={closeMenu}>Book</Link>
            <Link to="/reviews" className={`nav-link ${pathname==='/reviews'?'active':''}`} onClick={closeMenu}>Reviews</Link>
            <a href="tel:+254729113409" className="nav-link" onClick={closeMenu}>Call Us</a>
            <a href="https://wa.me/254704719695?text=Hello%20Orthonexis%2C%20I%20would%20like%20to%20book%20an%20appointment" target="_blank" rel="noopener noreferrer" className="nav-link" onClick={closeMenu}>WhatsApp Us</a>
          </div>
          <button
            className="hamburger-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>

      </div>

      {/* Mobile dropdown — Staff Login only */}
      {mobileOpen && (
        <div className="mobile-dropdown">
          {isAdmin ? (
            <>
              <Link to="/admin-orthonexis/reviews" className="mobile-dropdown-item" onClick={closeMenu}>📝 Patient Reviews</Link>
              <button className="mobile-dropdown-item" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/admin-orthonexis" className="mobile-dropdown-item" onClick={closeMenu}>🔐 Staff Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
