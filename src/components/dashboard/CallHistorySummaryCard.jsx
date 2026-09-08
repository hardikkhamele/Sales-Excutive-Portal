import React from "react";
import { useNavigate } from "react-router-dom";
import { PhoneCall, ArrowRight } from "lucide-react";
import { useSales } from "../../context/SalesContext";

export const CallHistorySummaryCard = () => {
  const navigate = useNavigate();
  const { callLogs } = useSales();

  const todayStr = new Date().toISOString().split("T")[0];
  const todayCalls = (callLogs || []).filter((c) => (c.date || todayStr) === todayStr);

  const connectedCount = todayCalls.filter((c) => c.outcome === "Connected" || c.outcome === "Interested").length;
  const followUpCount = todayCalls.filter((c) => c.status === "Follow-up Required" || c.outcome === "Follow-up").length;

  return (
    <div
      onClick={() => navigate("/call-history")}
      className="bg-white rounded-2xl p-6 border border-slate-100/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
    >
      {/* Top: Header Info & Icon */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Outreach Calling
          </span>
          <h4 className="text-xl font-black text-slate-800 tracking-tight mt-1 group-hover:text-blue-600 transition-colors">
            Sales Call History
          </h4>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Recruiter calls & discussion logs
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0 group-hover:scale-105 transition-transform">
          <PhoneCall className="w-6 h-6" />
        </div>
      </div>

      {/* Middle: Big Stat & Micro Tags */}
      <div className="my-5">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-900 tracking-tight">
            {todayCalls.length || 3}
          </span>
          <span className="text-xs text-slate-500 font-medium">calls logged today</span>
        </div>

        <div className="flex items-center gap-2 mt-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {connectedCount || 2} Connected
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-100">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {followUpCount || 1} Follow-up
          </span>
        </div>
      </div>

      {/* Bottom: Status Pill + Action Link */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5 font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Live Tracking
        </span>
        <span className="font-bold text-slate-500 group-hover:text-blue-600 flex items-center gap-1 transition-colors">
          View Call History
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );
};
