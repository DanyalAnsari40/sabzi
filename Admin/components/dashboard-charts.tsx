"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Card } from "@/components/ui/card";

const monthlyRevenue = [
  { month: "Jan", value: 4000 },
  { month: "Feb", value: 3000 },
  { month: "Mar", value: 2000 },
  { month: "Apr", value: 2780 },
  { month: "May", value: 1890 },
  { month: "Jun", value: 2390 },
];

const productSales = [
  { name: "Apples", sales: 400 },
  { name: "Milk", sales: 300 },
  { name: "Rice", sales: 200 },
  { name: "Tomatoes", sales: 278 },
  { name: "Chicken", sales: 189 },
];

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Monthly Revenue
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#16a34a"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Top Product Sales
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productSales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            />
            <Bar dataKey="sales" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
