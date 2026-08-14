import React from 'react';
import { FiPlay, FiClock, FiList, FiTarget, FiBriefcase } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const InterviewSetup = ({ onStart }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden max-w-4xl mx-auto mt-4">
      <div className="p-8 text-center border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Ready for your interview?</h2>
        <p className="text-slate-600 max-w-xl mx-auto">
          Your interview will be tailored to your resume and target role.
        </p>
      </div>
      
      <div className="p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center">
            <FiTarget className="w-5 h-5 text-blue-600 mb-2" />
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Target Role</span>
            <span className="font-medium text-slate-900">Backend Engineer</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center">
            <FiBriefcase className="w-5 h-5 text-blue-600 mb-2" />
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Experience</span>
            <span className="font-medium text-slate-900">Entry Level</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center">
            <FiList className="w-5 h-5 text-blue-600 mb-2" />
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Questions</span>
            <span className="font-medium text-slate-900">5 Questions</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center">
            <FiClock className="w-5 h-5 text-blue-600 mb-2" />
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Estimated Time</span>
            <span className="font-medium text-slate-900">10-15 mins</span>
          </div>
        </div>

        <h3 className="font-semibold text-slate-900 mb-4">What to expect</h3>
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">1</div>
            <div>
              <h4 className="font-medium text-slate-900 mb-1">Resume-based questions</h4>
              <p className="text-sm text-slate-600">Questions are generated around the experience and projects in your resume.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">2</div>
            <div>
              <h4 className="font-medium text-slate-900 mb-1">Role-specific questions</h4>
              <p className="text-sm text-slate-600">Questions focus on skills expected for your target role.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">3</div>
            <div>
              <h4 className="font-medium text-slate-900 mb-1">AI feedback</h4>
              <p className="text-sm text-slate-600">Get feedback on relevance, clarity and completeness.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">4</div>
            <div>
              <h4 className="font-medium text-slate-900 mb-1">Progress tracking</h4>
              <p className="text-sm text-slate-600">Your score contributes to your interview progress.</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-100">
          <button 
            onClick={() => navigate('/dashboard/history')}
            className="px-6 py-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition-colors cursor-pointer w-full sm:w-auto text-center"
          >
            View Previous Interviews
          </button>
          <button 
            onClick={onStart}
            className="px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium transition-colors cursor-pointer w-full sm:w-auto text-center flex items-center justify-center gap-2 shadow-sm"
          >
            <FiPlay className="fill-current" /> Start Mock Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewSetup;
