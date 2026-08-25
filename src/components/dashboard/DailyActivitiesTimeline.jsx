import React from "react";
import { Badge } from "../common/Badge";
import { Clock } from "lucide-react";
import { useSales } from "../../context/SalesContext";

export const DailyActivitiesTimeline = () => {
  const { activities } = useSales();
  const todayList = activities.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-800">Daily Activities</h3>
          <p className="text-xs text-slate-400 font-medium">Today's scheduled interactions</p>
        </div>
        <span className="p-1.5 bg-slate-100 rounded-lg text-slate-500">
          <Clock className="w-4 h-4" />
        </span>
      </div>

      <div className="space-y-3.5">
        {todayList.map((act) => (
          <div
            key={act.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-colors gap-2"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs shrink-0">
                {act.time}
              </span>
              <span className="text-xs font-bold text-slate-800 line-clamp-1">{act.title}</span>
            </div>
            <Badge type={act.type} className="self-start sm:self-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};
