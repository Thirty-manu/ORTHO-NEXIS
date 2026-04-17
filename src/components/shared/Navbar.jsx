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

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-inner">

          {/* LOGO */}
          <Link to="/" onClick={() => setMobileOpen(false)} style={{display:'flex', alignItems:'center'}}>
            <img
              src="/logo.png"
              alt="Orthonexis Physiotherapy Health Group"
              style={{height:56, width:'auto', objectFit:'contain', display:'block'}}
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="navbar-nav desktop-nav">
            <Link to="/" className={pathname === '/' ? 'active' : ''}>Home</Link>
            <Link to="/book" className={pathname === '/book' ? 'active' : ''}>Book Appointment</Link>

            {/* CONTACT DROPDOWN */}
            <div style={{position:'relative'}}>
              <button
                onClick={() => setContactOpen(!contactOpen)}
                style={{padding:'8px 14px', borderRadius:'var(--radius-md)', fontSize:14, fontWeight:500, color: contactOpen ? 'var(--color-primary)' : 'var(--color-text-muted)', background: contactOpen ? 'var(--color-primary-light)' : 'transparent', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:5, transition:'all var(--transition)'}}>
                Contact Us
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{transform: contactOpen?'rotate(180deg)':'none', transition:'transform 200ms'}}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {contactOpen && (
                <div style={{position:'absolute', top:'calc(100% + 8px)', left:0, background:'var(--color-surface)', border:'1.5px solid var(--color-border)', borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow-lg)', width:240, zIndex:300, overflow:'hidden'}}>
                  <a href="tel:0729113409"
                    style={{display:'flex', alignItems:'center', gap:12, padding:'14px 16px', borderBottom:'1px solid var(--color-border)', textDecoration:'none', background:'transparent', transition:'background 180ms'}}
                    onMouseEnter={e=>e.currentTarget.style.background='var(--color-primary-light)'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <div style={{width:38, height:38, borderRadius:'50%', background:'#e3f2fd', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0}}>📞</div>
                    <div>
                      <div style={{fontWeight:700, fontSize:13, color:'var(--color-text)'}}>Call Us Now</div>
                      <div style={{fontSize:13, color:'var(--color-primary)', fontWeight:700}}>0729 113 409</div>
                    </div>
                  </a>
                  <a href="https://wa.me/254704719695?text=Hello%20Orthonexis%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
                    target="_blank" rel="noopener noreferrer"
                    style={{display:'flex', alignItems:'center', gap:12, padding:'14px 16px', borderBottom:'1px solid var(--color-border)', textDecoration:'none', background:'transparent', transition:'background 180ms'}}
                    onMouseEnter={e=>e.currentTarget.style.background='#e8f5e9'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <div style={{width:38, height:38, borderRadius:'50%', background:'#e8f5e9', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0}}>💬</div>
                    <div>
                      <div style={{fontWeight:700, fontSize:13, color:'var(--color-text)'}}>WhatsApp Chat</div>
                      <div style={{fontSize:13, color:'#2eaa5e', fontWeight:700}}>+254 704 719 695</div>
                    </div>
                  </a>
                  <div style={{padding:'12px 16px', background:'var(--color-surface-2)'}}>
                    <div style={{fontSize:12, color:'var(--color-text-muted)', lineHeight:1.7}}>
                      📍 Grandview Building, 198<br/>Kapsabet 30100, Kenya<br/>
                      🕐 Mon–Fri: 8AM–6PM · Sat: 8AM–2PM
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isAdmin && <Link to="/admin-orthonexis/dashboard" className={pathname.includes('/admin') ? 'active' : ''}>Admin Panel</Link>}
          </div>

          {/* RIGHT — DESKTOP */}
          <div className="nav-right-desktop">
            {isAdmin ? (
              <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/admin-orthonexis" className="btn btn-outline" style={{fontSize:13}}>Staff Login</Link>
            )}
          </div>

          {/* HAMBURGER — MOBILE */}
          <button
            className="hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu">
            <span style={{display:'block', width:22, height:2, background:'var(--color-text)', borderRadius:2, transition:'all 300ms', transform: mobileOpen?'rotate(45deg) translateY(6px)':'none'}}/>
            <span style={{display:'block', width:22, height:2, background:'var(--color-text)', borderRadius:2, margin:'4px 0', transition:'all 300ms', opacity: mobileOpen?0:1}}/>
            <span style={{display:'block', width:22, height:2, background:'var(--color-text)', borderRadius:2, transition:'all 300ms', transform: mobileOpen?'rotate(-45deg) translateY(-6px)':'none'}}/>
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div style={{background:'var(--color-surface)', borderTop:'1px solid var(--color-border)', padding:'12px 20px 20px'}}>
            <Link to="/" className="mobile-nav-link" onClick={()=>setMobileOpen(false)}>🏠 Home</Link>
            <Link to="/book" className="mobile-nav-link" onClick={()=>setMobileOpen(false)}>📅 Book Appointment</Link>

            {/* MOBILE CONTACT */}
            <div style={{margin:'8px 0', padding:'12px', background:'var(--color-surface-2)', borderRadius:'var(--radius-lg)'}}>
              <div style={{fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', color:'var(--color-text-muted)', marginBottom:10}}>Contact Us</div>
              <a href="tel:0729113409" style={{display:'flex', alignItems:'center', gap:10, padding:'10px 12px', background:'var(--color-surface)', borderRadius:'var(--radius-md)', marginBottom:8, textDecoration:'none', border:'1px solid var(--color-border)'}}>
                <span style={{fontSize:20}}>📞</span>
                <div>
                  <div style={{fontWeight:700, fontSize:13, color:'var(--color-text)'}}>Call Us</div>
                  <div style={{fontSize:12, color:'var(--color-primary)', fontWeight:600}}>0729 113 409</div>
                </div>
              </a>
              <a href="https://wa.me/254704719695?text=Hello%20Orthonexis%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
                target="_blank" rel="noopener noreferrer"
                style={{display:'flex', alignItems:'center', gap:10, padding:'10px 12px', background:'#e8f5e9', borderRadius:'var(--radius-md)', textDecoration:'none', border:'1px solid #c8e6c9'}}>
                <span style={{fontSize:20}}>💬</span>
                <div>
                  <div style={{fontWeight:700, fontSize:13, color:'var(--color-text)'}}>WhatsApp</div>
                  <div style={{fontSize:12, color:'#2eaa5e', fontWeight:600}}>+254 704 719 695</div>
                </div>
              </a>
            </div>

            {isAdmin && <Link to="/admin-orthonexis/dashboard" className="mobile-nav-link" onClick={()=>setMobileOpen(false)}>⚙️ Admin Panel</Link>}
            {isAdmin
              ? <button className="mobile-nav-link" style={{width:'100%', textAlign:'left', border:'none', cursor:'pointer', background:'transparent'}} onClick={handleLogout}>🚪 Logout Admin</button>
              : <Link to="/admin-orthonexis" className="mobile-nav-link" onClick={()=>setMobileOpen(false)}>🔐 Staff Login</Link>}

            <div style={{marginTop:12, padding:'10px 12px', background:'var(--color-primary-light)', borderRadius:'var(--radius-md)', fontSize:12, color:'var(--color-text-muted)'}}>
              📍 Grandview Building, 198, Kapsabet 30100<br/>
              🕐 Mon–Fri: 8AM–6PM · Sat: 8AM–2PM
            </div>
          </div>
        )}
      </nav>

      {/* Close contact dropdown on outside click */}
      {contactOpen && (
        <div onClick={() => setContactOpen(false)}
          style={{position:'fixed', inset:0, zIndex:200}}/>
      )}
    </>
  );
}
