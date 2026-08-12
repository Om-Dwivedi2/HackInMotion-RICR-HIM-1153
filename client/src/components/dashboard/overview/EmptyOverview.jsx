import React from 'react';
import { FiUploadCloud, FiTarget, FiBarChart2 } from 'react-icons/fi';

const EmptyOverview = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Welcome to CareerLens! 👋
        </h2>
        <p className="text-lg text-slate-600 max-w-xl mx-auto">
          Let's get your career readiness journey started. Upload your resume and add a target job to receive your personalized career analysis.
        </p>
        <button className="mt-8 bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto">
          <FiUploadCloud className="w-5 h-5" />
          Upload My Resume
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -top-4 text-[80px] font-bold text-slate-50 leading-none">01</div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <FiUploadCloud className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Upload Resume</h3>
            <p className="text-sm text-slate-600">Upload your latest resume in PDF or DOCX format to begin.</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -top-4 text-[80px] font-bold text-slate-50 leading-none">02</div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
              <FiTarget className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Add Target Role</h3>
            <p className="text-sm text-slate-600">Tell us which job title you're targeting so we can analyze the fit.</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -top-4 text-[80px] font-bold text-slate-50 leading-none">03</div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
              <FiBarChart2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Get Your Analysis</h3>
            <p className="text-sm text-slate-600">Discover your match score, skill gaps, and get mock interview practice.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyOverview;
