import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Building2,
  CheckCircle2,
  Clock,
  Zap,
  PhoneCall,
  BellRing,
  Video,
  TrendingUp,
  ChevronRight
} from "lucide-react";

export const EmployerKpiCards = ({
  totalCompanies = 8,
  activeCompanies = 6,
  pendingVerification = 2,
  paidSubscribers = 25,
  callsToday = 3,
  followUpsDue = 3,
  scheduledMeetings = 5,
  avgDealSize = "₹5,008"
}) => {
  const navigate = useNavigate();

  const kpiCards = [
    {
      id: "total_employers",
      title: "TOTAL EMPLOYERS",
      value: totalCompanies,
      icon: Building2,
      iconBg: "bg-blue-600",
      pillText: "Registered",
      pillStyle: "bg-blue-50 text-blue-600 border border-blue-200/60",
      path: "/companies"
    },
    {
      id: "active_verified",
      title: "ACTIVE & VERIFIED",
      value: activeCompanies,
      icon: CheckCircle2,
      iconBg: "bg-emerald-500",
      pillText: "Verified KYC",
      pillStyle: "bg-emerald-50 text-emerald-600 border border-emerald-200/60",
      path: "/companies"
    },
    {
      id: "pending_verification",
      title: "IN VERIFICATION",
      value: pendingVerification,
      icon: Clock,
      iconBg: "bg-amber-500",
      pillText: "Needs Action",
      pillStyle: "bg-amber-50 text-amber-600 border border-amber-200/60",
      path: "/companies"
    },
    {
      id: "paid_subscribers",
      title: "PAID SUBSCRIBERS",
      value: paidSubscribers,
      icon: Zap,
      iconBg: "bg-indigo-600",
      pillText: "Active Plans",
      pillStyle: "bg-indigo-50 text-indigo-600 border border-indigo-200/60",
      path: "/revenue"
    },
    {
      id: "calls_logged_today",
      title: "CALLS LOGGED TODAY",
      value: callsToday,
      icon: PhoneCall,
      iconBg: "bg-sky-500",
      pillText: "Recruiter Calls",
      pillStyle: "bg-sky-50 text-sky-600 border border-sky-200/60",
      path: "/activities"
    },
    {
      id: "follow_ups_due",
      title: "FOLLOW-UPS DUE",
      value: followUpsDue,
      icon: BellRing,
      iconBg: "bg-rose-500",
      pillText: "High Priority",
      pillStyle: "bg-rose-50 text-rose-600 border border-rose-200/60",
      path: "/activities"
    },
    {
      id: "scheduled_meetings",
      title: "SCHEDULED DEMOS",
      value: scheduledMeetings,
      icon: Video,
      iconBg: "bg-purple-600",
      pillText: "HR Meetings",
      pillStyle: "bg-purple-50 text-purple-600 border border-purple-200/60",
      path: "/activities"
    },
    {
      id: "avg_deal_size",
      title: "AVG. DEAL SIZE",
      value: avgDealSize,
      icon: TrendingUp,
      iconBg: "bg-teal-600",
      pillText: "Per Package",
      pillStyle: "bg-teal-50 text-teal-600 border border-teal-200/60",
      path: "/revenue"
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
            <LayoutGrid className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">
              Employer Pipeline & Operations
            </h3>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Key operational metrics for job portal hiring partners
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200/70 px-3 py-1 rounded-lg">
          8 Key Metrics
        </span>
      </div>

      {/* 8 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-5 border border-slate-100/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              {/* Top: Label + Large Value + Icon */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    {card.title}
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 tracking-tight">
                    {card.value}
                  </h4>
                </div>

                <div
                  className={`w-11 h-11 rounded-2xl ${card.iconBg} text-white shadow-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom: Pill tag + View Details button */}
              <div className="mt-5 pt-3 border-t border-slate-50 flex items-center justify-between text-xs">
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${card.pillStyle}`}>
                  {card.pillText}
                </span>

                <button
                  onClick={() => navigate(card.path)}
                  className="text-slate-400 hover:text-blue-600 font-semibold flex items-center gap-0.5 transition-colors cursor-pointer"
                >
                  View Details
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
