import React, { useState } from "react";
import { Plus, Search, Filter, Calendar, Clock, ListTodo } from "lucide-react";
import { DataTable } from "../components/common/DataTable";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { Modal } from "../components/common/Modal";
import { Breadcrumb } from "../components/common/Breadcrumb";
import { useSales } from "../context/SalesContext";

export const Activities = () => {
  const { activities, addActivity, companies } = useSales();
  const [activeTab, setActiveTab] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({
    company: companies[0]?.name || "ABC Pvt Ltd",
    type: "Discussion",
    date: new Date().toISOString().split("T")[0],
    time: "10:00 AM",
    title: "",
    status: "Scheduled",
    notes: ""
  });

  const activityTypes = ["All", "Discussion", "Follow-up", "Proposal", "Meeting", "Email"];

  // Filtering
  const filteredActivities = activities.filter((act) => {
    const matchesTab =
      activeTab === "All" ||
      act.type.toLowerCase().replace("-", "") === activeTab.toLowerCase().replace("-", "");
    const matchesStatus =
      statusFilter === "All" || act.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch =
      (act.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (act.company || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesStatus && matchesSearch;
  });

  const columns = [
    {
      accessorKey: "time",
      header: "Time / Date",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-800 text-xs">{row.original.time || "10:00 AM"}</span>
          <span className="text-[11px] text-slate-400 font-medium">{row.original.date || "Today"}</span>
        </div>
      )
    },
    {
      accessorKey: "title",
      header: "Activity",
      cell: (info) => (
        <span className="font-bold text-slate-800">{info.getValue() || info.row.original.title}</span>
      )
    },
    {
      accessorKey: "company",
      header: "Company",
      cell: (info) => <span className="text-slate-600 font-semibold">{info.getValue()}</span>
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: (info) => <Badge type={info.getValue()} />
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => <Badge status={info.getValue()} />
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: (info) => (
        <span className="text-slate-500 text-xs max-w-xs truncate block">{info.getValue() || "-"}</span>
      )
    }
  ];

  const handleCreateActivity = (e) => {
    e.preventDefault();
    const finalTitle = newActivity.title || `${newActivity.type} with ${newActivity.company}`;
    addActivity({
      ...newActivity,
      title: finalTitle
    });
    setIsModalOpen(false);
    setNewActivity({
      company: companies[0]?.name || "ABC Pvt Ltd",
      type: "Discussion",
      date: new Date().toISOString().split("T")[0],
      time: "10:00 AM",
      title: "",
      status: "Scheduled",
      notes: ""
    });
  };

  return (
    <div className="w-full space-y-3">
      {/* Top Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "My Activities" }
        ]}
        backPath="/dashboard"
        className="mb-0"
      />

      {/* Top Filter Tabs Bar matching Image #7 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Pill Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {activityTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === type
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Add Activity Button */}
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto shrink-0"
          >
            Add Activity
          </Button>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer w-full"
            >
              <option value="All">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* TanStack Table Container */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <DataTable
          data={filteredActivities}
          columns={columns}
          globalFilter={searchQuery}
          setGlobalFilter={setSearchQuery}
          pageSize={10}
        />
      </div>

      {/* Add Activity Modal Form */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Sales Activity">
        <form onSubmit={handleCreateActivity} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Company *
            </label>
            <select
              value={newActivity.company}
              onChange={(e) => setNewActivity({ ...newActivity, company: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              {companies.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Activity Type *
            </label>
            <select
              value={newActivity.type}
              onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="Discussion">Discussion</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Proposal">Proposal</option>
              <option value="Meeting">Meeting</option>
              <option value="Email">Email</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Date *
              </label>
              <input
                type="date"
                value={newActivity.date}
                onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Time *
              </label>
              <input
                type="text"
                value={newActivity.time}
                onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                placeholder="e.g. 02:30 PM"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Activity Title / Summary
            </label>
            <input
              type="text"
              value={newActivity.title}
              onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
              placeholder="e.g. Proposal review call"
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Status
            </label>
            <select
              value={newActivity.status}
              onChange={(e) => setNewActivity({ ...newActivity, status: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Notes / Key Takeaways
            </label>
            <textarea
              rows={3}
              value={newActivity.notes}
              onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
              placeholder="Add notes..."
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Activity
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
