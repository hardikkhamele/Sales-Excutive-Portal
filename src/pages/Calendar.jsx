import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Building2, Tag } from "lucide-react";
import { Badge } from "../components/common/Badge";
import { Modal } from "../components/common/Modal";
import { useSales } from "../context/SalesContext";

export const Calendar = () => {
  const { calendarEvents } = useSales();
  const [currentDate, setCurrentDate] = useState(new Date(2024, 4, 1)); // May 2024 matching reference image
  const [viewMode, setViewMode] = useState("Month");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const resetToday = () => {
    setCurrentDate(new Date(2024, 4, 15));
  };

  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // Map events by day number for May 2024
  const getEventsForDay = (dayNum) => {
    const formattedDateStr = `2024-05-${String(dayNum).padStart(2, "0")}`;
    return calendarEvents.filter(e => e.date === formattedDateStr || e.date === `2024-05-${dayNum}`);
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header Bar matching Image #8 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Controls: Today, Prev, Next */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={resetToday}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Today
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextMonth}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-lg font-extrabold text-slate-900 ml-2">{monthName}</h2>
        </div>

        {/* View Switches: Month, Week, Day */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
          {["Month", "Week", "Day"].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === mode
                  ? "bg-white text-blue-600 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Calendar Body matching Reference Image #8 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Day Names Header */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/80 text-center font-bold text-slate-500 text-xs py-3">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Month Grid Cells */}
        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-100 bg-white">
          {/* Empty lead cells */}
          {Array.from({ length: firstDay }, (_, i) => (
            <div key={`empty-${i}`} className="min-h-[110px] bg-slate-50/30 p-2 opacity-30" />
          ))}

          {/* Days of Month */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const dayNum = i + 1;
            const dayEvents = getEventsForDay(dayNum);
            const isToday = dayNum === 15; // Highlight May 15 matching image

            return (
              <div
                key={`day-${dayNum}`}
                className={`min-h-[110px] p-2 transition-colors hover:bg-slate-50/80 ${
                  isToday ? "bg-blue-50/20" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      isToday
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-700"
                    }`}
                  >
                    {dayNum}
                  </span>
                </div>

                {/* Render Event Badges */}
                <div className="space-y-1 overflow-y-auto max-h-[80px]">
                  {dayEvents.map((evt) => (
                    <div
                      key={evt.id}
                      onClick={() => setSelectedEvent(evt)}
                      className={`p-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-transform hover:scale-[1.02] truncate shadow-2xs border ${
                        evt.type === "Follow-up"
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : evt.type === "Meeting"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                          : evt.type === "Proposal"
                          ? "bg-purple-100 text-purple-800 border-purple-200"
                          : "bg-amber-100 text-amber-800 border-amber-200"
                      }`}
                      title={evt.title}
                    >
                      {evt.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Modal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          title="Event Details"
        >
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <h4 className="text-base font-bold text-slate-900">{selectedEvent.title}</h4>
              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">{selectedEvent.time}</span> (Date: {selectedEvent.date})
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">{selectedEvent.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-600" />
                  <Badge type={selectedEvent.type} />
                  <Badge status={selectedEvent.status} />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
