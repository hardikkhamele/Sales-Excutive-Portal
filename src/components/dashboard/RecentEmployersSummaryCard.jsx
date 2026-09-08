import React from "react";
import { useNavigate } from "react-router-dom";
import { Building2, ArrowRight, ShieldCheck } from "lucide-react";
import { useSales } from "../../context/SalesContext";

export const RecentEmployersSummaryCard = () => {
  const navigate = useNavigate();
  const { companies } = useSales();

  const total = (companies || []).length;
  const activeCount = (companies || []).filter((c) => c.status === "Completed").length;
  const inProgressCount = (companies || []).filter(
    (c) => c.status === "Pending" || c.status === "In Progress"
  ).length;

  return (
    <div
      onClick={() => navigate("/companies")}
      className="bg-white rounded-2xl p-6 border border-slate-100/90 shadow-sm hover:shadow-md hover:border-teal-300 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
    >
      {/* Top: Header Info & Icon */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Employer Database
          </span>
          <h4 className="text-xl font-black text-slate-800 tracking-tight mt-1 group-hover:text-teal-600 transition-colors">
            Recent Employers
          </h4>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Onboarded hiring partners & recruiters
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-500/20 shrink-0 group-hover:scale-105 transition-transform">
          <Building2 className="w-6 h-6" />
        </div>
      </div>

      {/* Middle: Big Stat & Micro Tags */}
      <div className="my-5">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-900 tracking-tight">
            {total}
          </span>
          <span className="text-xs text-slate-500 font-medium">employers registered</span>
        </div>

        <div className="flex items-center gap-2 mt-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {activeCount} Verified KYC
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-100">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {inProgressCount} In Review
          </span>
        </div>
      </div>

      {/* Bottom: Status Pill + Action Link */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5 font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg">
          <ShieldCheck className="w-3.5 h-3.5" />
          Hiring Partners
        </span>
        <span className="font-bold text-slate-500 group-hover:text-teal-600 flex items-center gap-1 transition-colors">
          View Companies
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );
};
