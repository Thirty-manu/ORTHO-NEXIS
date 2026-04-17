import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function PatientDashboard() {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db,'appointments'), where('patientId','==',currentUser.uid), orderBy('createdAt','desc'));
    return onSnapshot(q, snap => { setAppointments(snap.docs.map(d=>({id:d.id,...d.data()}))); setLoading(false); });
  }, [currentUser]);

  const counts = {
    total: appointments.length,
    pending: appointments.filter(a=>a.status==='pending').length,
    confirmed: appointments.filter(a=>a.status==='confirmed').length,
    completed: appointments.filter(a=>a.status==='completed').length
  };

  return (
    <div style={{padding:'40px 0 80px'}}>
      <div className="container">
        <div className="dashboard-header">
          <h1>My Appointments</h1>
          <p>Welcome back, {currentUser.displayName} · Track your physiotherapy sessions</p>
        </div>
        <div className="stats-grid">
          {[{icon:'📋',value:counts.total,label:'Total Bookings'},{icon:'⏳',value:counts.pending,label:'Pending'},{icon:'✅',value:counts.confirmed,label:'Confirmed'},{icon:'🎯',value:counts.completed,label:'Completed'}].map(s=>(
            <div className="stat-card" key={s.label}>
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex', justifyContent:'flex-end', marginBottom:16}}>
          <Link to="/book" className="btn btn-primary">+ New Appointment</Link>
        </div>
        <div className="table-wrap">
          <div className="table-header"><h2>Appointment History</h2></div>
          {loading ? <div className="loading-spinner"><div className="spinner"/></div>
          : appointments.length===0 ? (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <h3>No appointments yet</h3>
              <p>Book your first physiotherapy session today.</p>
              <Link to="/book" className="btn btn-primary" style={{marginTop:16}}>Book Now</Link>
            </div>
          ) : (
            <table className="appointments-table">
              <thead><tr><th>Service</th><th>Date</th><th>Time</th><th>Location</th><th>Status</th></tr></thead>
              <tbody>
                {appointments.map(a=>(
                  <tr key={a.id}>
                    <td><div style={{fontWeight:600,fontSize:14}}>{a.serviceName}</div>{a.subService&&<div style={{fontSize:12,color:'var(--color-text-muted)'}}>{a.subService}</div>}</td>
                    <td>{a.date}</td>
                    <td>{a.time}</td>
                    <td style={{fontSize:12}}>{a.isHomeCare?`🏠 ${a.address}`:'🏥 Clinic'}</td>
                    <td><span className={`badge badge-${a.status}`}>{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
