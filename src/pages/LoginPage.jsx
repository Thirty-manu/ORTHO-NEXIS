import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({name:'', email:'', password:'', confirm:''});
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const handle = e => setForm(f => ({...f, [e.target.name]: e.target.value}));

  async function handleSubmit(e) {
    e.preventDefault();
    if (tab === 'register' && form.password !== form.confirm) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      if (tab === 'login') { await login(form.email, form.password); toast.success('Welcome back!'); }
      else { await signup(form.email, form.password, form.name); toast.success('Account created!'); }
      navigate('/dashboard');
    } catch(err) { toast.error(err.message || 'Authentication failed'); }
    setLoading(false);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>ORTHO<span style={{color:'#2eaa5e'}}>NEXIS</span></h1>
          <p>Physiotherapy Health Group — Kapsabet</p>
        </div>
        <div className="auth-tabs">
          <button className={`auth-tab ${tab==='login'?'active':''}`} onClick={()=>setTab('login')}>Login</button>
          <button className={`auth-tab ${tab==='register'?'active':''}`} onClick={()=>setTab('register')}>Register</button>
        </div>
        <form onSubmit={handleSubmit}>
          {tab==='register' && (
            <div className="form-group">
              <label>Full Name</label>
              <input name="name" placeholder="e.g. John Kamau" required value={form.name} onChange={handle}/>
            </div>
          )}
          <div className="form-group">
            <label>Email Address</label>
            <input name="email" type="email" placeholder="you@example.com" required value={form.email} onChange={handle}/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" placeholder="••••••••" required value={form.password} onChange={handle}/>
          </div>
          {tab==='register' && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input name="confirm" type="password" placeholder="••••••••" required value={form.confirm} onChange={handle}/>
            </div>
          )}
          <button className="btn btn-primary" style={{width:'100%', justifyContent:'center', padding:14, fontSize:15, marginTop:8}} disabled={loading}>
            {loading ? 'Please wait...' : (tab==='login' ? 'Login' : 'Create Account')}
          </button>
        </form>
      </div>
    </div>
  );
}
