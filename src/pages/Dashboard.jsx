import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";
import { SalesOverviewBanner } from "../components/dashboard/SalesOverviewBanner";
import { TimeframeActivityCards } from "../components/dashboard/TimeframeActivityCards";
import { RevenuePerformanceCards } from "../components/dashboard/RevenuePerformanceCards";
import { CallHistorySummaryCard } from "../components/dashboard/CallHistorySummaryCard";
import { DailyActivitiesSummaryCard } from "../components/dashboard/DailyActivitiesSummaryCard";
import { RecentEmployersSummaryCard } from "../components/dashboard/RecentEmployersSummaryCard";
import { OnboardingChart } from "../components/dashboard/OnboardingChart";
import { OnboardingStatus } from "../components/dashboard/OnboardingStatus";
import { PerformanceCard } from "../components/dashboard/PerformanceCard";
import { FollowUpReminders } from "../components/dashboard/FollowUpReminders";
import { useSales } from "../context/SalesContext";

export const Dashboard = () => {
  const navigate = useNavigate();
  const {
    companies,
    callLogs,
    revenueStats
  } = useSales();

  const [activeDateFilter, setActiveDateFilter] = useState("today");

  const todayStr = new Date().toISOString().split("T")[0];
  const todayCallsCount = (callLogs || []).filter(c => (c.date || todayStr) === todayStr).length;

  const pendingCompaniesCount = companies.filter(c => c.status === "Pending" || c.status === "In Progress").length;

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumb Navigation Card */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Home className="w-3.5 h-3.5 text-blue-600" />
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          Dashboard
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-600">Sales Operations & Employer Onboarding</span>
      </div>

      {/* 1. Executive Control Banner Card */}
      <SalesOverviewBanner />

      {/* 2. Timeframe Outreach Activity Filter Cards */}
      <TimeframeActivityCards
        todayCalls={todayCallsCount || 3}
        yesterdayCalls={2}
        weekCalls={7}
        monthOnboarded={companies.length || 10}
        activeFilter={activeDateFilter}
        onFilterChange={(id) => setActiveDateFilter(id)}
      />

      {/* 3. Subscription Revenue & Target Tracking Cards */}
      <RevenuePerformanceCards
        todayRevenue="₹12,490"
        monthlyRevenue={`₹${(revenueStats?.totalRevenue || 125203).toLocaleString("en-IN")}`}
        projectedAnnual="₹15.2 Lakhs"
        targetAmount="₹2.00 Lakhs"
        achievedAmount={`₹${(revenueStats?.totalRevenue || 125203).toLocaleString("en-IN")}`}
        achievedPercent={62.6}
        remainingAmount="₹74,797"
        conversionRate="68.2%"
        industryBenchmark="45%"
        wonDealsCount={25}
        wonDealsValue={`₹${(revenueStats?.totalRevenue || 125203).toLocaleString("en-IN")}`}
        activeLeadsCount={pendingCompaniesCount || 7}
        totalLeadsCount={companies.length * 4 || 32}
        outreachSuccessRate="78%"
      />

      {/* 4. Operational Action Cards: Call History, Daily Activities & Recent Employers */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">
              Operational Hub & Workflows
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Click any card to open and manage full module details
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-lg">
            3 Active Modules
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <CallHistorySummaryCard />
          <DailyActivitiesSummaryCard />
          <RecentEmployersSummaryCard />
        </div>
      </div>

      {/* 5. Visual Onboarding Pipeline & Stage Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <OnboardingChart />
        </div>
        <div className="lg:col-span-4">
          <OnboardingStatus />
        </div>
      </div>

      {/* 6. Performance & Priority Follow-ups */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <PerformanceCard />
        </div>
        <div className="lg:col-span-6">
          <FollowUpReminders />
        </div>
      </div>
    </div>
  );
};
