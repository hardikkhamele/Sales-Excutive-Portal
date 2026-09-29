import React from "react";
import { Breadcrumb } from "../components/common/Breadcrumb";
import { CallHistoryTracker } from "../components/dashboard/CallHistoryTracker";

export const CallHistory = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumbs & Back Navigation */}
      <Breadcrumb
        items={[
          { label: "Sales Call History" }
        ]}
        backPath="/dashboard"
      />

      {/* Main Call History Tracker View */}
      <CallHistoryTracker />
    </div>
  );
};
