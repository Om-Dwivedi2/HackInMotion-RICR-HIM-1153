import React from 'react';
import Card from './Card';

const MetricCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  className = '',
}) => {
  return (
    <Card className={`flex flex-col ${className}`}>
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        {icon && (
          <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
            {icon}
          </div>
        )}
      </div>
      
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-slate-900">{value}</span>
        {subtitle && (
          <span className="text-sm font-medium text-slate-500">{subtitle}</span>
        )}
      </div>

      {trend && (
        <div className="mt-2 flex items-center text-sm">
          <span className={`font-medium ${trend.positive ? 'text-emerald-600' : 'text-slate-500'}`}>
            {trend.value}
          </span>
          <span className="ml-2 text-slate-500">{trend.label}</span>
        </div>
      )}
    </Card>
  );
};

export default MetricCard;
