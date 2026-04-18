import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../utils/services';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <div style={{textAlign:"center", marginBottom:16}}>
            <img src="/logo.png" alt="Orthonexis" style={{height:120, width:120, objectFit:"contain", borderRadius:"50%", background:"#fff", boxShadow:"0 4px 20px rgba(0,0,0,0.15)", display:"inline-block"}} />
          </div>
          <div style={{textAlign:"center",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center",gap:14,width:"100%"}}>
            <div style={{height:1, flex:1, maxWidth:60, background:"rgba(255,255,255,0.35)"}}></div>
            <span style={{fontSize:17,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"#6dd5a0",whiteSpace:"nowrap"}}>Orthonexis Physiotherapy Health Group</span>
            <div style={{height:1, flex:1, maxWidth:60, background:"rgba(255,255,255,0.35)"}}></div>
          </div>
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
          <div style={{marginTop:40,borderRadius:16,overflow:'hidden',boxShadow:'0 8px 40px rgba(0,0,0,0.25)',maxWidth:820,marginLeft:'auto',marginRight:'auto'}}>
            <img src="/clinic-physio1.jpg" alt="Orthonexis physiotherapist treating a patient" style={{width:'100%',height:380,objectFit:'cover',display:'block'}} loading="lazy" />
          </div>
        </div>
      </section>

      <section style={{padding:'70px 0', background:'#fff'}}>
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,alignItems:'center'}}>
            <div>
              <div style={{display:'inline-block',background:'#e6f4ef',color:'#01696f',fontSize:12,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',padding:'4px 14px',borderRadius:20,marginBottom:16}}>About Us</div>
              <h2 style={{fontSize:28,fontWeight:800,color:'#1a2a4a',marginBottom:18,lineHeight:1.3}}>Dedicated to Evidence-Based Rehabilitation</h2>
              <p style={{color:'#4a5568',fontSize:15,lineHeight:1.85,marginBottom:14}}>Orthonexis Physiotherapy is dedicated to providing evidence-based rehabilitation and personalized treatment plans.</p>
              <p style={{color:'#4a5568',fontSize:15,lineHeight:1.85}}>Our goal is to restore movement, reduce pain, and improve quality of life through modern physiotherapy techniques.</p>
            </div>
            <div style={{borderRadius:16,overflow:'hidden',boxShadow:'0 8px 32px rgba(0,0,0,0.10)',background:'#f0f7f4',display:'flex',alignItems:'center',justifyContent:'center',padding:40,minHeight:280}}>
              <img src="/logo.png" alt="Orthonexis Physiotherapy Health Group" style={{width:'100%',maxWidth:260,objectFit:'contain',display:'block'}} loading="lazy" />
            </div>
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
            {[{n:1,title:'Choose Service',desc:'Select the physiotherapy service that fits your needs.'},{n:2,title:'Pick Date & Time',desc:'Choose a convenient slot from available times.'},{n:3,title:'Get Confirmation',desc:'Our team confirms your booking instantly.'}].map(s => (
              <div className="step-card" key={s.n}>
                <div className="step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'0 0 60px 0',background:'#f7f9fb'}}>
        <div className="container">
          <div style={{borderRadius:16,overflow:'hidden',boxShadow:'0 6px 32px rgba(0,0,0,0.10)',position:'relative'}}>
            <img src="/clinic-interior.jpg" alt="Orthonexis clinic interior" style={{width:'100%',height:420,objectFit:'cover',display:'block'}} loading="lazy" />
            <div style={{position:'absolute',bottom:0,left:0,right:0,background:'linear-gradient(transparent, rgba(10,30,60,0.75))',padding:'32px 28px 24px'}}>
              <p style={{color:'#fff',fontWeight:700,fontSize:20,margin:0}}>State-of-the-Art Physiotherapy Facility</p>
              <p style={{color:'rgba(255,255,255,0.8)',fontSize:14,margin:'6px 0 0'}}>Modern treatment rooms, electrotherapy area & dedicated rehabilitation equipment</p>
            </div>
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
          <div style={{textAlign:'center',marginTop:40}}>
            <Link to="/book"><button className="btn btn-primary" style={{padding:'14px 36px',fontSize:15}}>Book Your Appointment</button></Link>
          </div>
        </div>
      </section>

      <section style={{padding:'60px 0',background:'#eaf4f0'}}>
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:32,alignItems:'center'}}>
            <div>
              <div style={{display:'inline-block',background:'#1a5c3a',color:'#6dd5a0',fontSize:12,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',padding:'4px 14px',borderRadius:20,marginBottom:16}}>Expert Care</div>
              <h2 style={{fontSize:28,fontWeight:800,color:'#1a2a4a',marginBottom:14,lineHeight:1.3}}>Hands-On Therapy from Trained Professionals</h2>
              <p style={{color:'#4a5568',fontSize:15,lineHeight:1.8,marginBottom:20}}>Our licensed physiotherapists use evidence-based techniques to restore movement, reduce pain and help you get back to doing what you love — faster.</p>
              <Link to="/book"><button className="btn btn-primary" style={{padding:'12px 28px',fontSize:14}}>Book a Session</button></Link>
            </div>
            <div style={{borderRadius:16,overflow:'hidden',boxShadow:'0 8px 32px rgba(0,0,0,0.12)'}}>
              <img src="/clinic-physio2.jpg" alt="Orthonexis therapist performing knee rehabilitation" style={{width:'100%',height:360,objectFit:'cover',display:'block'}} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section style={{background:'#1a2a4a',color:'#fff',padding:'60px 0'}}>
        <div className="container" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:32}}>
          <div>
            <h3 style={{fontFamily:'var(--font-display)',fontSize:20,marginBottom:12,color:'#6dd5a0'}}>Orthonexis</h3>
            <p style={{fontSize:14,opacity:.75,lineHeight:1.7}}>Pain free. Move healthy.<br/>Your trusted physiotherapy partner in Kapsabet.</p>
          </div>
          <div>
            <h4 style={{fontSize:13,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',opacity:.5,marginBottom:12}}>Location</h4>
            <p style={{fontSize:14,opacity:.85,lineHeight:1.8}}>Grandview Building<br/>198, Kapsabet<br/>30100, Kenya</p>
          </div>
          <div>
            <h4 style={{fontSize:13,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',opacity:.5,marginBottom:12}}>Contact</h4>
            <p style={{fontSize:14,opacity:.85,lineHeight:1.8}}>📞 0729 113 409<br/>💬 WhatsApp: +254 704 719 695<br/>✉️ <a href="mailto:Info@orthonexisphysiotherapy.com" style={{color:'#6dd5a0',textDecoration:'none'}}>Info@orthonexisphysiotherapy.com</a></p>
          </div>
          <div>
            <h4 style={{fontSize:13,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',opacity:.5,marginBottom:12}}>Hours</h4>
            <p style={{fontSize:14,opacity:.85,lineHeight:1.8}}>Mon–Fri: 8:00 AM – 6:00 PM<br/>Saturday: 8:00 AM – 2:00 PM<br/>Sunday: Closed</p>
          </div>
        </div>
        <div style={{textAlign:'center',marginTop:32,paddingTop:24,borderTop:'1px solid rgba(255,255,255,0.1)',fontSize:13,opacity:.5,color:'#fff'}}>
          © {new Date().getFullYear()} Orthonexis Physiotherapy Health Group. All rights reserved.
        </div>
      </section>
    </main>
  );
}