import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { useSales } from "../../context/SalesContext";

export const DailyActivitiesSummaryCard = () => {
  const navigate = useNavigate();
  const { activities } = useSales();

  const totalActivities = (activities || []).length || 5;
  const discussions = (activities || []).filter(
    (a) => a.type === "Discussion" || a.type === "Meeting"
  ).length || 3;
  const followups = (activities || []).filter(
    (a) => a.type === "Follow-up" || a.type === "Proposal" || a.type === "Email"
  ).length || 2;

  return (
    <div
      onClick={() => navigate("/activities")}
      className="bg-white rounded-2xl p-6 border border-slate-100/90 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
    >
      {/* Top: Header Info & Icon */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Task & Schedule
          </span>
          <h4 className="text-xl font-black text-slate-800 tracking-tight mt-1 group-hover:text-purple-600 transition-colors">
            Daily Activities
          </h4>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Today's scheduled interactions & tasks
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20 shrink-0 group-hover:scale-105 transition-transform">
          <Calendar className="w-6 h-6" />
        </div>
      </div>

      {/* Middle: Big Stat & Micro Tags */}
      <div className="my-5">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-900 tracking-tight">
            {totalActivities}
          </span>
          <span className="text-xs text-slate-500 font-medium">scheduled activities</span>
        </div>

        <div className="flex items-center gap-2 mt-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            {discussions} Discussions
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            {followups} Follow-ups
          </span>
        </div>
      </div>

      {/* Bottom: Status Pill + Action Link */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5 font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg">
          <Clock className="w-3.5 h-3.5" />
          Today's Schedule
        </span>
        <span className="font-bold text-slate-500 group-hover:text-purple-600 flex items-center gap-1 transition-colors">
          View Activities
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );
};
