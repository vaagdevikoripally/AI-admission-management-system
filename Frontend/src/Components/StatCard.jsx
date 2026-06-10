import React from 'react';

export default function StatCard({ title, value, change, icon, color = 'blue' }) {
  const colors = {
    blue: 'border-blue-500 text-blue-600 bg-blue-50/50',
    purple: 'border-purple-500 text-purple-600 bg-purple-50/50',
    green: 'border-green-500 text-green-600 bg-green-50/50',
    red: 'border-red-500 text-red-600 bg-red-50/50',
  };

  return (
    <div className="bg-white border border-slate-100 rounded-xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
        <span className="text-2xl font-bold text-slate-800 tracking-tight">{value}</span>
        {change && <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded w-fit">{change} increase</span>}
      </div>
      <div className={`p-3 rounded-xl border ${colors[color] || colors.blue}`}>
        {icon}
      </div>
    </div>
  );
}