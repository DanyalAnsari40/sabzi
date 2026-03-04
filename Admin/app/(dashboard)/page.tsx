import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardChartsClient } from "@/components/dashboard-charts-client";
import {
  Package,
  Folder,
  ShoppingCart,
  TrendingUp,
  ArrowRight,
  Eye,
  DollarSign,
} from "lucide-react";
import {
  categories,
  products,
  requestsForQuote,
  quotes,
  inquiries,
} from "@/lib/mock-data";

export const metadata = {
  title: "Admin Dashboard - WholeGrains",
  description: "Manage products, orders, and business operations",
};

export default function AdminDashboard() {
  const pendingRFQs = requestsForQuote.filter((r) => r.status === "pending");
  const pendingQuotes = quotes.filter((q) => q.status === "pending");
  const newInquiries = inquiries.filter((i) => i.status === "new");

  const statCards = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      href: "/products",
      trend: "+5 this month",
      trendUp: true,
      bgGradient: "from-blue-50 to-blue-100/50",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Categories",
      value: categories.length,
      icon: Folder,
      href: "/categories",
      trend: "Stable",
      trendUp: false,
      bgGradient: "from-green-50 to-green-100/50",
      iconColor: "text-green-600",
    },
    {
      title: "Pending RFQs",
      value: pendingRFQs.length,
      icon: ShoppingCart,
      href: "/requests",
      trend: "+2 this week",
      trendUp: true,
      bgGradient: "from-orange-50 to-orange-100/50",
      iconColor: "text-orange-600",
    },
    {
      title: "Revenue (Month)",
      value: "$12,450",
      icon: DollarSign,
      href: "/requests",
      trend: "+12% vs last month",
      trendUp: true,
      bgGradient: "from-purple-50 to-purple-100/50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 bg-gradient-to-b from-background via-background to-muted/20 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-lg text-foreground/60">
            Welcome back! Here's your business overview at a glance.
          </p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/requests">View All Requests</Link>
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <Link key={i} href={stat.href}>
            <Card className={`p-6 hover:shadow-xl transition-all hover:scale-105 cursor-pointer border-0 bg-gradient-to-br ${stat.bgGradient}`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-white/80 shadow-sm`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <TrendingUp className={`w-5 h-5 ${stat.trendUp ? "text-green-600" : "text-foreground/40"}`} />
              </div>
              <p className="text-sm text-foreground/70 font-medium mb-2">{stat.title}</p>
              <p className="text-3xl font-bold text-foreground mb-3">{stat.value}</p>
              <p className={`text-xs font-semibold ${stat.trendUp ? "text-green-600" : "text-foreground/60"}`}>
                {stat.trend}
              </p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Charts (loaded client-side to avoid recharts + React 19 SSR issue) */}
      <DashboardChartsClient />

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending RFQs */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              Pending RFQ Requests
            </h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/requests">View All</Link>
            </Button>
          </div>

          {pendingRFQs.length === 0 ? (
            <p className="text-foreground/60 text-center py-8">
              No pending requests
            </p>
          ) : (
            <div className="space-y-3">
              {pendingRFQs.slice(0, 3).map((rfq) => (
                <div key={rfq.id} className="p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground">
                        {rfq.companyName}
                      </p>
                      <p className="text-sm text-foreground/60">
                        {rfq.items.length} items
                      </p>
                    </div>
                    <Badge>Pending</Badge>
                  </div>
                  <p className="text-xs text-foreground/50">
                    {new Date(rfq.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Recent Inquiries */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              New Inquiries
            </h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/inquiries">View All</Link>
            </Button>
          </div>

          {newInquiries.length === 0 ? (
            <p className="text-foreground/60 text-center py-8">
              No new inquiries
            </p>
          ) : (
            <div className="space-y-3">
              {newInquiries.slice(0, 3).map((inquiry) => (
                <div key={inquiry.id} className="p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground">
                        {inquiry.name}
                      </p>
                      <p className="text-sm text-foreground/60 line-clamp-1">
                        {inquiry.subject}
                      </p>
                    </div>
                    <Badge variant="outline">New</Badge>
                  </div>
                  <p className="text-xs text-foreground/50">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button asChild variant="outline">
            <Link href="/products">
              <Package className="w-4 h-4 mr-2" />
              Add New Product
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/requests">
              <Eye className="w-4 h-4 mr-2" />
              Review RFQs
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/inquiries">
              <ArrowRight className="w-4 h-4 mr-2" />
              Respond to Inquiries
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
