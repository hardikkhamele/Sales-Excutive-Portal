import React from "react";

export const Badge = ({ status, type, className = "" }) => {
  const getBadgeStyle = () => {
    const val = (status || type || "").toLowerCase();

    if (val === "completed") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    if (val === "pending") {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    if (val === "in progress") {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }
    if (val === "scheduled") {
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    }
    if (val === "discussion") {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }
    if (val === "follow-up" || val === "followup") {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    if (val === "proposal") {
      return "bg-purple-50 text-purple-700 border-purple-200";
    }
    if (val === "meeting") {
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    }
    if (val === "email") {
      return "bg-cyan-50 text-cyan-700 border-cyan-200";
    }
    if (val === "cancelled") {
      return "bg-rose-50 text-rose-700 border-rose-200";
    }

    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeStyle()} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {status || type}
    </span>
  );
};
