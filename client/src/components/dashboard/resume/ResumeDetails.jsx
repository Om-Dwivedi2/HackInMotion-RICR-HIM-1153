import React from 'react';

const ResumeDetails = ({ details }) => {
  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
      <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
        <h3 className="font-semibold text-slate-800">Resume Overview</h3>
      </div>
      
      <div className="p-6">
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-slate-500">Name</dt>
            <dd className="mt-1 text-sm text-slate-900">{details.name}</dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-slate-500">Target Role</dt>
            <dd className="mt-1 text-sm text-slate-900 font-medium">{details.targetRole}</dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-slate-500">Experience</dt>
            <dd className="mt-1 text-sm text-slate-900">{details.experience}</dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-slate-500">Education</dt>
            <dd className="mt-1 text-sm text-slate-900">{details.education}</dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-slate-500 mb-2">Top Skills</dt>
            <dd className="flex flex-wrap gap-2">
              {details.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium border border-blue-100"
                >
                  {skill}
                </span>
              ))}
            </dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-slate-500">Projects</dt>
            <dd className="mt-1 text-sm text-slate-900">{details.projects}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ResumeDetails;
