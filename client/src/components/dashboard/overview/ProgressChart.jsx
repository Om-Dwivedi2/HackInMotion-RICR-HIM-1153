import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Attempt 1', resume: 72, interview: 65 },
  { name: 'Attempt 2', resume: 78, interview: 74 },
  { name: 'Attempt 3', resume: 82, interview: 81 },
  { name: 'Attempt 4', resume: 85, interview: 81 },
];

const ProgressChart = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full min-h-[350px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-slate-900">Career Progress Over Time</h3>
        <select className="bg-transparent text-sm font-medium text-slate-600 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Last 4 Attempts</option>
          <option>Last 10 Attempts</option>
          <option>All Time</option>
        </select>
      </div>
      
      <div className="flex-1 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend 
              verticalAlign="top" 
              align="left" 
              wrapperStyle={{ paddingBottom: '20px' }} 
              iconType="circle"
              iconSize={8}
            />
            <Line type="monotone" dataKey="resume" name="Resume Match (%)" stroke="#2563eb" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="interview" name="Interview Score (%)" stroke="#9333ea" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;
