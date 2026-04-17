import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { isAdmin, adminLogout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [contactOpen, setContactOpen] = useState(false);

  function handleLogout() {
    adminLogout();
    navigate('/');
    toast.success('Admin logged out');
  }

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-inner">

          {/* LOGO */}
          <Link to="/" className="navbar-logo">
            <svg viewBox="0 0 120 48" width="140" height="48" xmlns="http://www.w3.org/2000/svg">
              {/* Spine figure icon */}
              <circle cx="18" cy="8" r="5" fill="#0c5fa5"/>
              <path d="M15 13 Q10 20 12 28 Q14 34 18 36 Q22 34 24 28 Q26 20 21 13Z" fill="none" stroke="#0c5fa5" strokeWidth="2.5" strokeLinejoin="round"/>
              <path d="M12 28 Q6 32 8 38" fill="none" stroke="#0c5fa5" strokeWidth="2" strokeLinecap="round"/>
              <path d="M24 28 Q30 32 28 38" fill="none" stroke="#0c5fa5" strokeWidth="2" strokeLinecap="round"/>
              {/* Spine dots */}
              <circle cx="18" cy="16" r="1.2" fill="#2eaa5e"/>
              <circle cx="18" cy="20" r="1.2" fill="#2eaa5e"/>
              <circle cx="18" cy="24" r="1.2" fill="#2eaa5e"/>
              <circle cx="18" cy="28" r="1.2" fill="#2eaa5e"/>
              {/* Swoosh arcs */}
              <path d="M6 30 Q18 22 30 30" fill="none" stroke="#2eaa5e" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8 35 Q18 27 28 35" fill="none" stroke="#0c5fa5" strokeWidth="1.5" strokeLinecap="round"/>
              {/* Text */}
              <text x="38" y="22" fontFamily="'Cabinet Grotesk',Georgia,serif" fontWeight="800" fontSize="15" fill="#0c5fa5">ORTHO</text>
              <text x="80" y="22" fontFamily="'Cabinet Grotesk',Georgia,serif" fontWeight="800" fontSize="15" fill="#2eaa5e">NEXIS</text>
              <text x="38" y="33" fontFamily="'Satoshi',sans-serif" fontWeight="400" fontSize="7.5" fill="#5a6478" letterSpacing="1">PHYSIOTHERAPY HEALTH GROUP</text>
              <text x="38" y="44" fontFamily="'Satoshi',sans-serif" fontStyle="italic" fontWeight="600" fontSize="8" fill="#0c5fa5">Pain free. </text>
              <text x="68" y="44" fontFamily="'Satoshi',sans-serif" fontStyle="italic" fontWeight="600" fontSize="8" fill="#2eaa5e">Move healthy.</text>
            </svg>
          </Link>

          {/* NAV LINKS */}
          <div className="navbar-nav">
            <Link to="/" className={pathname === '/' ? 'active' : ''}>Home</Link>
            <Link to="/book" className={pathname === '/book' ? 'active' : ''}>Book Appointment</Link>

            {/* CONTACT US DROPDOWN */}
            <div style={{position:'relative'}}>
              <button
                onClick={() => setContactOpen(!contactOpen)}
                style={{padding:'8px 14px', borderRadius:'var(--radius-md)', fontSize:14, fontWeight:500, color: contactOpen ? 'var(--color-primary)' : 'var(--color-text-muted)', background: contactOpen ? 'var(--color-primary-light)' : 'transparent', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:5, transition:'all var(--transition)'}}>
                Contact Us
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{transform: contactOpen?'rotate(180deg)':'rotate(0)', transition:'transform 200ms'}}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {contactOpen && (
                <div style={{position:'absolute', top:'calc(100% + 8px)', left:0, background:'var(--color-surface)', border:'1.5px solid var(--color-border)', borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow-lg)', width:240, zIndex:200, overflow:'hidden'}}>
                  {/* Call */}
                  <a href="tel:0729113409" style={{display:'flex', alignItems:'center', gap:12, padding:'14px 16px', borderBottom:'1px solid var(--color-border)', textDecoration:'none', transition:'background var(--transition)'}}
                    onMouseEnter={e=>e.currentTarget.style.background='var(--color-primary-light)'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <div style={{width:36, height:36, borderRadius:'50%', background:'#e3f2fd', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0}}>📞</div>
                    <div>
                      <div style={{fontWeight:700, fontSize:13, color:'var(--color-text)'}}>Call Us</div>
                      <div style={{fontSize:12, color:'var(--color-primary)', fontWeight:600}}>0729 113 409</div>
                    </div>
                  </a>
                  {/* WhatsApp */}
                  <a href="https://wa.me/254704719695?text=Hello%20Orthonexis%2C%20I%20would%20like%20to%20make%20an%20inquiry." target="_blank" rel="noopener noreferrer"
                    style={{display:'flex', alignItems:'center', gap:12, padding:'14px 16px', textDecoration:'none', transition:'background var(--transition)'}}
                    onMouseEnter={e=>e.currentTarget.style.background='#e8f5e9'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <div style={{width:36, height:36, borderRadius:'50%', background:'#e8f5e9', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0}}>💬</div>
                    <div>
                      <div style={{fontWeight:700, fontSize:13, color:'var(--color-text)'}}>WhatsApp</div>
                      <div style={{fontSize:12, color:'#2eaa5e', fontWeight:600}}>+254 704 719 695</div>
                    </div>
                  </a>
                  {/* Location */}
                  <div style={{padding:'10px 16px', background:'var(--color-surface-2)', borderTop:'1px solid var(--color-border)'}}>
                    <div style={{fontSize:11, color:'var(--color-text-muted)', lineHeight:1.6}}>
                      📍 Grandview Building, 198<br/>Kapsabet 30100, Kenya
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isAdmin && <Link to="/admin-orthonexis/dashboard" className={pathname.includes('/admin') ? 'active' : ''}>Admin Panel</Link>}
          </div>

          {/* RIGHT SIDE */}
          <div className="nav-user">
            {isAdmin ? (
              <button className="btn btn-ghost" onClick={handleLogout}>Logout Admin</button>
            ) : (
              <Link to="/admin-orthonexis" className="btn btn-outline" style={{fontSize:13}}>Staff Login</Link>
            )}
          </div>
        </div>
      </nav>

      {/* Close dropdown when clicking outside */}
      {contactOpen && (
        <div onClick={() => setContactOpen(false)}
          style={{position:'fixed', inset:0, zIndex:100}}/>
      )}
    </>
  );
}
