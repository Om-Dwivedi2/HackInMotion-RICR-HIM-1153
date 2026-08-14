import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../../api/axios';

const CareerTargetForm = ({ initialTarget, onSave }) => {
  const [role, setRole] = useState(initialTarget?.role || '');
  const [company, setCompany] = useState(initialTarget?.company || '');
  const [jobDescription, setJobDescription] = useState(initialTarget?.jobDescription?.rawText || '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialTarget) {
      setRole(initialTarget.role || '');
      setCompany(initialTarget.company || '');
      setJobDescription(initialTarget.jobDescription?.rawText || '');
    }
  }, [initialTarget]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role.trim()) {
      toast.error('Target Role is required');
      return;
    }
    if (!jobDescription.trim()) {
      toast.error('Job Description is required');
      return;
    }

    setIsSaving(true);
    try {
      const response = await api.put('/targets', {
        role: role.trim(),
        company: company.trim(),
        jobDescriptionText: jobDescription.trim()
      });

      if (response.data.success) {
        toast.success('Career target saved successfully');
        if (onSave) onSave(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save career target');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden mb-6">
      <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
        <h3 className="font-semibold text-slate-800">Career Target</h3>
        <p className="text-sm text-slate-500 mt-1">Add the role and job description you are targeting.</p>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="targetRole" className="block text-sm font-medium text-slate-700 mb-1">
              Target Role <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="targetRole"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Backend Engineer"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              disabled={isSaving}
            />
          </div>
          <div>
            <label htmlFor="targetCompany" className="block text-sm font-medium text-slate-700 mb-1">
              Company (Optional)
            </label>
            <input
              type="text"
              id="targetCompany"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Google"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              disabled={isSaving}
            />
          </div>
          <div>
            <label htmlFor="jobDescription" className="block text-sm font-medium text-slate-700 mb-1">
              Actual Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the actual job description requirements here..."
              rows={6}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-y"
              disabled={isSaving}
            />
          </div>
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isSaving ? 'Saving...' : 'Save Target'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CareerTargetForm;
