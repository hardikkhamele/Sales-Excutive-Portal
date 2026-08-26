import React, { useState, useMemo } from "react";
import {
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  Clock,
  User,
  Building2,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  PhoneOff,
  Calendar,
  Trash2,
  MessageSquareText,
  TrendingUp,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { useSales } from "../../context/SalesContext";

export const CallHistoryTracker = () => {
  const { callLogs, addCallLog, deleteCallLog, companies } = useSales();

  const [activeFilter, setActiveFilter] = useState("today"); // "today" | "yesterday" | "this_week" | "prev_week" | "this_month" | "all"
  const [searchQuery, setSearchQuery] = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New call log form state
  const [newCall, setNewCall] = useState({
    company: companies[0]?.name || "ABC Pvt Ltd",
    contactPerson: companies[0]?.contactPerson || "Amit Verma",
    phone: companies[0]?.phone || "+91 98765 43210",
    outcome: "Connected",
    duration: "5 mins",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    notes: ""
  });

  // When company dropdown changes in modal, auto-fill contact person & phone
  const handleCompanySelect = (compName) => {
    const found = companies.find((c) => c.name === compName);
    setNewCall((prev) => ({
      ...prev,
      company: compName,
      contactPerson: found?.contactPerson || prev.contactPerson,
      phone: found?.contactPhone || found?.phone || prev.phone
    }));
  };

  // Helper date calculations
  const todayStr = new Date().toISOString().split("T")[0];

  const yesterdayStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  }, []);

  const weekRange = useMemo(() => {
    const now = new Date();
    const day = now.getDay();
    const diffToMonday = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now.getFullYear(), now.getMonth(), diffToMonday);
    const sunday = new Date(now.getFullYear(), now.getMonth(), diffToMonday + 6);
    return {
      start: monday.toISOString().split("T")[0],
      end: sunday.toISOString().split("T")[0]
    };
  }, []);

  const prevWeekRange = useMemo(() => {
    const now = new Date();
    const day = now.getDay();
    const diffToMonday = now.getDate() - day + (day === 0 ? -6 : 1) - 7;
    const prevMonday = new Date(now.getFullYear(), now.getMonth(), diffToMonday);
    const prevSunday = new Date(now.getFullYear(), now.getMonth(), diffToMonday + 6);
    return {
      start: prevMonday.toISOString().split("T")[0],
      end: prevSunday.toISOString().split("T")[0]
    };
  }, []);

  const monthRange = useMemo(() => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return {
      start: firstDay.toISOString().split("T")[0],
      end: lastDay.toISOString().split("T")[0]
    };
  }, []);

  // Filter call logs based on active dropdown filter and search
  const filteredCalls = useMemo(() => {
    return callLogs.filter((call) => {
      const callDate = call.date || todayStr;

      // Time Dropdown filter
      let matchesTime = true;
      if (activeFilter === "today") {
        matchesTime = callDate === todayStr;
      } else if (activeFilter === "yesterday") {
        matchesTime = callDate === yesterdayStr;
      } else if (activeFilter === "this_week") {
        matchesTime = callDate >= weekRange.start && callDate <= weekRange.end;
      } else if (activeFilter === "prev_week") {
        matchesTime = callDate >= prevWeekRange.start && callDate <= prevWeekRange.end;
      } else if (activeFilter === "this_month") {
        matchesTime = callDate >= monthRange.start && callDate <= monthRange.end;
      } else if (activeFilter === "all") {
        matchesTime = true;
      }

      // Outcome filter
      const matchesOutcome =
        outcomeFilter === "All" ||
        call.outcome.toLowerCase() === outcomeFilter.toLowerCase();

      // Search query
      const matchesSearch =
        (call.company || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (call.contactPerson || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (call.phone || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (call.notes || "").toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTime && matchesOutcome && matchesSearch;
    });
  }, [
    callLogs,
    activeFilter,
    outcomeFilter,
    searchQuery,
    todayStr,
    yesterdayStr,
    weekRange,
    prevWeekRange,
    monthRange
  ]);

  // Counts for each filter option
  const counts = useMemo(() => {
    const todayCount = callLogs.filter((c) => (c.date || todayStr) === todayStr).length;
    const yesterdayCount = callLogs.filter((c) => (c.date || todayStr) === yesterdayStr).length;
    const weekCount = callLogs.filter((c) => {
      const d = c.date || todayStr;
      return d >= weekRange.start && d <= weekRange.end;
    }).length;
    const prevWeekCount = callLogs.filter((c) => {
      const d = c.date || todayStr;
      return d >= prevWeekRange.start && d <= prevWeekRange.end;
    }).length;
    const monthCount = callLogs.filter((c) => {
      const d = c.date || todayStr;
      return d >= monthRange.start && d <= monthRange.end;
    }).length;
    return {
      today: todayCount,
      yesterday: yesterdayCount,
      this_week: weekCount,
      prev_week: prevWeekCount,
      this_month: monthCount,
      all: callLogs.length
    };
  }, [callLogs, todayStr, yesterdayStr, weekRange, prevWeekRange, monthRange]);

  const handleCreateCall = (e) => {
    e.preventDefault();
    addCallLog(newCall);
    setIsModalOpen(false);
    setNewCall({
      company: companies[0]?.name || "ABC Pvt Ltd",
      contactPerson: companies[0]?.contactPerson || "Amit Verma",
      phone: companies[0]?.phone || "+91 98765 43210",
      outcome: "Connected",
      duration: "5 mins",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      notes: ""
    });
  };

  const getOutcomeBadge = (outcome) => {
    switch (outcome) {
      case "Deal Closed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Connected":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Interested":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Follow-up Required":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Busy / No Answer":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-xl space-y-6">
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Sales Call History
              </h3>
              <span className="bg-blue-50 text-blue-600 font-bold text-[11px] px-2.5 py-0.5 rounded-full border border-blue-100">
                Live Tracking
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              History of calls made by the sales team with time filters & notes
            </p>
          </div>
        </div>

        {/* Log New Call Button */}
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
          className="self-start md:self-auto shrink-0 shadow-md shadow-blue-500/20"
        >
          Log New Call
        </Button>
      </div>

      {/* Filter Controls: Time Period Dropdown, Search Input, and Outcome Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/70 p-3 rounded-2xl border border-slate-200/70">
        {/* Left Side: Time Period Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Calendar className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none shadow-2xs transition-all"
            >
              <option value="today">Today's Calls ({counts.today})</option>
              <option value="yesterday">Yesterday's Calls ({counts.yesterday})</option>
              <option value="this_week">This Week ({counts.this_week})</option>
              <option value="prev_week">Previous Week ({counts.prev_week})</option>
              <option value="this_month">This Month ({counts.this_month})</option>
              <option value="all">All Calls ({counts.all})</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold shrink-0 border border-blue-100">
            <span>{filteredCalls.length}</span>
            <span className="text-blue-500 font-normal">showing</span>
          </span>
        </div>

        {/* Right Side: Search & Outcome Filter */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search company, HR..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
            />
          </div>

          <div className="relative">
            <select
              value={outcomeFilter}
              onChange={(e) => setOutcomeFilter(e.target.value)}
              className="pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none shadow-2xs"
            >
              <option value="All">All Outcomes</option>
              <option value="Connected">Connected</option>
              <option value="Interested">Interested</option>
              <option value="Deal Closed">Deal Closed</option>
              <option value="Busy / No Answer">Busy / No Answer</option>
              <option value="Voicemail / Message">Voicemail</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Call History Log Items List */}
      <div className="space-y-3">
        {filteredCalls.length === 0 ? (
          <div className="p-8 text-center bg-slate-50/60 rounded-2xl border border-dashed border-slate-200 space-y-2">
            <PhoneOff className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-bold text-slate-600">No calls found for this filter</p>
            <p className="text-[11px] text-slate-400">
              Click "Log New Call" above to record a sales interaction.
            </p>
          </div>
        ) : (
          filteredCalls.map((call) => (
            <div
              key={call.id}
              className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-blue-200 hover:bg-white transition-all shadow-2xs hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              {/* Left Details */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center font-bold shrink-0 mt-0.5">
                  <PhoneOutgoing className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-sm text-slate-900 tracking-tight">
                      {call.company}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getOutcomeBadge(
                        call.outcome
                      )}`}
                    >
                      {call.outcome}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium flex-wrap">
                    <span className="flex items-center gap-1 text-slate-700 font-semibold">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {call.contactPerson}
                    </span>
                    <span>•</span>
                    <a
                      href={`tel:${call.phone}`}
                      className="text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                    >
                      {call.phone}
                    </a>
                  </div>

                  {call.notes && (
                    <p className="text-xs text-slate-600 bg-white/80 p-2.5 rounded-xl border border-slate-200/60 mt-2 leading-relaxed flex items-start gap-1.5">
                      <MessageSquareText className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{call.notes}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Right Info & Actions */}
              <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                <div className="text-right">
                  <div className="flex items-center gap-1.5 justify-end text-xs font-bold text-slate-800">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{call.time}</span>
                    <span className="text-slate-400 text-[10px] font-semibold">({call.duration})</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 block mt-0.5">
                    {call.date}
                  </span>
                </div>

                <button
                  onClick={() => deleteCallLog(call.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                  title="Delete call log"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Log Call Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Log Sales Call"
      >
        <form onSubmit={handleCreateCall} className="space-y-4">
          {/* Company Select */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Company
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={newCall.company}
                onChange={(e) => handleCompanySelect(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
              >
                {companies.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Contact Person */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Contact Person / HR
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={newCall.contactPerson}
                  onChange={(e) => setNewCall({ ...newCall, contactPerson: e.target.value })}
                  placeholder="e.g. Amit Verma"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={newCall.phone}
                  onChange={(e) => setNewCall({ ...newCall, phone: e.target.value })}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Call Outcome */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Call Outcome
              </label>
              <select
                value={newCall.outcome}
                onChange={(e) => setNewCall({ ...newCall, outcome: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
              >
                <option value="Connected">Connected (Discussion)</option>
                <option value="Interested">Interested (Follow-up)</option>
                <option value="Deal Closed">Deal Closed / Won</option>
                <option value="Follow-up Required">Follow-up Required</option>
                <option value="Busy / No Answer">Busy / No Answer</option>
                <option value="Voicemail / Message">Voicemail / Message Left</option>
              </select>
            </div>

            {/* Call Duration */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Call Duration
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={newCall.duration}
                  onChange={(e) => setNewCall({ ...newCall, duration: e.target.value })}
                  placeholder="e.g. 8 mins"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Call Date
              </label>
              <input
                type="date"
                value={newCall.date}
                onChange={(e) => setNewCall({ ...newCall, date: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Call Time
              </label>
              <input
                type="text"
                value={newCall.time}
                onChange={(e) => setNewCall({ ...newCall, time: e.target.value })}
                placeholder="e.g. 10:30 AM"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Call Notes & Discussion Summary
            </label>
            <textarea
              rows={3}
              value={newCall.notes}
              onChange={(e) => setNewCall({ ...newCall, notes: e.target.value })}
              placeholder="What was discussed during the call? Next steps..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Call Log
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
