import React from 'react';
import { useNavigate } from 'react-router-dom';

const Recommendations = () => {
  const navigate = useNavigate();

  const recommendations = [
    {
      id: "01",
      title: "Add Docker experience or projects",
      desc: "Include any projects where you containerized applications or mention Docker in your skills section if you have basic familiarity."
    },
    {
      id: "02",
      title: "Highlight REST API development",
      desc: "Quantify your REST API experience with measurable outcomes (e.g., 'improved response time by 20%')."
    },
    {
      id: "03",
      title: "Add relevant AWS/cloud experience",
      desc: "If you have deployed to AWS (EC2, S3), explicitly state this in your recent experience."
    },
    {
      id: "04",
      title: "Include CI/CD workflows",
      desc: "Mention Github Actions or Jenkins pipelines you have interacted with to show DevOps awareness."
    }
  ];

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
        {recommendations.map((rec) => (
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
