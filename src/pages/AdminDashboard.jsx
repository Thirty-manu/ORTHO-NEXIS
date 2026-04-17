import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function sendWhatsApp(appointment, status) {
  const phone = appointment.phone?.replace(/[\s+]/g, '').replace(/^0/, '254');
  let message = '';

  if (status === 'confirmed') {
    message = `Hello ${appointment.patientName} 👋,

Your appointment at *Orthonexis Physiotherapy Health Group* has been *CONFIRMED* ✅

📋 *Booking Details:*
• Service: ${appointment.serviceName}
${appointment.subService ? `• Concern: ${appointment.subService}` : ''}
• Date: ${appointment.date}
• Time: ${appointment.time}
• Location: ${appointment.isHomeCare ? `🏠 Home Visit - ${appointment.address}` : '🏥 Grandview Building, 198, Kapsabet 30100'}
• Ref No: ${appointment.refCode || '—'}

⚠️ Please arrive 10 minutes early.

For any changes call: 0729 113 409
*Pain free. Move healthy.* 💚`;
  }

  if (status === 'cancelled') {
    message = `Hello ${appointment.patientName},

We regret to inform you that your appointment at *Orthonexis Physiotherapy* on *${appointment.date}* at *${appointment.time}* has been *cancelled* ❌.

To reschedule, please call us:
📞 0729 113 409
💬 WhatsApp: +254 704 719 695

We apologize for any inconvenience.
*Orthonexis Physiotherapy Health Group*`;
  }

  if (status === 'completed') {
    message = `Hello ${appointment.patientName} 🎉,

Your physiotherapy session at *Orthonexis Physiotherapy Health Group* is now marked as *COMPLETED* ✅.

Thank you for choosing us! We hope you are feeling better.

For follow-up appointments:
📞 0729 113 409
💬 WhatsApp: +254 704 719 695

*Pain free. Move healthy.* 💚`;
  }

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (!isAdmin) { navigate('/admin-orthonexis'); return; }
    return onSnapshot(query(collection(db,'appointments'),orderBy('createdAt','desc')), snap => {
      setAppointments(snap.docs.map(d=>({id:d.id,...d.data()}))); setLoading(false);
    });
  }, [isAdmin, navigate]);

  async function updateStatus(appointment, status) {
    try {
      await updateDoc(doc(db,'appointments',appointment.id),{status, updatedAt:new Date().toISOString()});
      toast.success(`Marked as ${status}`);
    } catch { toast.error('Failed to update'); }
  }

  async function confirmAndNotify(appointment) {
    await updateStatus(appointment, 'confirmed');
    setTimeout(() => sendWhatsApp(appointment, 'confirmed'), 500);
  }

  const counts = {
    total: appointments.length,
    pending: appointments.filter(a=>a.status==='pending').length,
    confirmed: appointments.filter(a=>a.status==='confirmed').length,
    completed: appointments.filter(a=>a.status==='completed').length,
    cancelled: appointments.filter(a=>a.status==='cancelled').length
  };

  const filtered = appointments
    .filter(a => filter==='all' || a.status===filter)
    .filter(a => !search ||
      a.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      a.phone?.includes(search) ||
      a.refCode?.includes(search)
    );

  return (
    <div style={{padding:'40px 0 80px'}}>
      <div className="container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Orthonexis Physiotherapy · Grandview Building, 198, Kapsabet 30100</p>
        </div>

        <div className="stats-grid">
          {[
            {icon:'📝', value:'View', label:'Reviews', link:'/admin/reviews'},
            {icon:'📋', value:counts.total, label:'Total'},
            {icon:'⏳', value:counts.pending, label:'Pending', highlight:counts.pending>0},
            {icon:'✅', value:counts.confirmed, label:'Confirmed'},
            {icon:'🎯', value:counts.completed, label:'Completed'},
            {icon:'❌', value:counts.cancelled, label:'Cancelled'}
          ].map(s=>(
            <div className="stat-card" key={s.label} style={s.highlight?{borderColor:'#e67e22',background:'#fff8f0'}:{}}>
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-value" style={s.highlight?{color:'#e67e22'}:{}}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{display:'flex', gap:12, marginBottom:16, flexWrap:'wrap', alignItems:'center'}}>
          <input
            placeholder="🔍 Search by name, phone or ref..."
            value={search} onChange={e=>setSearch(e.target.value)}
            style={{padding:'9px 14px', borderRadius:'var(--radius-md)', border:'1.5px solid var(--color-border)', fontSize:14, flex:1, minWidth:220, background:'var(--color-surface)'}}
          />
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            {['all','pending','confirmed','completed','cancelled'].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} className={`btn ${filter===f?'btn-primary':'btn-outline'}`} style={{padding:'7px 14px', fontSize:13, textTransform:'capitalize'}}>
                {f==='all'?`All (${counts.total})`:`${f.charAt(0).toUpperCase()+f.slice(1)} (${counts[f]||0})`}
              </button>
            ))}
          </div>
        </div>

        <div className="table-wrap">
          <div className="table-header"><h2>Appointments ({filtered.length})</h2></div>
          {loading
            ? <div className="loading-spinner"><div className="spinner"/></div>
            : filtered.length===0
            ? <div className="empty-state"><div className="empty-icon">📭</div><h3>No appointments found</h3><p>Try a different filter or search.</p></div>
            : (
              <div style={{overflowX:'auto'}}>
                <table className="appointments-table">
                  <thead>
                    <tr><th>Ref</th><th>Patient</th><th>Service</th><th>Date & Time</th><th>Location</th><th>Status</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {filtered.map(a=>(
                      <React.Fragment key={a.id}>
                        <tr style={{cursor:'pointer'}} onClick={()=>setExpanded(expanded===a.id?null:a.id)}>
                          <td><span style={{fontFamily:'monospace', fontSize:12, background:'var(--color-surface-2)', padding:'2px 6px', borderRadius:4}}>{a.refCode||'—'}</span></td>
                          <td>
                            <div style={{fontWeight:600, fontSize:14}}>{a.patientName}</div>
                            <div style={{fontSize:12, color:'var(--color-text-muted)'}}>{a.phone}</div>
                            {a.patientEmail&&<div style={{fontSize:11, color:'var(--color-text-faint)'}}>{a.patientEmail}</div>}
                          </td>
                          <td>
                            <div style={{fontWeight:600, fontSize:13}}>{a.serviceName}</div>
                            {a.subService&&<div style={{fontSize:12, color:'var(--color-text-muted)'}}>{a.subService}</div>}
                          </td>
                          <td style={{fontSize:13}}>{a.date}<br/><span style={{color:'var(--color-text-muted)'}}>{a.time}</span></td>
                          <td style={{fontSize:12}}>{a.isHomeCare?`🏠 ${a.address}`:'🏥 Clinic'}</td>
                          <td><span className={`badge badge-${a.status}`}>{a.status}</span></td>
                          <td onClick={e=>e.stopPropagation()}>
                            <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
                              {a.status==='pending'&&<>
                                <button className="action-btn action-confirm"
                                  onClick={()=>confirmAndNotify(a)}
                                  title="Confirm & send WhatsApp">
                                  ✅ Confirm & Notify
                                </button>
                                <button className="action-btn action-cancel"
                                  onClick={async()=>{await updateStatus(a,'cancelled'); sendWhatsApp(a,'cancelled');}}>
                                  ❌ Cancel
                                </button>
                              </>}
                              {a.status==='confirmed'&&<>
                                <button className="action-btn action-complete"
                                  onClick={async()=>{await updateStatus(a,'completed'); sendWhatsApp(a,'completed');}}>
                                  🎯 Complete & Notify
                                </button>
                                <button className="action-btn action-cancel"
                                  onClick={async()=>{await updateStatus(a,'cancelled'); sendWhatsApp(a,'cancelled');}}>
                                  ❌ Cancel
                                </button>
                              </>}
                              {a.status==='pending'||a.status==='confirmed' ? null : null}
                              <button
                                onClick={()=>sendWhatsApp(a, a.status)}
                                style={{padding:'6px 10px', borderRadius:'var(--radius-sm)', fontSize:12, fontWeight:600, border:'none', cursor:'pointer', background:'#e8f5e9', color:'#2e7d32', transition:'all 180ms'}}
                                title="Resend WhatsApp message">
                                💬 WhatsApp
                              </button>
                            </div>
                          </td>
                        </tr>
                        {expanded===a.id&&(
                          <tr>
                            <td colSpan={7} style={{background:'var(--color-primary-light)', padding:'16px 20px'}}>
                              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:12, fontSize:13}}>
                                <div><strong>Full Name:</strong> {a.patientName}</div>
                                <div><strong>Phone:</strong> {a.phone}</div>
                                <div><strong>Email:</strong> {a.patientEmail||'—'}</div>
                                <div><strong>Service:</strong> {a.serviceName}</div>
                                <div><strong>Concern:</strong> {a.subService||'—'}</div>
                                <div><strong>Date:</strong> {a.date} at {a.time}</div>
                                <div><strong>Location:</strong> {a.isHomeCare?`Home - ${a.address}`:'Clinic'}</div>
                                <div><strong>Notes:</strong> {a.notes||'—'}</div>
                                <div><strong>Ref:</strong> {a.refCode||'—'}</div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
