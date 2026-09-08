import React from "react";
import { Calendar, History, CalendarCheck, CalendarRange } from "lucide-react";

export const DateAnalyticsOverview = ({
  todayCount = 11,
  yesterdayCount = 0,
  weekCount = 11,
  monthCount = 165,
  activeFilter = "today",
  onFilterSelect
}) => {
  const filterCards = [
    {
      id: "today",
      label: "TODAY",
      count: todayCount,
      subtext: "Today's Leads",
      icon: Calendar,
      labelColor: "text-orange-600",
      iconBg: "bg-orange-500",
      borderColor: "border-orange-200/80 hover:border-orange-300",
      cardBg: "bg-orange-50/30"
    },
    {
      id: "yesterday",
      label: "YESTERDAY",
      count: yesterdayCount,
      subtext: "Previous Day Leads",
      icon: History,
      labelColor: "text-blue-600",
      iconBg: "bg-blue-600",
      borderColor: "border-blue-200/80 hover:border-blue-300",
      cardBg: "bg-blue-50/30"
    },
    {
      id: "week",
      label: "IN WEEK",
      count: weekCount,
      subtext: "Current Week Leads",
      icon: CalendarCheck,
      labelColor: "text-purple-600",
      iconBg: "bg-purple-600",
      borderColor: "border-purple-200/80 hover:border-purple-300",
      cardBg: "bg-purple-50/30"
    },
    {
      id: "month",
      label: "IN MONTH",
      count: monthCount,
      subtext: "Current Month Leads",
      icon: CalendarRange,
      labelColor: "text-emerald-600",
      iconBg: "bg-emerald-500",
      borderColor: "border-emerald-200/80 hover:border-emerald-300",
      cardBg: "bg-emerald-50/30"
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="text-orange-500">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">
            Date Analytics Overview
          </h3>
        </div>

        <span className="text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-200/80 px-3 py-1 rounded-lg">
          Lead Filter Cards
        </span>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filterCards.map((card) => {
          const Icon = card.icon;
          const isSelected = activeFilter === card.id;

          return (
            <div
              key={card.id}
              onClick={() => onFilterSelect && onFilterSelect(card.id)}
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
