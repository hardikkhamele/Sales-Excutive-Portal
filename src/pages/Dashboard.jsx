import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Building2,
  PhoneCall,
  UserCheck,
  Clock,
  Eye,
  Edit,
  Trash2,
  ArrowRight
} from "lucide-react";
import { StatCard } from "../components/common/StatCard";
import { OnboardingChart } from "../components/dashboard/OnboardingChart";
import { OnboardingStatus } from "../components/dashboard/OnboardingStatus";
import { PerformanceCard } from "../components/dashboard/PerformanceCard";
import { DailyActivitiesTimeline } from "../components/dashboard/DailyActivitiesTimeline";
import { FollowUpReminders } from "../components/dashboard/FollowUpReminders";
import { CallHistoryTracker } from "../components/dashboard/CallHistoryTracker";
import { DataTable } from "../components/common/DataTable";
import { Badge } from "../components/common/Badge";
import { ConfirmDialog } from "../components/common/ConfirmDialog";
import { useSales } from "../context/SalesContext";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { companies, deleteCompany, userProfile, callLogs } = useSales();
  const [deleteId, setDeleteId] = useState(null);

  const todayStr = new Date().toISOString().split("T")[0];
  const todayCallsCount = (callLogs || []).filter(c => (c.date || todayStr) === todayStr).length;

  const recentCompanies = companies.slice(0, 5);

  const columns = [
    {
      accessorKey: "name",
      header: "Company Name",
      cell: (info) => (
        <span className="font-bold text-slate-800">{info.getValue()}</span>
      )
    },
    {
      accessorKey: "contactPerson",
      header: "Contact Person",
      cell: (info) => <span className="text-slate-600">{info.getValue()}</span>
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => <Badge status={info.getValue()} />
    },
    {
      accessorKey: "onboardedOn",
      header: "Onboarded On",
      cell: (info) => <span className="text-slate-500 font-medium">{info.getValue()}</span>
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/companies/${row.original.id}`)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate(`/companies/${row.original.id}/edit`)}
            className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Edit Company"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteId(row.original.id)}
            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete Company"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner matching Specification 7 */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {userProfile.fullName} 👋
          </h2>
          <p className="text-sm text-blue-200 mt-2 font-medium">
            Here's what's happening with your sales activities today.
          </p>
        </div>
      </div>

      {/* 4 KPI Cards matching Specification 7 & Image 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Companies"
          value={companies.length.toString()}
          change="+12%"
          changeType="positive"
          period="vs last month"
          icon={Building2}
          iconBg="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Today's Calls"
          value={todayCallsCount.toString()}
          change="+25%"
          changeType="positive"
          period="calls logged today"
          icon={PhoneCall}
          iconBg="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          title="Companies Onboarding"
          value="86"
          change="+15%"
          changeType="positive"
          period="vs last month"
          icon={UserCheck}
          iconBg="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Pending Follow-ups"
          value="42"
          change="-5%"
          changeType="negative"
          period="vs yesterday"
          icon={Clock}
          iconBg="bg-amber-50 text-amber-600"
        />
      </div>

      {/* SALES CALL HISTORY TRACKER (Today's Calls, This Week, This Month, All) */}
      <CallHistoryTracker />

      {/* Visual Analytics Row: Area Chart + Donut Chart + Performance Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <OnboardingChart />
        </div>
        <div className="lg:col-span-4">
          <OnboardingStatus />
        </div>
      </div>

      {/* Performance & Timeline Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <PerformanceCard />
        </div>
        <div className="lg:col-span-8">
          <DailyActivitiesTimeline />
        </div>
      </div>

      {/* Bottom Grid: Recent Companies Table & Follow-up Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800">Recent Companies</h3>
              <p className="text-xs text-slate-400 font-medium">Latest onboarded organizations</p>
            </div>
            <Link
              to="/companies"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline"
            >
              View all companies <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <DataTable data={recentCompanies} columns={columns} pageSize={5} />
        </div>

        <div className="lg:col-span-4">
          <FollowUpReminders />
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          deleteCompany(deleteId);
          setDeleteId(null);
        }}
        title="Delete Company"
        message="Are you sure you want to delete this company? All associated activity logs will be removed."
      />
    </div>
  );
};
