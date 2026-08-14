import React from 'react';
import { useNavigate } from 'react-router-dom';

const Recommendations = ({ recommendations = [] }) => {
  const navigate = useNavigate();

  // Map backend structure to frontend structure if necessary, or use it directly.
  // Backend returns: { title: String, description: String, priority: String }
  // We need: { id: String, title: String, desc: String }
  
  const displayRecs = recommendations.map((rec, index) => ({
    id: `0${index + 1}`.slice(-2),
    title: rec.title,
    desc: rec.description
  }));

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">What You Should Improve</h3>
          <p className="text-sm text-slate-500 mt-1">Focus on these areas to increase your match with the target role.</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/resume')}
          className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Improve My Resume
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayRecs.length === 0 && <p className="text-slate-500 text-sm">No recommendations generated.</p>}
        {displayRecs.map((rec) => (
          <div key={rec.id} className="p-5 border border-slate-100 bg-slate-50 rounded-xl flex items-start gap-4 hover:border-slate-200 transition-colors">
            <span className="text-3xl font-black text-slate-200 leading-none">{rec.id}</span>
            <div>
              <h4 className="font-semibold text-slate-800 text-sm mb-1.5">{rec.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{rec.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
