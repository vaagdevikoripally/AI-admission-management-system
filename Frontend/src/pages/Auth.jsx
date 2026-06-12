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

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Switch tabs and cleanly wipe out any old cross-contaminated validation alerts
  const handleTabSwitch = (loginState) => {
    setIsLogin(loginState);
    setMsg({ text: '', type: '' }); // Wipes away previous error layouts
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ text: '', type: '' }); // Clear messages at start of pipeline

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      // CRITICAL FIX: Only pass email/password to login endpoint so empty state keys don't break validations
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        // Capture specific backend error string layouts
        throw new Error(data.error || 'Operation execution failure');
      }

      // Handle Success Paths
      if (isLogin) {
        setMsg({ text: 'Login successful! Syncing session metrics...', type: 'success' });
        
        // Save user metrics to persistent cache layer
        localStorage.setItem('user', JSON.stringify(data));
        if (onLoginSuccess) onLoginSuccess(data);

        // Clear input tracking states
        setFormData({ fullname: '', email: '', phone: '', password: '' });

        // Route matching metrics to appropriate dashboards
        if (data.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      } else {
        setMsg({ text: 'Registration successful! Please sign in.', type: 'success' });
        // Flip student over to the login form tab view automatically
        setIsLogin(true);
      }

    } catch (error) {
      setMsg({ text: error.message || 'Unable to connect to operational pipeline matrix.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 bg-opacity-40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-100">
        
        {/* Tab Selection Headers */}
        <div className="flex border-b border-slate-100">
          <button
            type="button"
            className={`flex-1 py-4 text-center font-medium transition-all ${
              isLogin ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-slate-400 hover:text-slate-600'
            }`}
            onClick={() => handleTabSwitch(true)}
          >
            Sign In Account
          </button>
          <button
            type="button"
            className={`flex-1 py-4 text-center font-medium transition-all ${
              !isLogin ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-slate-400 hover:text-slate-600'
            }`}
            onClick={() => handleTabSwitch(false)}
          >
            Create Student Profile
          </button>
        </div>

        {/* Form Submission Core Container */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Dynamic Action Notification Message Alert Layout */}
          {msg.text && (
            <div className={`p-3 rounded-lg text-sm font-medium border ${
              msg.type === 'error' 
                ? 'bg-red-50 text-red-600 border-red-100' 
                : 'bg-green-50 text-green-600 border-green-100'
            }`}>
              {msg.text}
            </div>
          )}

          {/* Full Name Input Column (Only rendered for Registrations) */}
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  name="fullname"
                  required
                  placeholder="John Doe"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800"
                />
              </div>
            </div>
          )}

          {/* Institutional Email Address Column */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Institutional Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="email"
                name="email"
                required
                placeholder="student@university.edu"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800"
              />
            </div>
          </div>

          {/* Phone Metric Input Column (Only rendered for Registrations) */}
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone Connection Pipeline</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800"
                />
              </div>
            </div>
          )}

          {/* Secure Profile Password Column */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Secure Profile Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800"
              />
            </div>
          </div>

          {/* Master Form Execution Action Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-100 transition-all transform active:scale-[0.98] mt-2"
          >
            {isLogin ? 'Sign In' : 'Register Profile Core'}
          </button>

        </form>
      </div>
    </div>
  );
}