import React from "react";
import { TrendingUp, Target, Award } from "lucide-react";

export const PerformanceCard = () => {
  const current = 78;
  const target = 100;
  const percentage = Math.round((current / target) * 100);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800">My Performance</h3>
          <p className="text-xs text-slate-400 font-medium">This Month</p>
        </div>
        <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
          <Award className="w-5 h-5" />
        </div>
      </div>

      <div className="my-4">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Work Done</span>
        <div className="flex items-baseline justify-between mt-1">
          <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{current}</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
            <TrendingUp className="w-3.5 h-3.5" />
            +18% vs last month
          </span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
          <span className="flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-blue-600" />
            Target {target}
          </span>
          <span className="text-blue-600 font-bold">{percentage}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/60">
          <div
            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500 shadow-xs"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
