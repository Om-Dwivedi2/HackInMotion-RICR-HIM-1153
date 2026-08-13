import React from 'react';

const ResumePreview = () => {
  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden h-[600px] flex flex-col">
      <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
        <h3 className="font-semibold text-slate-800">Resume Preview</h3>
      </div>
      
      {/* Fake resume document */}
      <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
        <div className="max-w-[21cm] mx-auto bg-white min-h-[29.7cm] shadow-sm border border-slate-200 p-10 font-serif">
          
          <div className="text-center mb-8 border-b border-slate-200 pb-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Om Dwivedi</h1>
            <p className="text-lg text-slate-700">Backend Engineer</p>
            <div className="mt-3 text-sm text-slate-600 flex justify-center gap-4">
              <span>om.dwivedi@example.com</span>
              <span>•</span>
              <span>+1 (555) 123-4567</span>
              <span>•</span>
              <span>San Francisco, CA</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-300 pb-1">Professional Summary</h2>
            <p className="text-slate-700 text-sm leading-relaxed">
              Results-driven Backend Engineer with a strong foundation in modern web technologies and a passion for building scalable, robust systems. Experienced in designing APIs, optimizing database queries, and collaborating with cross-functional teams to deliver high-quality software solutions.
            </p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-300 pb-1">Experience</h2>
            
            <div className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-slate-800">Software Engineer Intern</h3>
                <span className="text-sm font-medium text-slate-600">Jun 2025 - Present</span>
              </div>
              <div className="text-sm text-slate-600 italic mb-2">Tech Solutions Inc., San Jose, CA</div>
              <ul className="list-disc list-outside ml-5 text-sm text-slate-700 space-y-1">
                <li>Developed and maintained RESTful APIs using Node.js and Express, improving data retrieval speed by 25%.</li>
                <li>Collaborated with frontend developers to integrate APIs into React applications.</li>
                <li>Participated in code reviews and agile ceremonies to ensure code quality and project alignment.</li>
              </ul>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-300 pb-1">Skills</h2>
            <div className="text-sm text-slate-700">
              <p className="mb-1"><span className="font-bold">Languages:</span> JavaScript, Python, Java, SQL</p>
              <p className="mb-1"><span className="font-bold">Frameworks:</span> Node.js, Express, React, Spring Boot</p>
              <p className="mb-1"><span className="font-bold">Databases:</span> MongoDB, PostgreSQL, MySQL</p>
              <p><span className="font-bold">Tools:</span> Git, Docker, AWS, Postman</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-300 pb-1">Education</h2>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-slate-800">B.Tech in Computer Science</h3>
              <span className="text-sm font-medium text-slate-600">Expected May 2026</span>
            </div>
            <div className="text-sm text-slate-600 italic">University of Technology</div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
