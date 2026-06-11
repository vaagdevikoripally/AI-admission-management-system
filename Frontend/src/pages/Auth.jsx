import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Phone, CheckCircle } from 'lucide-react';

// Setup the dynamic API base address
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000';

export default function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ fullname: '', email: '', phone: '', password: '' });
  const [msg, setMsg] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Operation execution failure');
      
      if (isLogin) {
        onLoginSuccess(data);
        if (data.role === 'admin') navigate('/admin');
        else navigate('/student');
      } else {
        setMsg({ text: 'Registration completed successfully! Proceeding to entry login fields.', type: 'success' });
        setIsLogin(true);
      }
    } catch (err) {
      setMsg({ text: err.message, type: 'error' });
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-slate-50 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="bg-white border border-slate-200 shadow-xl rounded-2xl w-full max-w-md overflow-hidden">
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => { setIsLogin(true); setMsg({text:'', type:''}); }}
            className={`w-1/2 py-4 text-center font-semibold text-sm transition-all ${isLogin ? 'text-blue-600 bg-slate-50/50 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Sign In Account
          </button>
          <button 
            onClick={() => { setIsLogin(false); setMsg({text:'', type:''}); }}
            className={`w-1/2 py-4 text-center font-semibold text-sm transition-all ${!isLogin ? 'text-blue-600 bg-slate-50/50 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Create Student Profile
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">
          {msg.text && (
            <div className={`p-3.5 rounded-xl text-xs font-semibold border ${msg.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
              {msg.text}
            </div>
          )}

          {!isLogin && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-slate-400" size={16} />
                <input 
                  type="text" required
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  onChange={e => setFormData({...formData, fullname: e.target.value})} 
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Institutional Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={16} />
              <input 
                type="email" required
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                onChange={e => setFormData({...formData, email: e.target.value})} 
              />
            </div>
          </div>

          {!isLogin && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Contact Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-slate-400" size={16} />
                <input 
                  type="text" required
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  onChange={e => setFormData({...formData, phone: e.target.value})} 
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Secure Profile Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={16} />
              <input 
                type="password" required
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                onChange={e => setFormData({...formData, password: e.target.value})} 
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/10 transition-all mt-2"
          >
            {isLogin ? 'Sign In' : 'Register Profile Core'}
          </button>
        </form>
      </div>
    </div>
  );
}