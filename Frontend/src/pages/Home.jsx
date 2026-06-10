import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, CheckCircle2, Cpu, BrainCircuit, Users, Award, Shield } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_50%)]"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <GraduationCap size={16} /> Elite Next-Gen Academic ERP System Architecture
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-[1.15] mb-6">
            AI-Enhanced Admission <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Management Platform
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-light mb-10 leading-relaxed">
            Smart Admissions Powered by AI and Machine Learning. Accelerating institutional review verification metrics via deep analytics.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate('/auth')} 
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
            >
              Apply Now Portal <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => navigate('/auth')} 
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold px-8 py-4 rounded-xl transition-all"
            >
              Administrative Portal Login
            </button>
          </div>
        </div>
      </header>

      {/* Corporate Features Matrix Grid */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Integrated Operational Module Matrix</h2>
          <p className="text-slate-500">Every microservice layer is fully unified to enable instantaneous applicant scoring analytics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Student Registration', desc: 'Secure encryption access protocol profile registration layer.', icon: <Users className="text-blue-600" /> },
            { title: 'Admission Application', desc: 'Comprehensive multi-stage unified academic enrollment schema.', icon: <FileText className="text-purple-600" /> },
            { title: 'Eligibility Prediction', desc: 'Scikit-Learn Logistic Regression core automated risk metric evaluation.', icon: <Cpu className="text-indigo-600" /> },
            { title: 'AI Evaluation Reports', desc: 'Real-time contextual analysis profiles via Gemini Cloud structures.', icon: <BrainCircuit className="text-pink-600" /> }
          ].map((feat, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">{feat.icon}</div>
              <h3 className="font-bold text-slate-800 text-lg">{feat.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Operational Counter Section */}
      <section className="bg-slate-900 text-white py-16 px-6 border-y border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Total App Files Active', val: '14,820+' },
            { label: 'System Validation Match', val: '98.4%' },
            { label: 'ML Analytics Confidence', val: '94.2%' },
            { label: 'GenAI File Syntheses', val: '12,400+' }
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <span className="text-3xl font-extrabold text-blue-400 tracking-tight">{stat.val}</span>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Unified Enterprise Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6 text-center text-slate-400 text-xs">
        <p>© 2026 Institutional Systems Group (EduSphere). Deep Integration Academic Architecture Pipeline. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

// Inline fallback icon for local module independence
function FileText(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
  );
}