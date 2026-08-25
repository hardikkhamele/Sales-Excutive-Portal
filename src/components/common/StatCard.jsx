import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export const StatCard = ({
  title,
  value,
  change,
  changeType = "positive",
  period = "vs last month",
  icon: Icon,
  iconBg = "bg-blue-50 text-blue-600"
}) => {
  const isPositive = changeType === "positive";

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-xl ${iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
      </div>

      {change && (
        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium">
          <span
            className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md font-semibold ${
              isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
            }`}
          >
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {change}
          </span>
          <span className="text-slate-400">{period}</span>
        </div>
      )}
    </div>
  );
};
