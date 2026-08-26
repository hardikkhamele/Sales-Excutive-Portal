import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  ArrowLeftRight,
  AlertCircle,
  Search,
  Eye,
  ChevronDown,
  Filter,
  Download,
  IndianRupee,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { useSales } from "../context/SalesContext";
import { DataTable } from "../components/common/DataTable";
import { Badge } from "../components/common/Badge";

export const RevenueManagement = () => {
  const navigate = useNavigate();
  const { revenueStats, transactions } = useSales();
  const [filterQuery, setFilterQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");

  // Filter transactions based on search, status and plan
  const filteredData = (transactions || []).filter((item) => {
    const matchesStatus =
      statusFilter === "All" ||
      statusFilter === "Select Status" ||
      item.status?.toLowerCase() === statusFilter.toLowerCase();

    const matchesPlan =
      planFilter === "All" ||
      planFilter === "Select Plan" ||
      (item.plan || "").toLowerCase().includes(planFilter.toLowerCase());

    const query = filterQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      (item.clientName || "").toLowerCase().includes(query) ||
      (item.transactionId || "").toLowerCase().includes(query) ||
      (item.gatewayTransactionId || "").toLowerCase().includes(query) ||
      (item.plan || "").toLowerCase().includes(query) ||
      (item.planType || "").toLowerCase().includes(query) ||
      (item.mobileNumber || "").toLowerCase().includes(query);

    return matchesStatus && matchesPlan && matchesSearch;
  });

  const columns = [
    {
      id: "srNo",
      header: "Sr.No.",
      accessorKey: "srNo",
      cell: ({ row }) => (
        <span className="font-semibold text-slate-700 text-sm">{row.index + 1}</span>
      )
    },
    {
      accessorKey: "transactionId",
      header: "Transaction Id",
      cell: (info) => (
        <span className="font-medium text-slate-700 text-sm uppercase tracking-wide">
          {info.getValue()}
        </span>
      )
    },
    {
      accessorKey: "clientName",
      header: "Client Name",
      cell: (info) => (
        <span className="font-medium text-slate-800 text-sm">
          {info.getValue()}
        </span>
      )
    },
    {
      accessorKey: "plan",
      header: "Plan",
      cell: (info) => {
        const val = info.getValue() || "";
        const isElite = val.toLowerCase().includes("elite");
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              isElite
                ? "bg-purple-50 text-purple-700 border border-purple-200/70"
                : "bg-sky-50 text-sky-700 border border-sky-200/70"
            }`}
          >
            {val}
          </span>
        );
      }
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: (info) => (
        <span className="font-semibold text-slate-800 text-sm">
          ₹{info.getValue()?.toLocaleString("en-IN")}
        </span>
      )
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        const val = info.getValue();
        const isSuccess = val?.toLowerCase() === "successful" || val?.toLowerCase() === "paid";
        return (
          <span
            className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold ${
              isSuccess
                ? "bg-emerald-500 text-white shadow-xs"
                : "bg-rose-500 text-white shadow-xs"
            }`}
          >
            {val}
          </span>
        );
      }
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/revenue/${row.original.transactionId || row.original.id}`)}
            className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            title="View Payment Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Revenue Management</h1>
          <p className="text-xs text-slate-500 mt-1">Overview of transaction performance and payment history</p>
        </div>
      </div>

      {/* Top 3 Metric Cards matching Reference Screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Total Revenue (Purple / Violet) */}
        <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-fuchsia-600 via-purple-600 to-indigo-700 text-white shadow-lg shadow-purple-500/20">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wider text-purple-100 uppercase">
                Total Revenue
              </p>
              <h3 className="text-3xl lg:text-4xl font-extrabold mt-2 tracking-tight">
                ₹{revenueStats?.totalRevenue || 125203}
              </h3>
            </div>
            <div className="p-3 bg-white/15 backdrop-blur-md rounded-2xl text-white">
              <Wallet className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between pt-3 border-t border-white/15">
            <span className="text-xs text-purple-100 font-medium">Overall Summary</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 text-white backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              ~ Live
            </span>
          </div>
        </div>

        {/* Card 2: Successful Payments (Earth Bronze / Amber Slate) */}
        <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-amber-700 via-stone-700 to-stone-800 text-white shadow-lg shadow-stone-800/20">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wider text-amber-100 uppercase">
                Successful Payments
              </p>
              <h3 className="text-3xl lg:text-4xl font-extrabold mt-2 tracking-tight">
                {revenueStats?.successfulPayments || 25}
              </h3>
            </div>
            <div className="p-3 bg-white/15 backdrop-blur-md rounded-2xl text-white">
              <ArrowLeftRight className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between pt-3 border-t border-white/15">
            <span className="text-xs text-stone-200 font-medium">Total Paid</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 text-white backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              ~ Live
            </span>
          </div>
        </div>

        {/* Card 3: Failed Payments (Gold / Amber / Yellow) */}
        <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 text-white shadow-lg shadow-amber-500/20">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wider text-amber-950/80 uppercase">
                Failed Payments
              </p>
              <h3 className="text-3xl lg:text-4xl font-extrabold mt-2 tracking-tight text-white">
                {revenueStats?.failedPayments || 1}
              </h3>
            </div>
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between pt-3 border-t border-white/20">
            <span className="text-xs text-amber-100 font-medium">Total Declined</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-900/30 text-white backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
              ~ Alert
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="w-full sm:w-auto flex flex-wrap sm:flex-nowrap items-center gap-3">
          {/* Plan Dropdown */}
          <div className="relative w-full sm:w-44">
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer pr-9"
            >
              <option value="All">All Plans</option>
              <option value="Elite">Elite Plan</option>
              <option value="Pro">Pro Plan</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Status Dropdown */}
          <div className="relative w-full sm:w-44">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer pr-9"
            >
              <option value="All">All Statuses</option>
              <option value="Successful">Successful</option>
              <option value="Failed">Failed</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* TanStack Table Container */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <DataTable
          data={filteredData}
          columns={columns}
          globalFilter={filterQuery}
          setGlobalFilter={setFilterQuery}
          pageSize={10}
        />
      </div>
    </div>
  );
};
