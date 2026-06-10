import React from 'react';
import { Bell, User, LogOut, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  return (
    <nav className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI ADMISSION MANAGEMENT SYSTEM
        </span>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-wider">
          v2.0-AI
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative p-2 hover:bg-slate-50 rounded-full cursor-pointer transition-colors text-slate-600">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-purple-600 rounded-full"></span>
        </div>
        
        <div className="h-8 w-px bg-slate-200"></div>

        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800">{user.fullname}</p>
              <p className="text-xs text-slate-500 capitalize px-1.5 py-0.5 rounded bg-slate-100 font-medium inline-block">{user.role}</p>
            </div>
            <button 
              onClick={() => { onLogout(); navigate('/auth'); }}
              className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all"
              title="Logout System Account"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/auth')}
            className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all"
          >
            <User size={18} /> Account Login
          </button>
        )}
      </div>
    </nav>
  );
}