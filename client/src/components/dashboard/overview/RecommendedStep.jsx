import React from 'react';
import { FiTarget, FiMic } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
const RecommendedStep = ({ strongSkills = [], targetRole = "your target role", targetSkills = [] }) => {
  const navigate = useNavigate();

  const primaryStrong = strongSkills[0] || 'your core skills';
  const secondaryStrong = strongSkills[1] || 'experience';
  const missingFirst = targetSkills[0]?.skill || 'specific tools';
  const missingSecond = targetSkills[1]?.skill || 'domain knowledge';
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
          <FiTarget className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-lg text-slate-900">Recommended Next Step</h3>
      </div>
      
      <p className="text-slate-600 mb-6 flex-1 text-sm leading-relaxed">
        {strongSkills.length > 0 ? (
          <>
            Your resume is strong in <span className="font-semibold text-slate-700">{primaryStrong}</span> and <span className="font-semibold text-slate-700">{secondaryStrong}</span>, 
            but your target role emphasizes <span className="font-semibold text-slate-700">{missingFirst}</span> and <span className="font-semibold text-slate-700">{missingSecond}</span>.
          </>
        ) : (
          <>
            You have a solid foundation, but you need to prepare for interviews for <span className="font-semibold text-slate-700">{targetRole}</span>.
          </>
        )}
        <br/><br/>
        Practice a mock interview focused on<br/>
        <span className="font-semibold text-green-600">{targetRole}</span>.
      </p>
      
      <button 
        onClick={() => navigate('/dashboard/interview')}
        className="w-full py-3 px-4 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
      >
        <FiMic className="w-5 h-5" />
        Start Mock Interview
      </button>
    </div>
  );
};

export default RecommendedStep;
