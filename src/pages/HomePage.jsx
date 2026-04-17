import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../utils/services';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <div style={{textAlign:"center",marginBottom:6,fontWeight:700,fontSize:18,color:"#0f3638",letterSpacing:0.5}}>Orthonexis Physiotherapy Health Group</div>
          <div className="hero-badge">📍 Grandview Building, 198, Kapsabet 30100</div>
          <h1>Pain Free.<br /><span>Move Healthy.</span></h1>
          <p>Orthonexis Physiotherapy Health Group offers expert, personalized physiotherapy and rehabilitation services — including home-based care — for every stage of your recovery journey.</p>
          <div className="hero-actions">
            <Link to="/book"><button className="hero-cta">Book Appointment</button></Link>
            <a href="#services"><button className="hero-cta-outline">Our Services</button></a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><strong>500+</strong><span>Patients Treated</span></div>
            <div className="hero-stat"><strong>9</strong><span>Specializations</span></div>
            <div className="hero-stat"><strong>🏠</strong><span>Home Care Available</span></div>
          </div>
        </div>
      </section>

      <section className="how-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">How It Works</div>
            <h2>Your Recovery in 3 Simple Steps</h2>
            <p>From booking to full recovery, we make it seamless.</p>
          </div>
          <div className="steps-grid">
            {[
              {n:1, title:'Choose Service', desc:'Select the physiotherapy service that fits your needs.'},
              {n:2, title:'Pick Date & Time', desc:'Choose a convenient slot from available times.'},
              {n:3, title:'Get Confirmation', desc:'Our team confirms your booking instantly.'}
            ].map(s => (
              <div className="step-card" key={s.n}>
                <div className="step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Our Services</div>
            <h2>Comprehensive Physiotherapy Care</h2>
            <p>We treat the full spectrum of physical conditions — in clinic or at your home.</p>
          </div>
          <div className="services-grid">
            {SERVICES.map(s => (
              <div className={`service-card${s.id === 'home-care' ? ' home-care' : ''}`} key={s.id}>
                <div className="service-icon">{s.icon}</div>
                <div className="service-category">{s.category}</div>
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                <div className="service-subs">
                  {s.subServices.map(sub => <span className="service-sub" key={sub}>{sub}</span>)}
                </div>
                <div className="service-footer">
                  <span className="service-duration">⏱ {s.duration}</span>
                  {s.badge && <span className="service-badge">{s.badge}</span>}
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center', marginTop:40}}>
            <Link to="/book">
              <button className="btn btn-primary" style={{padding:'14px 36px', fontSize:15}}>Book Your Appointment</button>
            </Link>
          </div>
        </div>
      </section>

      <section style={{background:'#1a2a4a', color:'#fff', padding:'60px 0'}}>
        <div className="container" style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:32}}>
          <div>
            <h3 style={{fontFamily:'var(--font-display)', fontSize:20, marginBottom:12, color:'#6dd5a0'}}>Orthonexis</h3>
            <p style={{fontSize:14, opacity:.75, lineHeight:1.7}}>Pain free. Move healthy.<br/>Your trusted physiotherapy partner in Kapsabet.</p>
          </div>
          <div>
            <h4 style={{fontSize:13, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', opacity:.5, marginBottom:12}}>Location</h4>
            <p style={{fontSize:14, opacity:.85, lineHeight:1.8}}>Grandview Building<br/>198, Kapsabet<br/>30100, Kenya</p>
          </div>
          <div>
            <h4 style={{fontSize:13, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', opacity:.5, marginBottom:12}}>Contact</h4>
            <p style={{fontSize:14, opacity:.85, lineHeight:1.8}}>📞 0729 113 409<br/>💬 WhatsApp: +254 704 719 695</p>
          </div>
          <div>
            <h4 style={{fontSize:13, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', opacity:.5, marginBottom:12}}>Hours</h4>
            <p style={{fontSize:14, opacity:.85, lineHeight:1.8}}>Mon–Fri: 8:00 AM – 6:00 PM<br/>Saturday: 8:00 AM – 2:00 PM<br/>Sunday: Closed</p>
          </div>
        </div>
      </section>
    </main>
  );
}
