import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar.jsx';
import StatCard from '../Components/StatCard.jsx';
import { FileEdit, ClipboardCheck, Percent, Layers, UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react';

// Setup the dynamic API base address
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000';

export default function StudentDashboard({ user }) {
  const [currentTab, setCurrentTab] = useState('overview');
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    course: 'B.Tech Computer Science Engineering', gpa: '', ssc: '', intermediate: '', entrance_score: '', attendance: '90', category: 'General', extracurricular: '0', dob: '', gender: 'Male'
  });
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/applications`);
      const data = await res.json();
      // Filter records mapped to logged student instance
      const filtered = data.filter(app => app.email === user.email);
      setApplications(filtered);
    } catch (err) { console.error(err); }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/applications/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, student_name: user.fullname, email: user.email, phone: user.phone || 'N/A' })
      });
      if (res.ok) {
        setSubmitStatus('Success');
        fetchApplications();
        setCurrentTab('tracking');
      }
    } catch (err) { setSubmitStatus('Error'); }
  };

  const activeApp = applications[0] || null;

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} role="student" />
      <main className="flex-1 p-8 bg-slate-50 overflow-y-auto">
        
        {/* TAB 1: OVERVIEW */}
        {currentTab === 'overview' && (
          <div className="flex flex-col gap-8 animate-fadeIn">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Student Hub Desktop</h1>
              <p className="text-slate-500 text-sm">Review pipeline execution status, risk vectors, and structural credentials verification.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="Applications Files Active" value={applications.length} icon={<FileEdit />} color="blue" />
              <StatCard title="ML Model Clearance Prediction" value={activeApp ? activeApp.ml_prediction : 'No File'} icon={<ClipboardCheck />} color="purple" />
              <StatCard title="Admission Score Strength" value={activeApp ? `${activeApp.ml_probability}%` : '0%'} icon={<Percent />} color="green" />
              <StatCard title="Current Lifecycle Status" value={activeApp ? activeApp.status : 'None'} icon={<Layers />} color="red" />
            </div>

            {activeApp && (
              <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col gap-4 shadow-sm">
                <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-3">Active File Lifecycle Roadmap</h3>
                <div className="flex items-center justify-between max-w-3xl py-4">
                  {['Submitted', 'Under Review', 'AI Evaluated', activeApp.status].map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">✓</div>
                      <span className="text-xs font-semibold text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MULTI-STEP APPLICATION FORM */}
        {currentTab === 'apply' && (
          <div className="max-w-3xl bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-slate-800 border-b pb-3">Unified Higher Education Admission Profile Matrix</h2>
            <form onSubmit={handleApply} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Target Academic Program</label>
                <select className="p-2.5 border rounded-xl text-sm" onChange={e => setFormData({...formData, course: e.target.value})}>
                  <option>B.Tech Computer Science Engineering</option>
                  <option>B.Sc Artificial Intelligence & Data Science</option>
                  <option>M.Tech Machine Learning Architecture</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Cumulative Undergraduate GPA</label>
                <input type="number" step="0.01" required className="p-2.5 border rounded-xl text-sm" placeholder="e.g. 3.85" onChange={e => setFormData({...formData, gpa: e.target.value})} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Secondary (SSC) Percentage Mark</label>
                <input type="number" required className="p-2.5 border rounded-xl text-sm" placeholder="0-100" onChange={e => setFormData({...formData, ssc: e.target.value})} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Higher Intermediate Percentage Mark</label>
                <input type="number" required className="p-2.5 border rounded-xl text-sm" placeholder="0-100" onChange={e => setFormData({...formData, intermediate: e.target.value})} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Institutional Entrance Exam Score (%)</label>
                <input type="number" required className="p-2.5 border rounded-xl text-sm" placeholder="0-100" onChange={e => setFormData({...formData, entrance_score: e.target.value})} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Baseline Class Attendance Metrics (%)</label>
                <input type="number" required className="p-2.5 border rounded-xl text-sm" defaultValue="90" placeholder="0-100" onChange={e => setFormData({...formData, attendance: e.target.value})} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Quota Reservation Quota Category</label>
                <select className="p-2.5 border rounded-xl text-sm" onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option>General</option>
                  <option>Reserved</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Extracurricular Achievement Count</label>
                <input type="number" className="p-2.5 border rounded-xl text-sm" placeholder="0-5" onChange={e => setFormData({...formData, extracurricular: e.target.value})} />
              </div>
              
              <div className="md:col-span-2 border-t pt-4 mt-2">
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Drag & Drop Credentials Verification Documents Upload Center</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50/50 cursor-pointer transition-colors flex flex-col items-center gap-2 text-slate-400">
                  <UploadCloud size={32} className="text-blue-500" />
                  <span className="text-xs font-semibold text-slate-600">Click to upload or drag academic transcripts here</span>
                  <span className="text-[10px]">PDF, PNG up to 10MB file limit configurations</span>
                </div>
              </div>

              <button type="submit" className="md:col-span-2 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/10">
                Commit Entry Verification Profile
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: STATUS TRACKER */}
        {currentTab === 'tracking' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4 text-slate-800">Active File Management Inventory</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase">
                  <th className="p-4">Target Program</th>
                  <th className="p-4">ML Clearance Predictor</th>
                  <th className="p-4">Algorithm Score</th>
                  <th className="p-4">Administrative Action Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {applications.map((app, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-700">{app.course}</td>
                    <td className="p-4">{app.ml_prediction}</td>
                    <td className="p-4 font-mono font-medium">{app.ml_probability}%</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${app.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : app.status === 'Rejected' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: ML ELIGIBILITY INSIGHT */}
        {currentTab === 'prediction' && (
          <div className="max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
            <h2 className="text-lg font-bold text-slate-800 border-b pb-2">Scikit-Learn Inference Diagnostic Platform Output</h2>
            {activeApp ? (
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-slate-50 border rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Dynamic Eligibility Metric Verdict</p>
                    <p className="text-xl font-black text-blue-600">{activeApp.ml_prediction}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 font-bold uppercase">Pipeline Probability Tracker</p>
                    <p className="text-2xl font-mono font-black text-slate-800">{activeApp.ml_probability}%</p>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all" style={{width: `${activeApp.ml_probability}%`}}></div>
                </div>
                <div className="text-xs text-slate-500 leading-relaxed bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex gap-2.5">
                  <CheckCircle2 className="text-blue-500 shrink-0" size={16} />
                  <span><strong>Automated System Recommendation:</strong> This mathematical model calculates eligibility using multivariate parameters. Files tracking over 75% present low clearance risks for institutional validation processing boards.</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400">No active application file found on record. Complete an admission profile entry form to activate prediction tracking arrays.</p>
            )}
          </div>
        )}

        {/* TAB 5: GENAI ANALYSIS PROFILE */}
        {currentTab === 'ai-report' && (
          <div className="max-w-3xl bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-bold text-slate-800 border-b pb-2">Google Gemini Real-Time Context Synthesizer Report</h2>
            {activeApp ? (
              <div className="bg-slate-900 text-slate-100 p-6 rounded-xl font-mono text-xs leading-relaxed whitespace-pre-wrap shadow-inner border border-slate-800">
                {activeApp.genai_summary}
              </div>
            ) : (
              <p className="text-sm text-slate-400">No active file matrix on track. Submit credentials documentation info to yield cloud AI summaries.</p>
            )}
          </div>
        )}

      </main>
    </div>
  );
}