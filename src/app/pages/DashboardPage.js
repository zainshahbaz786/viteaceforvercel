import React from "react";
import Dashboard from "../../_metronic/_partials/dashboards/Dashboard";
import SuperAdminDashboard from "../../_metronic/_partials/dashboards/SuperAdminDashboard";
import AdminDashboard from "../../_metronic/_partials/dashboards/AdminDashboard";
import { UserRole, GetCurrentUser } from "../Common/Common";

export function DashboardPage() {
  // if (GetCurrentUser().roles[0] == UserRole.Manager) {
  //   window.location.href = "/keywords"
  // }
  // else if (GetCurrentUser().roles[0] == UserRole.SuperAdmin) {
  //   return <SuperAdminDashboard />;
  // }
  // else if (GetCurrentUser().roles[0] == UserRole.Admin) {
  //   return <AdminDashboard />;
  // } else {
  //   return <Dashboard />;
  // }
  return <Dashboard />;
}
