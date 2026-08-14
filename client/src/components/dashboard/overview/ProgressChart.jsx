import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ProgressChart = ({ data = [] }) => {
  const chartData = data && data.length > 0 ? data.slice().reverse().map((item, i) => ({
    name: `Attempt ${i + 1}`,
    resume: item.type === 'resume-analysis' ? item.score : null,
    interview: item.type === 'mock-interview' ? item.score : null,
  })) : [];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full min-h-[350px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-slate-900">Career Progress Over Time</h3>
        <select className="bg-transparent text-sm font-medium text-slate-600 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Time</option>
        </select>
      </div>
      
      <div className="flex-1 w-full mt-2">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
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
              <Line type="monotone" dataKey="resume" name="Resume Match (%)" stroke="#2563eb" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} connectNulls={true} />
              <Line type="monotone" dataKey="interview" name="Interview Score (%)" stroke="#9333ea" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} connectNulls={true} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            No progress data available yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressChart;
