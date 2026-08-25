import React from "react";
import { BellRing, Calendar, User } from "lucide-react";
import { useSales } from "../../context/SalesContext";

export const FollowUpReminders = () => {
  const { reminders } = useSales();

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-800">Follow-up Reminders</h3>
          <p className="text-xs text-slate-400 font-medium">Pending company responses</p>
        </div>
        <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
          <BellRing className="w-5 h-5" />
        </span>
      </div>

      <div className="space-y-3">
        {reminders.map((rem) => (
          <div
            key={rem.id}
            className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between"
          >
            <div>
              <h4 className="text-xs font-bold text-slate-900">{rem.company}</h4>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
                <User className="w-3 h-3 text-slate-400" />
                <span>{rem.contactPerson}</span>
              </div>
            </div>

            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                rem.urgency === "urgent"
                  ? "bg-rose-50 text-rose-700 border-rose-200"
                  : rem.urgency === "warning"
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-blue-50 text-blue-700 border-blue-200"
              }`}
            >
              {rem.dueText}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
