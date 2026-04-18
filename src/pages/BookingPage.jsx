import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { SERVICES, TIME_SLOTS } from '../utils/services';
import toast from 'react-hot-toast';

const STEPS = ['Select Service', 'Date & Time', 'Your Details', 'Confirm & Book'];

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

  const stepSummary = [
    form.serviceId ? `${selectedService?.name}${form.subService ? ' · ' + form.subService : ''}` : null,
    form.date && form.time ? `${form.date} at ${form.time}` : null,
    form.patientName && form.phone ? `${form.patientName} · ${form.phone}` : null,
    null
  ];

  return (
    <div className="booking-page">
      <div className="container" style={{maxWidth:620, paddingTop:32, paddingBottom:60}}>
        <h1 style={{fontSize:'clamp(1.4rem,4vw,1.8rem)', marginBottom:6}}>Book an Appointment</h1>
        <p style={{color:'var(--color-text-muted)', marginBottom:28, fontSize:14}}>📍 Orthonexis Physiotherapy — Grandview Building, Kapsabet 30100</p>

        <div style={{display:'flex', flexDirection:'column', gap:12}}>
          {STEPS.map((label, i) => {
            const isActive = step === i;
            const isDone = step > i;
            return (
              <div key={i} style={{borderRadius:12, border:`2px solid ${isActive ? 'var(--color-primary)' : isDone ? '#c3e6d8' : 'var(--color-border)'}`, overflow:'hidden', background: isActive ? '#fff' : isDone ? '#f4fbf7' : 'var(--color-surface)', transition:'all 200ms'}}>
                
                {/* Step Header */}
                <div
                  onClick={() => isDone && setStep(i)}
                  style={{display:'flex', alignItems:'center', gap:14, padding:'14px 18px', cursor: isDone ? 'pointer' : 'default'}}
                >
                  <div style={{width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:14, flexShrink:0,
                    background: isActive ? 'var(--color-primary)' : isDone ? '#2e7d52' : 'var(--color-surface-offset)',
                    color: isActive || isDone ? '#fff' : 'var(--color-text-muted)'
                  }}>
                    {isDone ? '✓' : i + 1}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700, fontSize:15, color: isActive ? 'var(--color-primary)' : isDone ? '#2e7d52' : 'var(--color-text-muted)'}}>{label}</div>
                    {isDone && stepSummary[i] && (
                      <div style={{fontSize:12, color:'#2e7d52', marginTop:2}}>{stepSummary[i]}</div>
                    )}
                  </div>
                  {isDone && <span style={{fontSize:12, color:'var(--color-primary)', fontWeight:600}}>Edit</span>}
                </div>

                {/* Step Content — only shown when active */}
                {isActive && (
                  <div style={{padding:'0 18px 20px'}}>
                    <div style={{height:1, background:'var(--color-border)', marginBottom:18}}></div>

                    {/* Step 0 — Service */}
                    {i === 0 && (
                      <div>
                        <div style={{display:'flex', flexDirection:'column', gap:8}}>
                          {SERVICES.map(s => (
                            <div key={s.id}
                              onClick={() => { set('serviceId', s.id); set('subService', ''); set('isHomeCare', s.id==='home-care'); }}
                              style={{padding:'12px 14px', border:`2px solid ${form.serviceId===s.id?'var(--color-primary)':'var(--color-border)'}`, borderRadius:10, cursor:'pointer', display:'flex', alignItems:'center', gap:12, background:form.serviceId===s.id?'var(--color-primary-light)':'var(--color-surface)', transition:'all 180ms'}}>
                              <span style={{fontSize:20}}>{s.icon}</span>
                              <div style={{flex:1}}>
                                <div style={{fontWeight:700, fontSize:14}}>{s.name}</div>
                                <div style={{fontSize:12, color:'var(--color-text-muted)'}}>{s.category} · {s.duration}</div>
                              </div>
                              {s.badge && <span className="service-badge" style={{fontSize:11}}>{s.badge}</span>}
                            </div>
                          ))}
                        </div>
                        {selectedService && (
                          <div className="form-group" style={{marginTop:16}}>
                            <label>Specific Concern</label>
                            <select value={form.subService} onChange={e => set('subService', e.target.value)}>
                              <option value="">-- Select specific concern --</option>
                              {selectedService.subServices.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                            </select>
                          </div>
                        )}
                        <button className="btn btn-primary" style={{marginTop:16, width:'100%', justifyContent:'center'}} disabled={!form.serviceId} onClick={()=>setStep(1)}>
                          Next: Date & Time →
                        </button>
                      </div>
                    )}

                    {/* Step 1 — Date & Time */}
                    {i === 1 && (
                      <div>
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
                        <div style={{display:'flex', gap:10, marginTop:20}}>
                          <button className="btn btn-outline" onClick={()=>setStep(0)}>← Back</button>
                          <button className="btn btn-primary" style={{flex:1, justifyContent:'center'}} disabled={!form.date||!form.time} onClick={()=>setStep(2)}>Next: Your Details →</button>
                        </div>
                      </div>
                    )}

                    {/* Step 2 — Details */}
                    {i === 2 && (
                      <div>
                        <div className="form-group">
                          <label>Full Name *</label>
                          <input placeholder="e.g. John Kamau" value={form.patientName} onChange={e=>set('patientName',e.target.value)}/>
                        </div>
                        <div className="form-group">
                          <label>Phone Number *</label>
                          <input placeholder="e.g. 0722 000 000" value={form.phone} onChange={e=>set('phone',e.target.value)}/>
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

                    {/* Step 3 — Confirm */}
                    {i === 3 && (
                      <div>
                        <div style={{background:'var(--color-surface)', border:'1px solid var(--color-border)', borderRadius:10, padding:16, marginBottom:16}}>
                          {[['Service',selectedService?.name],['Concern',form.subService||'—'],['Date',form.date],['Time',form.time],['Name',form.patientName],['Phone',form.phone],['Email',form.email||'—'],['Location',form.isHomeCare?`Home Visit: ${form.address}`:'Grandview Building, Kapsabet'],['Notes',form.notes||'—']].map(([k,v])=>(
                            <div key={k} style={{display:'flex', justifyContent:'space-between', gap:12, padding:'7px 0', borderBottom:'1px solid var(--color-border)', fontSize:14}}>
                              <span style={{color:'var(--color-text-muted)'}}>{k}</span>
                              <span style={{fontWeight:600, textAlign:'right', maxWidth:'60%'}}>{v}</span>
                            </div>
                          ))}
                        </div>
                        <div style={{background:'#fff8e1', border:'1px solid #ffe082', borderRadius:8, padding:12, fontSize:13, color:'#7a5c00', marginBottom:16}}>
                          📞 Our team will confirm via call to <strong>{form.phone}</strong>
                        </div>
                        <div style={{display:'flex', gap:10}}>
                          <button className="btn btn-outline" onClick={()=>setStep(2)}>← Back</button>
                          <button className="btn btn-primary" style={{flex:1, justifyContent:'center', padding:14}} disabled={loading} onClick={handleSubmit}>
                            {loading ? 'Submitting...' : '✅ Confirm Booking'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{textAlign:'center', marginTop:40, paddingTop:24, borderTop:'1px solid var(--color-border)', fontSize:13, color:'var(--color-text-muted)'}}>
          © {new Date().getFullYear()} Orthonexis Physiotherapy Health Group. All rights reserved.
        </div>
      </div>
    </div>
  );
}
