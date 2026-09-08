import React from "react";
import { PhoneCall, History, CalendarCheck, Building2, Calendar } from "lucide-react";

export const TimeframeActivityCards = ({
  todayCalls = 3,
  yesterdayCalls = 2,
  weekCalls = 5,
  monthOnboarded = 10,
  activeFilter = "today",
  onFilterChange
}) => {
  const cards = [
    {
      id: "today",
      label: "TODAY'S OUTREACH",
      count: todayCalls,
      subtext: "Recruiter calls logged today",
      icon: PhoneCall,
      labelColor: "text-orange-600",
      iconBg: "bg-orange-500",
      borderColor: "border-orange-200/80 hover:border-orange-300",
      cardBg: "bg-orange-50/30"
    },
    {
      id: "yesterday",
      label: "YESTERDAY",
      count: yesterdayCalls,
      subtext: "Completed follow-ups",
      icon: History,
      labelColor: "text-blue-600",
      iconBg: "bg-blue-600",
      borderColor: "border-blue-200/80 hover:border-blue-300",
      cardBg: "bg-blue-50/30"
    },
    {
      id: "week",
      label: "THIS WEEK",
      count: weekCalls,
      subtext: "Active discussions & demos",
      icon: CalendarCheck,
      labelColor: "text-purple-600",
      iconBg: "bg-purple-600",
      borderColor: "border-purple-200/80 hover:border-purple-300",
      cardBg: "bg-purple-50/30"
    },
    {
      id: "month",
      label: "THIS MONTH",
      count: monthOnboarded,
      subtext: "Employers in pipeline",
      icon: Building2,
      labelColor: "text-emerald-600",
      iconBg: "bg-emerald-500",
      borderColor: "border-emerald-200/80 hover:border-emerald-300",
      cardBg: "bg-emerald-50/30"
    }
  ];

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-orange-50 text-orange-600 rounded-lg">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">
              Activity & Outreach Overview
            </h3>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Filter sales outreach by time window
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-200/80 px-3 py-1 rounded-lg">
          Live Outreach Filters
        </span>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          const isSelected = activeFilter === card.id;

          return (
            <div
              key={card.id}
              onClick={() => onFilterChange && onFilterChange(card.id)}
              className={`${card.cardBg} ${card.borderColor} border rounded-2xl p-5 transition-all duration-200 hover:shadow-md cursor-pointer relative overflow-hidden flex items-center justify-between ${
                isSelected ? "ring-2 ring-orange-500/50 shadow-sm" : ""
              }`}
            >
              <div>
                <span className={`text-[11px] font-extrabold uppercase tracking-wider ${card.labelColor}`}>
                  {card.label}
                </span>
                <h4 className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
                  {card.count}
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {card.subtext}
                </p>
              </div>

              <div className={`${card.iconBg} text-white p-3 rounded-2xl shadow-sm shrink-0 flex items-center justify-center`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
