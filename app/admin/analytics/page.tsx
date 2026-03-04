'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Download, TrendingUp, Calendar } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', revenue: 45000, orders: 65, customers: 12 },
  { month: 'Feb', revenue: 52000, orders: 78, customers: 15 },
  { month: 'Mar', revenue: 48000, orders: 72, customers: 14 },
  { month: 'Apr', revenue: 61000, orders: 89, customers: 18 },
  { month: 'May', revenue: 55000, orders: 81, customers: 16 },
  { month: 'Jun', revenue: 67000, orders: 95, customers: 21 },
];

const categoryPerformance = [
  { name: 'Vegetables', value: 35, revenue: 145000 },
  { name: 'Fruits', value: 25, revenue: 105000 },
  { name: 'Dairy', value: 20, revenue: 85000 },
  { name: 'Proteins', value: 15, revenue: 65000 },
  { name: 'Grains', value: 5, revenue: 20000 },
];

const COLORS = ['#4cbd64', '#f59e0b', '#06b6d4', '#8b5cf6', '#ec4899'];

const customerMetrics = [
  { label: 'Total Customers', value: '128', trend: '+12%', color: 'bg-blue-100 text-blue-700' },
  { label: 'Active Orders', value: '34', trend: '+8%', color: 'bg-green-100 text-green-700' },
  { label: 'Avg Order Value', value: '₹8,450', trend: '+5%', color: 'bg-purple-100 text-purple-700' },
  { label: 'Repeat Customers', value: '67%', trend: '+3%', color: 'bg-orange-100 text-orange-700' },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Analytics & Insights</h1>
          <p className="text-foreground/60">Comprehensive business performance metrics</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {customerMetrics.map((metric, idx) => (
          <Card key={idx} className="p-6 border-0 bg-gradient-to-br from-white to-muted/30">
            <p className="text-sm text-foreground/70 font-medium mb-2">{metric.label}</p>
            <div className="flex items-end justify-between mb-4">
              <p className="text-3xl font-bold text-foreground">{metric.value}</p>
              <Badge className={`${metric.color} text-xs font-semibold border-0`}>
                {metric.trend}
              </Badge>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/50"
                style={{ width: `${60 + idx * 10}%` }}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue & Orders Trend */}
        <Card className="lg:col-span-2 p-6 border-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">Revenue & Orders Trend</h2>
              <p className="text-sm text-foreground/60">Last 6 months performance</p>
            </div>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4cbd64"
                strokeWidth={3}
                dot={{ fill: '#4cbd64', r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{ fill: '#06b6d4', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6 border-0">
          <h2 className="text-xl font-bold text-foreground mb-6">Category Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryPerformance}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Performing Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-0">
          <h2 className="text-xl font-bold text-foreground mb-6">Top Products by Revenue</h2>
          <div className="space-y-4">
            {[
              { name: 'Organic Apples', revenue: 125000, units: 3200 },
              { name: 'Fresh Milk', revenue: 98000, units: 5400 },
              { name: 'Chicken Breast', revenue: 87000, units: 1800 },
              { name: 'Brown Rice', revenue: 72000, units: 2400 },
              { name: 'Broccoli', revenue: 65000, units: 2100 },
            ].map((product, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{product.name}</p>
                  <p className="text-xs text-foreground/60">{product.units.toLocaleString()} units sold</p>
                </div>
                <p className="font-bold text-primary">₹{product.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-0">
          <h2 className="text-xl font-bold text-foreground mb-6">Top Customers</h2>
          <div className="space-y-4">
            {[
              { name: 'Premium Hotels Ltd', orders: 24, value: 450000 },
              { name: 'Urban Supermarkets', orders: 18, value: 320000 },
              { name: 'Organic Eatery', orders: 15, value: 280000 },
              { name: 'Restaurant Group', orders: 12, value: 220000 },
              { name: 'Catering Services', orders: 10, value: 185000 },
            ].map((customer, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{customer.name}</p>
                  <p className="text-xs text-foreground/60">{customer.orders} orders</p>
                </div>
                <p className="font-bold text-primary">₹{customer.value.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
