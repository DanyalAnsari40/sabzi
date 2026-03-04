"use client";

import dynamic from "next/dynamic";

const DashboardCharts = dynamic(
  () => import("@/components/dashboard-charts").then((m) => m.DashboardCharts),
  { ssr: false }
);

export function DashboardChartsClient() {
  return <DashboardCharts />;
}
