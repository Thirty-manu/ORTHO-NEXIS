import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { isAdmin, adminLogout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    adminLogout();
    navigate('/');
    toast.success('Admin logged out');
    setMobileOpen(false);
  }

  function closeMenus() {
    setContactOpen(false);
    setMobileOpen(false);
  }

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-inner">
          <Link to="/" onClick={closeMenus} className="navbar-logo-link">
            <div className="navbar-logo-wrap">
              <img
                src="/logo.png"
                alt="Orthonexis Physiotherapy Health Group"
                className="navbar-logo-img"
              />
            </div>
          </Link>

          <div className="navbar-nav desktop-nav">
            <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
            <Link to="/book" className={`nav-link ${pathname === '/book' ? 'active' : ''}`}>Book Appointment</Link>

            <div className="contact-menu-wrap">
              <button
                className={`nav-link nav-btn ${contactOpen ? 'active' : ''}`}
                onClick={() => setContactOpen(!contactOpen)}
                type="button"
              >
                Contact Us
                <span className="caret">{contactOpen ? '▲' : '▼'}</span>
              </button>

              {contactOpen && (
                <div className="contact-dropdown">
                  <a href="tel:0729113409" className="contact-item">
                    <div className="contact-icon blue-bg">📞</div>
                    <div>
                      <div className="contact-item-title">Call Us</div>
                      <div className="contact-item-val blue-text">0729 113 409</div>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/254704719695?text=Hello%20Orthonexis%2C%20I%20would%20like%20to%20book%20an%20appointment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item"
                  >
                    <div className="contact-icon green-bg">💬</div>
                    <div>
                      <div className="contact-item-title">WhatsApp</div>
                      <div className="contact-item-val green-text">+254 704 719 695</div>
                    </div>
                  </a>

                  <div className="contact-footer">
                    📍 Grandview Building, 198, Kapsabet 30100<br />
                    🕐 Mon–Fri: 8AM–6PM
                  </div>
                </div>
              )}
            </div>

            {isAdmin && (
              <Link to="/admin-orthonexis/dashboard" className={`nav-link ${pathname.includes('/admin') ? 'active' : ''}`}>
                Admin Panel
              </Link>
            )}
          </div>

          <div className="nav-right-desktop">
            <a href="tel:0729113409" className="nav-call-btn">Call Now</a>
            {isAdmin ? (
              <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/admin-orthonexis" className="btn btn-outline">Staff Login</Link>
            )}
          </div>

          <button
            className="hamburger"
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`ham-line ${mobileOpen ? 'ham-top-open' : ''}`}></span>
            <span className={`ham-line ${mobileOpen ? 'ham-mid-open' : ''}`}></span>
            <span className={`ham-line ${mobileOpen ? 'ham-bot-open' : ''}`}></span>
          </button>
        </div>

        {mobileOpen && (
          <div className="mobile-menu">
            <Link to="/" className="mobile-nav-link" onClick={closeMenus}>Home</Link>
            <Link to="/book" className="mobile-nav-link" onClick={closeMenus}>Book Appointment</Link>

            <div className="mobile-contact-box">
              <div className="mobile-contact-title">Contact Us</div>
              <a href="tel:0729113409" className="mobile-contact-btn blue-btn">📞 Call: 0729 113 409</a>
              <a
                href="https://wa.me/254704719695?text=Hello%20Orthonexis%2C%20I%20would%20like%20to%20book%20an%20appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-contact-btn green-btn"
              >
                💬 WhatsApp: +254 704 719 695
              </a>
            </div>

            {isAdmin && (
              <Link to="/admin-orthonexis/dashboard" className="mobile-nav-link" onClick={closeMenus}>
                Admin Panel
              </Link>
            )}

            {isAdmin ? (
              <button className="mobile-nav-link mobile-logout" onClick={handleLogout}>Logout Admin</button>
            ) : (
              <Link to="/admin-orthonexis" className="mobile-nav-link" onClick={closeMenus}>Staff Login</Link>
            )}

            <div className="mobile-location">
              📍 Grandview Building, 198, Kapsabet 30100
            </div>
          </div>
        )}
      </nav>

      {contactOpen && <div className="backdrop-close" onClick={() => setContactOpen(false)}></div>}
    </>
  );
}
