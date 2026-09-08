import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  ClipboardList,
  Sparkles,
  Activity,
  CheckCircle2,
  PhoneCall,
  AlertTriangle,
  Video,
  FileText,
  CreditCard,
  Briefcase,
  Users,
  UserX,
  Phone,
  IndianRupee,
  ChevronRight
} from "lucide-react";

export const KeyDashboardCards = ({
  totalLeads = 8925,
  newLeadsToday = 11,
  activeLeads = 10,
  qualifiedLeads = 0,
  followUpsToday = 10,
  overdueFollowUps = 0,
  meetingsToday = 10,
  proposalsSent = 0,
  pendingPayments = "₹0",
  projectsInProgress = 0,
  convertedClients = 25,
  lostLeads = 2,
  callLogsLogged = 15,
  revenueGenerated = "₹1,25,203"
}) => {
  const navigate = useNavigate();

  const cards = [
    {
      id: "total_leads",
      title: "TOTAL LEADS",
      value: typeof totalLeads === "number" ? totalLeads.toLocaleString() : totalLeads,
      icon: ClipboardList,
      iconBg: "bg-blue-600",
      pillText: "Real-time",
      pillStyle: "bg-emerald-50 text-emerald-600 border border-emerald-200/60",
      path: "/companies"
    },
    {
      id: "new_leads_today",
      title: "NEW LEADS TODAY",
      value: newLeadsToday,
      icon: Sparkles,
      iconBg: "bg-orange-500",
      pillText: "Today",
      pillStyle: "bg-sky-50 text-sky-600 border border-sky-200/60",
      path: "/companies"
    },
    {
      id: "active_leads",
      title: "ACTIVE LEADS",
      value: activeLeads,
      icon: Activity,
      iconBg: "bg-sky-500",
      pillText: "Pending",
      pillStyle: "bg-amber-50 text-amber-600 border border-amber-200/60",
      path: "/companies"
    },
    {
      id: "qualified_leads",
      title: "QUALIFIED LEADS",
      value: qualifiedLeads,
      icon: CheckCircle2,
      iconBg: "bg-emerald-500",
      pillText: "Approved",
      pillStyle: "bg-emerald-50 text-emerald-600 border border-emerald-200/60",
      path: "/companies"
    },
    {
      id: "follow_ups_today",
      title: "FOLLOW-UPS TODAY",
      value: followUpsToday,
      icon: PhoneCall,
      iconBg: "bg-amber-500",
      pillText: "Pending",
      pillStyle: "bg-amber-50 text-amber-600 border border-amber-200/60",
      path: "/activities"
    },
    {
      id: "overdue_follow_ups",
      title: "OVERDUE FOLLOW-UPS",
      value: overdueFollowUps,
      icon: AlertTriangle,
      iconBg: "bg-rose-500",
      pillText: "Urgent",
      pillStyle: "bg-rose-50 text-rose-600 border border-rose-200/60",
      path: "/activities"
    },
    {
      id: "meetings_today",
      title: "MEETINGS TODAY",
      value: meetingsToday,
      icon: Video,
      iconBg: "bg-purple-600",
      pillText: "Scheduled",
      pillStyle: "bg-purple-50 text-purple-600 border border-purple-200/60",
      path: "/activities"
    },
    {
      id: "proposals_sent",
      title: "PROPOSALS SENT",
      value: proposalsSent,
      icon: FileText,
      iconBg: "bg-indigo-600",
      pillText: "Sent",
      pillStyle: "bg-indigo-50 text-indigo-600 border border-indigo-200/60",
      path: "/companies"
    },
    {
      id: "pending_payments",
      title: "PENDING PAYMENTS",
      value: pendingPayments,
      icon: CreditCard,
      iconBg: "bg-amber-500",
      pillText: "Pending",
      pillStyle: "bg-rose-50 text-rose-600 border border-rose-200/60",
      path: "/revenue"
    },
    {
      id: "projects_in_progress",
      title: "PROJECTS IN PROGRESS",
      value: projectsInProgress,
      icon: Briefcase,
      iconBg: "bg-purple-600",
      pillText: "Ongoing",
      pillStyle: "bg-emerald-50 text-emerald-600 border border-emerald-200/60",
      path: "/companies"
    },
    {
      id: "converted_clients",
      title: "CONVERTED CLIENTS",
      value: convertedClients,
      icon: Users,
      iconBg: "bg-teal-500",
      pillText: "Won Deals",
      pillStyle: "bg-emerald-50 text-emerald-600 border border-emerald-200/60",
      path: "/revenue"
    },
    {
      id: "lost_leads",
      title: "LOST LEADS",
      value: lostLeads,
      icon: UserX,
      iconBg: "bg-slate-500",
      pillText: "Rejected",
      pillStyle: "bg-rose-50 text-rose-600 border border-rose-200/60",
      path: "/companies"
    },
    {
      id: "call_logs_logged",
      title: "CALL LOGS LOGGED",
      value: callLogsLogged,
      icon: Phone,
      iconBg: "bg-blue-500",
      pillText: "Real-time",
      pillStyle: "bg-sky-50 text-sky-600 border border-sky-200/60",
      path: "/activities"
    },
    {
      id: "revenue_generated",
      title: "REVENUE GENERATED",
      value: revenueGenerated,
      icon: IndianRupee,
      iconBg: "bg-emerald-600",
      pillText: "Approved",
      pillStyle: "bg-emerald-50 text-emerald-600 border border-emerald-200/60",
      path: "/revenue"
    }
  ];

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="text-orange-500">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">
            Key Dashboard Cards
          </h3>
        </div>

        <span className="text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200/70 px-3 py-1 rounded-lg">
          14 Metrics Tracked
        </span>
      </div>

      {/* 14 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-5 border border-slate-100/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              {/* Top: Label + Value + Icon */}
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

              {/* Bottom: Pill status + View Details */}
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
