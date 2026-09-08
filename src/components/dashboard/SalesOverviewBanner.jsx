import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  PlusCircle,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Building2
} from "lucide-react";
import { useSales } from "../../context/SalesContext";

export const SalesOverviewBanner = () => {
  const navigate = useNavigate();
  const { userProfile, companies, revenueStats } = useSales();

  const activeCompaniesCount = companies.filter(c => c.status === "Completed").length;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-slate-800/80">
      {/* Ambient background glows */}
      <div className="absolute right-0 top-0 translate-x-16 -translate-y-16 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/3 bottom-0 translate-y-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left: Sales Executive Welcome & Portal Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/20 backdrop-blur-xs">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              Technokrate Hire • Sales Operations
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Pipeline
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              Welcome back, {userProfile?.fullName || "Rahul Sharma"} 👋
            </h2>
            <p className="text-sm text-slate-300 mt-1 font-medium max-w-2xl">
              Here is your real-time overview for employer onboarding, recruiter calls, and subscription revenue.
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
            <div className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs border border-white/10 flex items-center gap-2">
              <span className="text-slate-400 font-medium">Monthly Target:</span>
              <span className="font-bold text-white">₹2,00,000</span>
            </div>
            <div className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs border border-white/10 flex items-center gap-2">
              <span className="text-slate-400 font-medium">Active Employers:</span>
              <span className="font-bold text-emerald-400">{activeCompaniesCount} Verified</span>
            </div>
            <div className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs border border-white/10 flex items-center gap-2">
              <span className="text-slate-400 font-medium">MTD Collections:</span>
              <span className="font-bold text-blue-300">
                ₹{(revenueStats?.totalRevenue || 125203).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex flex-wrap lg:flex-col sm:flex-row gap-2.5 shrink-0 self-start lg:self-center">
          <button
            onClick={() => navigate("/companies/add")}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer hover:scale-102"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Onboard Employer</span>
          </button>

          <button
            onClick={() => navigate("/activities")}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold backdrop-blur-xs border border-white/15 transition-all cursor-pointer hover:scale-102"
          >
            <PhoneCall className="w-4 h-4 text-blue-300" />
            <span>Log Recruiter Call</span>
          </button>

          <button
            onClick={() => navigate("/revenue")}
            className="flex items-center justify-center gap-2 px-4 py-2 text-slate-300 hover:text-white text-xs font-semibold hover:underline transition-all cursor-pointer"
          >
            <span>View Subscriptions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
