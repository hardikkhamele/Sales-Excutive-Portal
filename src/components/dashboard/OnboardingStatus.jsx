import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { onboardingStatusPieData } from "../../data/mockData";

export const OnboardingStatus = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-slate-800">Onboarding Status</h3>
        <p className="text-xs text-slate-400 font-medium">Breakdown of current pipeline statuses</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-4">
        {/* Pie Donut Chart */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={onboardingStatusPieData}
                innerRadius={55}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
              >
                {onboardingStatusPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderRadius: "8px",
                  border: "none",
                  color: "#fff",
                  fontSize: "12px"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-extrabold text-slate-900 leading-none">128</span>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-1">Total</span>
          </div>
        </div>

        {/* Legend beside pie chart matching reference image */}
        <div className="flex flex-col gap-3 w-full sm:w-auto">
          {onboardingStatusPieData.map((item) => (
            <div key={item.name} className="flex items-center justify-between sm:justify-start gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-semibold text-slate-700">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">{item.value}</span>
                <span className="text-[11px] text-slate-400">({item.percentage})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
