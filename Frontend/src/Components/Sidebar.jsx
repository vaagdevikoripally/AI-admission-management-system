import React from 'react';
import { LayoutDashboard, FileText, Cpu, BrainCircuit, Activity, Settings, ShieldCheck } from 'lucide-react';

export default function Sidebar({ currentTab, setCurrentTab, role }) {
  const studentMenu = [
    { id: 'overview', name: 'Dashboard Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'apply', name: 'New Application Form', icon: <FileText size={18} /> },
    { id: 'tracking', name: 'Pipeline Status Tracking', icon: <Activity size={18} /> },
    { id: 'prediction', name: 'ML Eligibility Insight', icon: <Cpu size={18} /> },
    { id: 'ai-report', name: 'GenAI Analysis Profiles', icon: <BrainCircuit size={18} /> },
  ];

  const adminMenu = [
    { id: 'admin-dashboard', name: 'Control Workspace', icon: <ShieldCheck size={18} /> },
    { id: 'admin-applications', name: 'Applicant Profiles Table', icon: <FileText size={18} /> },
    { id: 'admin-analytics', name: 'Institutional Analytics', icon: <Activity size={18} /> },
  ];

  const targetMenu = role === 'admin' ? adminMenu : studentMenu;

  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-900 text-slate-400 p-4 flex flex-col gap-1 z-30 min-h-[calc(100vh-4rem)]">
      <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
        Navigation Management
      </div>
      {targetMenu.map((item) => (
        <button
          key={item.id}
          onClick={() => setCurrentTab(item.id)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 text-left ${
            currentTab === item.id 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10 font-semibold' 
              : 'hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          {item.icon}
          {item.name}
        </button>
      ))}
      <div className="mt-auto pt-4 border-t border-slate-800">
        <button 
          onClick={() => setCurrentTab('settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-left ${currentTab === 'settings' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <Settings size={18} /> System Settings
        </button>
      </div>
    </aside>
  );
}