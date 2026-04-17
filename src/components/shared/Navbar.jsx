import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { isAdmin, adminLogout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleLogout() {
    adminLogout();
    navigate('/');
    toast.success('Admin logged out');
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15" fill="#0c5fa5"/>
            <path d="M16 6C16 6 10 10 10 16C10 22 16 26 16 26C16 26 22 22 22 16C22 10 16 6 16 6Z" fill="none" stroke="#6dd5a0" strokeWidth="2"/>
            <circle cx="16" cy="16" r="3" fill="#fff"/>
          </svg>
          ORTHO<span>NEXIS</span>
        </Link>
        <div className="navbar-nav">
          <Link to="/" className={pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/book" className={pathname === '/book' ? 'active' : ''}>Book Appointment</Link>
          {isAdmin && <Link to="/admin-orthonexis" className={pathname === '/admin-orthonexis' ? 'active' : ''}>Admin Panel</Link>}
        </div>
        <div className="nav-user">
          {isAdmin ? (
            <button className="btn btn-ghost" onClick={handleLogout}>Logout Admin</button>
          ) : (
            <Link to="/admin-orthonexis" className="btn btn-outline" style={{fontSize:13}}>Staff Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
