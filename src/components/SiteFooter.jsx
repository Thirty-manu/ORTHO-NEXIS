import React from 'react';

export default function SiteFooter() {
  return (
    <section style={{ background: '#1a2a4a', color: '#fff', padding: '60px 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 32 }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 12, color: '#6dd5a0' }}>Orthonexis</h3>
          <p style={{ fontSize: 14, opacity: 0.75, lineHeight: 1.7 }}>Pain free. Move healthy.<br />Your trusted physiotherapy partner in Kapsabet.</p>
        </div>
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.5, marginBottom: 12 }}>Location</h4>
          <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.8 }}>next to Rubis petrol station,<br />Kapsabet Sports house MCCU Building.</p>
          <div style={{ marginTop: 16, borderRadius: 10, overflow: 'hidden' }}>
            <iframe
              title="Orthonexis Location"
              src="https://maps.google.com/maps?q=6432%2B35F%20Kapsabet%2C%20Kenya&z=17&output=embed"
              width="100%"
              height="220"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=6432%2B35F%20Kapsabet%2C%20Kenya"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', marginTop: 10, color: '#6dd5a0', fontWeight: 700, fontSize: 14 }}
          >
            📍 Open in Google Maps
          </a>
        </div>
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.5, marginBottom: 12 }}>Call Us</h4>
          <p style={{ fontSize: 14, opacity: 0.92, lineHeight: 2 }}>
            <a href="tel:+254710622217" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 700 }}>📞 0710 622 217</a><br />
            <a href="https://wa.me/254710622217" target="_blank" rel="noopener noreferrer" style={{ color: '#6dd5a0', textDecoration: 'none', fontWeight: 600 }}>💬 WhatsApp: 0710 622 217</a><br />
            <a href="tel:+254710590386" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 700 }}>📞 0710 590 386</a>
          </p>
        </div>
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.5, marginBottom: 12 }}>Co-Founders</h4>
          <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.8 }}>Eleazer Kiplimo<br />Faith Samoei</p>
        </div>
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.5, marginBottom: 12 }}>Hours</h4>
          <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.8 }}>Mon–Fri: 8:00 AM – 6:00 PM<br />Saturday: 8:00 AM – 2:00 PM<br />Sunday: Closed</p>
        </div>
      </div>
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 40, paddingTop: 20, textAlign: "center", fontSize: 13, opacity: 0.5 }}>© {new Date().getFullYear()} Orthonexis Physiotherapy. All rights reserved.</div>
    </section>
  );
}
