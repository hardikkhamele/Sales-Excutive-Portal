import React from "react";
import {
  TrendingUp,
  BarChart3,
  LineChart,
  Target,
  Percent,
  Award,
  UserCheck,
  ArrowUpRight
} from "lucide-react";

export const SalesPerformanceCards = ({
  todaySales = "₹0",
  weeklySales = "₹0",
  monthlySales = "₹0",
  targetAmount = "₹32.0 Lakhs",
  achievedAmount = "₹0",
  achievedPercent = 0,
  remainingAmount = "₹32.00 Lakhs",
  conversionRate = "0.0%",
  industryBenchmark = "15%",
  wonDealsCount = 0,
  wonDealsValue = "₹0",
  activeDealsCount = 10,
  qualifiedCount = 0,
  leadConversionRate = "0%"
}) => {
  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="text-emerald-500">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">
            Sales Performance
          </h3>
        </div>

        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-lg">
          Real-Time Revenue Insights
        </span>
      </div>

      {/* Top 3 Solid Gradient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Today's Sales */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-lg backdrop-blur-xs">
              TODAY'S SALES
            </span>
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="my-2">
            <h4 className="text-3xl sm:text-4xl font-black tracking-tight">{todaySales}</h4>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-orange-100 font-medium">
            <ArrowUpRight className="w-4 h-4" />
            <span>Live Revenue Today</span>
          </div>
        </div>

        {/* Weekly Sales */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-lg backdrop-blur-xs">
              WEEKLY SALES
            </span>
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="my-2">
            <h4 className="text-3xl sm:text-4xl font-black tracking-tight">{weeklySales}</h4>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-blue-100 font-medium">
            <ArrowUpRight className="w-4 h-4" />
            <span>Current Week Revenue</span>
          </div>
        </div>

        {/* Monthly Sales */}
        <div className="bg-gradient-to-r from-purple-600 to-violet-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-lg backdrop-blur-xs">
              MONTHLY SALES
            </span>
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <LineChart className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="my-2">
            <h4 className="text-3xl sm:text-4xl font-black tracking-tight">{monthlySales}</h4>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-purple-100 font-medium">
            <ArrowUpRight className="w-4 h-4" />
            <span>Current Month Revenue</span>
          </div>
        </div>
      </div>

      {/* 4 Bottom Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Sales Target vs Achievement */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-orange-50 text-orange-500 rounded-lg">
                <Target className="w-4 h-4" />
              </div>
              <h5 className="text-xs font-bold text-slate-800 tracking-tight">
                Sales Target vs Achievement
              </h5>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Achieved: {achievedAmount}</span>
              <span className="text-orange-600 font-bold">{achievedPercent}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden my-3">
              <div
                className="bg-orange-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(Math.max(achievedPercent, 0), 100)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-50">
            <span>Target: <strong className="text-slate-700">{targetAmount}</strong></span>
            <span className="text-slate-700 font-semibold">{remainingAmount} Remaining</span>
          </div>
        </div>

        {/* 2. Conversion Rate */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-teal-50 text-teal-600 rounded-lg">
                  <Percent className="w-4 h-4" />
                </div>
                <h5 className="text-xs font-bold text-slate-800 tracking-tight">
                  Conversion Rate
                </h5>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                Real-time
              </span>
            </div>

            <div className="flex items-baseline gap-2 my-2">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {conversionRate}
              </span>
              <span className="text-xs text-slate-400 font-medium">overall rate</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-50">
            <span>Industry Benchmark: {industryBenchmark}</span>
            <span className="text-emerald-600 font-bold">On Track</span>
          </div>
        </div>

        {/* 3. Sales Deals Won */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
                <Award className="w-4 h-4" />
              </div>
              <h5 className="text-xs font-bold text-slate-800 tracking-tight">
                Sales Deals Won
              </h5>
            </div>

            {/* Purple Deals Capsule */}
            <div className="bg-purple-50/80 border border-purple-100 rounded-xl p-2.5 my-2 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-600 shrink-0" />
              <div>
                <p className="text-[10px] font-semibold text-purple-700 leading-none">
                  Closed / Approved Deals
                </p>
                <p className="text-xs font-bold text-purple-900 mt-0.5">
                  {wonDealsCount} Won Deals • {wonDealsValue}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-50">
            <span>Total Qualified: {qualifiedCount}</span>
            <span className="text-purple-700 font-bold">Active: {activeDealsCount}</span>
          </div>
        </div>

        {/* 4. Lead-to-Customer Conversion */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                <UserCheck className="w-4 h-4" />
              </div>
              <h5 className="text-xs font-bold text-slate-800 tracking-tight">
                Lead-to-Customer Conversion
              </h5>
            </div>

            <div className="flex items-baseline gap-2 my-2">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {leadConversionRate}
              </span>
              <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                Live Rate
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-50">
            <span>Total Qualified: {qualifiedCount}</span>
            <span className="text-blue-600 font-bold">Won Deals: {wonDealsCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
