import React, { useState } from "react";
import { Download, Filter, TrendingUp, BarChart3, CheckCircle2, Percent, Clock } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { StatCard } from "../components/common/StatCard";
import { Button } from "../components/common/Button";
import { activityOverviewBarData, onboardingStatusPieData, monthlySalesTrendData } from "../data/mockData";
import { toast } from "react-toastify";

export const Reports = () => {
  const [timeframe, setTimeframe] = useState("This Month");

  const handleDownloadReport = () => {
    // Generate simple CSV content for download simulation
    const csvContent = `Data Metric,Value,Period\nTotal Activities,245,This Month\nCompleted Activities,168,This Month\nConversion Rate,68%,This Month\nAvg Response Time,2.4 hrs,This Month\n`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Sales_Report_${timeframe.replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Sales report downloaded successfully!");
  };

  return (
    <div className="space-y-8">
      {/* Header Bar Controls matching Image #9 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
        </div>

        <Button variant="primary" icon={Download} onClick={handleDownloadReport}>
          Download Report
        </Button>
      </div>

      {/* Top 4 KPI Cards matching Image #9 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Activities"
          value="245"
          change="+18%"
          changeType="positive"
          period="vs last month"
          icon={BarChart3}
          iconBg="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Completed Activities"
          value="168"
          change="+15%"
          changeType="positive"
          period="vs last month"
          icon={CheckCircle2}
          iconBg="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Conversion Rate"
          value="68%"
          change="+10%"
          changeType="positive"
          period="vs last month"
          icon={Percent}
          iconBg="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          title="Avg. Response Time"
          value="2.4 hrs"
          change="-8%"
          changeType="positive"
          period="vs last month"
          icon={Clock}
          iconBg="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Analytics Charts Grid matching Image #9 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Activity Overview Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="mb-6">
            <h3 className="text-base font-bold text-slate-800">Activities Overview</h3>
            <p className="text-xs text-slate-400 font-medium">Activity breakdown by engagement type ({timeframe})</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityOverviewBarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="type" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderRadius: "12px",
                    border: "none",
                    color: "#fff",
                    fontSize: "12px"
                  }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Company Status Donut Chart */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-800">Company Status</h3>
            <p className="text-xs text-slate-400 font-medium">Distribution of company onboarding states</p>
          </div>

          <div className="relative h-56 flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={onboardingStatusPieData}
                  innerRadius={60}
                  outerRadius={85}
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

          <div className="flex items-center justify-around border-t border-slate-100 pt-4">
            {onboardingStatusPieData.map((item) => (
              <div key={item.name} className="flex flex-col items-center text-center">
                <span className="text-xs font-bold text-slate-800">{item.value}</span>
                <span className="text-[11px] font-semibold text-slate-400 mt-0.5">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Monthly Sales Trend Line/Area Chart */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="mb-6">
          <h3 className="text-base font-bold text-slate-800">Monthly Sales Activity Trend</h3>
          <p className="text-xs text-slate-400 font-medium">Comparative review of sales activities vs conversions</p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlySalesTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="activitiesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="conversionsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderRadius: "12px",
                  border: "none",
                  color: "#fff",
                  fontSize: "12px"
                }}
              />
              <Area type="monotone" dataKey="activities" stroke="#3b82f6" strokeWidth={3} fill="url(#activitiesGradient)" name="Activities" />
              <Area type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={3} fill="url(#conversionsGradient)" name="Conversions" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
