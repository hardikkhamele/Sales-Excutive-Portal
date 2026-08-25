import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { onboardingTrendData } from "../../data/mockData";

export const OnboardingChart = () => {
  const [timeframe, setTimeframe] = useState("This Month");

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-800">Overall Onboarding</h3>
          <p className="text-xs text-slate-400 font-medium">Performance timeline and company registration metrics</p>
        </div>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
        >
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 3 Months</option>
        </select>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={onboardingTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="onboardingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "12px",
                border: "none",
                color: "#fff",
                fontSize: "12px",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.3)"
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#onboardingGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
