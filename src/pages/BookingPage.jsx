import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { SERVICES, TIME_SLOTS } from '../utils/services';
import toast from 'react-hot-toast';

const STEPS = ['Service', 'Date & Time', 'Your Details', 'Confirm'];

export default function BookingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');
  const [form, setForm] = useState({
    patientName:'', phone:'', email:'',
    serviceId:'', subService:'', date:'', time:'',
    notes:'', isHomeCare:false, address:''
  });

  const selectedService = SERVICES.find(s => s.id === form.serviceId);
  const set = (f, v) => setForm(p => ({...p, [f]: v}));
  const minDate = new Date(); minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  async function handleSubmit() {
    setLoading(true);
    try {
      const ref = 'OPN-' + Date.now().toString().slice(-6);
      await addDoc(collection(db, 'appointments'), {
        patientName: form.patientName,
        patientEmail: form.email,
        phone: form.phone,
        serviceId: form.serviceId,
        serviceName: selectedService.name,
        subService: form.subService,
        date: form.date,
        time: form.time,
        notes: form.notes,
        isHomeCare: form.isHomeCare,
        address: form.isHomeCare ? form.address : 'Grandview Building, 198, Kapsabet 30100',
        status: 'pending',
        refCode: ref,
        createdAt: serverTimestamp()
      });
      setRefCode(ref);
      setSubmitted(true);
    } catch(e) { toast.error('Booking failed. Please try again.'); }
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="booking-page">
        <div className="container" style={{maxWidth:560, textAlign:'center', paddingTop:60}}>
          <div style={{fontSize:64, marginBottom:16}}>✅</div>
          <h1 style={{fontSize:'1.8rem', marginBottom:8}}>Booking Received!</h1>
          <p style={{color:'var(--color-text-muted)', marginBottom:24, fontSize:15}}>
            Thank you <strong>{form.patientName}</strong>. Our team will call you on <strong>{form.phone}</strong> to confirm your appointment.
          </p>
          <div style={{background:'var(--color-primary-light)', borderRadius:'var(--radius-lg)', padding:24, marginBottom:32}}>
            <div style={{fontSize:13, color:'var(--color-text-muted)', marginBottom:6}}>Your Reference Number</div>
            <div style={{fontSize:28, fontWeight:800, color:'var(--color-primary)', letterSpacing:'0.08em'}}>{refCode}</div>
            <div style={{fontSize:12, color:'var(--color-text-muted)', marginTop:6}}>Save this number to track your appointment</div>
          </div>
          <div style={{background:'var(--color-surface)', border:'1px solid var(--color-border)', borderRadius:'var(--radius-lg)', padding:20, textAlign:'left', marginBottom:24}}>
            {[['Service', selectedService?.name], ['Concern', form.subService||'—'], ['Date', form.date], ['Time', form.time], ['Location', form.isHomeCare ? `Home Visit: ${form.address}` : 'Grandview Building, 198, Kapsabet 30100']].map(([k,v]) => (
              <div key={k} style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--color-border)', fontSize:14}}>
                <span style={{color:'var(--color-text-muted)'}}>{k}</span>
                <span style={{fontWeight:600}}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{fontSize:13, color:'var(--color-text-muted)', background:'#fff8e1', border:'1px solid #ffe082', borderRadius:'var(--radius-md)', padding:12, marginBottom:24}}>
            📞 For inquiries call <strong>0729 113 409</strong> or WhatsApp <strong>+254 704 719 695</strong>
          </div>
          <button className="btn btn-primary" style={{width:'100%', justifyContent:'center', padding:14}} onClick={()=>navigate('/')}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="container">
        <h1>Book an Appointment</h1>
        <p className="subtitle">Orthonexis Physiotherapy — Grandview Building, Kapsabet 30100</p>
        <div className="booking-layout">
          <div className="booking-form">
            <div className="booking-steps">
              {STEPS.map((s, i) => (
                <React.Fragment key={s}>
                  <div className="booking-step">
                    <div className="step-indicator">
                      <div className={`step-dot ${i===step?'active':i<step?'done':''}`}>{i < step ? '✓' : i+1}</div>
                      <span className={`step-label ${i===step?'active':''}`}>{s}</span>
                    </div>
                  </div>
                  {i < STEPS.length-1 && <div className={`step-connector ${i<step?'done':''}`}/>}
                </React.Fragment>
              ))}
            </div>

            {step===0 && (
              <div>
                <h3 style={{marginBottom:16, fontSize:16}}>Select a Service</h3>
                <div style={{display:'flex', flexDirection:'column', gap:10}}>
                  {SERVICES.map(s => (
                    <div key={s.id}
                      onClick={() => { set('serviceId', s.id); set('subService', ''); set('isHomeCare', s.id==='home-care'); }}
                      style={{padding:'14px 16px', border:`2px solid ${form.serviceId===s.id?'var(--color-primary)':'var(--color-border)'}`, borderRadius:'var(--radius-md)', cursor:'pointer', display:'flex', alignItems:'center', gap:12, background:form.serviceId===s.id?'var(--color-primary-light)':'var(--color-surface)', transition:'all 180ms'}}>
                      <span style={{fontSize:22}}>{s.icon}</span>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700, fontSize:14}}>{s.name}</div>
                        <div style={{fontSize:12, color:'var(--color-text-muted)'}}>{s.category} · {s.duration}</div>
                      </div>
                      {s.badge && <span className="service-badge" style={{fontSize:11}}>{s.badge}</span>}
                    </div>
                  ))}
                </div>
                {selectedService && (
                  <div style={{marginTop:20}}>
                    <div className="form-group">
                      <label>Specific Concern</label>
                      <select value={form.subService} onChange={e => set('subService', e.target.value)}>
                        <option value="">-- Select specific concern --</option>
                        {selectedService.subServices.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                      </select>
                    </div>
                  </div>
                )}
                <button className="btn btn-primary" style={{marginTop:20, width:'100%', justifyContent:'center'}} disabled={!form.serviceId} onClick={()=>setStep(1)}>Next: Choose Date & Time →</button>
              </div>
            )}

            {step===1 && (
              <div>
                <h3 style={{marginBottom:16, fontSize:16}}>Select Date & Time</h3>
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input type="date" min={minDateStr} value={form.date} onChange={e => set('date', e.target.value)}/>
                </div>
                {form.date && (
                  <>
                    <label style={{fontSize:14, fontWeight:600, display:'block', marginBottom:10}}>Available Time Slots</label>
                    <div className="time-slots">
                      {TIME_SLOTS.map(t => <div key={t} className={`time-slot ${form.time===t?'selected':''}`} onClick={()=>set('time',t)}>{t}</div>)}
                    </div>
                  </>
                )}
                <div style={{display:'flex', gap:10, marginTop:24}}>
                  <button className="btn btn-outline" onClick={()=>setStep(0)}>← Back</button>
                  <button className="btn btn-primary" style={{flex:1, justifyContent:'center'}} disabled={!form.date||!form.time} onClick={()=>setStep(2)}>Next: Your Details →</button>
                </div>
              </div>
            )}

            {step===2 && (
              <div>
                <h3 style={{marginBottom:16, fontSize:16}}>Your Contact Details</h3>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input placeholder="e.g. John Kamau" value={form.patientName} onChange={e=>set('patientName',e.target.value)} required/>
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input placeholder="e.g. 0722 000 000" value={form.phone} onChange={e=>set('phone',e.target.value)} required/>
                </div>
                <div className="form-group">
                  <label>Email Address (optional)</label>
                  <input type="email" placeholder="you@example.com" value={form.email} onChange={e=>set('email',e.target.value)}/>
                </div>
                {form.isHomeCare && (
                  <div className="form-group">
                    <label>Home Address for Visit *</label>
                    <textarea rows={3} placeholder="Street, estate, landmark..." value={form.address} onChange={e=>set('address',e.target.value)}/>
                  </div>
                )}
                <div className="form-group">
                  <label>Additional Notes (optional)</label>
                  <textarea rows={3} placeholder="Describe your symptoms or any special needs..." value={form.notes} onChange={e=>set('notes',e.target.value)}/>
                </div>
                <div style={{display:'flex', gap:10, marginTop:8}}>
                  <button className="btn btn-outline" onClick={()=>setStep(1)}>← Back</button>
                  <button className="btn btn-primary" style={{flex:1, justifyContent:'center'}} disabled={!form.patientName||!form.phone||(form.isHomeCare&&!form.address)} onClick={()=>setStep(3)}>Review Booking →</button>
                </div>
              </div>
            )}

            {step===3 && (
              <div>
                <h3 style={{marginBottom:20, fontSize:16}}>Review & Confirm</h3>
                {[['Name',form.patientName],['Phone',form.phone],['Email',form.email||'—'],['Service',selectedService?.name],['Concern',form.subService||'—'],['Date',form.date],['Time',form.time],['Location',form.isHomeCare?`Home Visit: ${form.address}`:'Grandview Building, 198, Kapsabet 30100'],['Notes',form.notes||'—']].map(([k,v])=>(
                  <div key={k} style={{display:'flex', justifyContent:'space-between', gap:12, marginBottom:10, paddingBottom:10, borderBottom:'1px solid var(--color-border)', fontSize:14}}>
                    <span style={{color:'var(--color-text-muted)'}}>{k}</span>
                    <span style={{fontWeight:600, textAlign:'right'}}>{v}</span>
                  </div>
                ))}
                <div style={{background:'#fff8e1', border:'1px solid #ffe082', borderRadius:'var(--radius-md)', padding:12, marginTop:16, fontSize:13, color:'#7a5c00'}}>
                  ⏳ After booking, our team will call <strong>{form.phone}</strong> to confirm your appointment.
                </div>
                <div style={{display:'flex', gap:10, marginTop:20}}>
                  <button className="btn btn-outline" onClick={()=>setStep(2)}>← Back</button>
                  <button className="btn btn-secondary" style={{flex:1, justifyContent:'center'}} disabled={loading} onClick={handleSubmit}>{loading?'Submitting...':'✓ Confirm Booking'}</button>
                </div>
              </div>
            )}
          </div>

          <div className="booking-summary">
            <div className="summary-title">Booking Summary</div>
            <div className="summary-row"><span className="summary-label">Service</span><span className="summary-value">{selectedService?.name||'—'}</span></div>
            <div className="summary-row"><span className="summary-label">Concern</span><span className="summary-value">{form.subService||'—'}</span></div>
            <div className="summary-row"><span className="summary-label">Date</span><span className="summary-value">{form.date||'—'}</span></div>
            <div className="summary-row"><span className="summary-label">Time</span><span className="summary-value">{form.time||'—'}</span></div>
            <div className="summary-row"><span className="summary-label">Duration</span><span className="summary-value">{selectedService?.duration||'—'}</span></div>
            <div className="summary-location">
              <strong>📍 {form.isHomeCare ? 'Home Visit' : 'Clinic'}</strong><br/>
              {form.isHomeCare ? (form.address||'Address to be provided') : 'Grandview Building, 198, Kapsabet 30100'}
            </div>
            <div style={{marginTop:20, padding:12, background:'var(--color-surface-2)', borderRadius:'var(--radius-md)', fontSize:12, color:'var(--color-text-muted)'}}>
              📞 0729 113 409<br/>💬 +254 704 719 695
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
