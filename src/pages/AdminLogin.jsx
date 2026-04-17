import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAdmin, adminLogin } = useAuth();
  const navigate = useNavigate();

  if (isAdmin) { navigate('/admin-orthonexis/dashboard'); return null; }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const ok = adminLogin(password);
    if (ok) { toast.success('Welcome, Admin!'); navigate('/admin-orthonexis/dashboard'); }
    else { toast.error('Incorrect password'); }
    setLoading(false);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div style={{fontSize:40, marginBottom:8}}>🔐</div>
          <h1>ORTHO<span style={{color:'#2eaa5e'}}>NEXIS</span></h1>
          <p>Staff / Admin Access Only</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Admin Password</label>
            <input type="password" placeholder="Enter admin password" value={password} onChange={e=>setPassword(e.target.value)} required autoFocus/>
          </div>
          <button className="btn btn-primary" style={{width:'100%', justifyContent:'center', padding:14, fontSize:15, marginTop:8}} disabled={loading}>
            {loading ? 'Verifying...' : 'Login to Admin Panel'}
          </button>
        </form>
        <p style={{textAlign:'center', marginTop:16, fontSize:12, color:'var(--color-text-muted)'}}>
          Patient? <a href="/book" style={{color:'var(--color-primary)', fontWeight:600}}>Book an appointment →</a>
        </p>
      </div>
    </div>
  );
}
