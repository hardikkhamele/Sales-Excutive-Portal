import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, ChevronRight } from "lucide-react";
import { CallHistoryTracker } from "../components/dashboard/CallHistoryTracker";

export const CallHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Home className="w-3.5 h-3.5 text-blue-600" />
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Dashboard
          </button>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-700">Sales Call History</span>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 bg-white hover:bg-slate-50 border border-slate-200/80 px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Main Call History Tracker View */}
      <CallHistoryTracker />
    </div>
  );
};
