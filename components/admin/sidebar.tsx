"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, LayoutDashboard, Package, Folder, ShoppingCart, Mail, Settings, LogOut, ChevronRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/categories", icon: Folder, label: "Categories" },
    { href: "/admin/requests", icon: ShoppingCart, label: "RFQ Requests" },
    { href: "/admin/inquiries", icon: Mail, label: "Inquiries" },
    { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-72 border-r border-border bg-sidebar h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border flex items-center gap-3 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="p-2 bg-primary/20 rounded-lg">
          <Leaf className="w-5 h-5 text-primary" />
        </div>
        <div>
          <span className="font-bold text-lg text-foreground block">WholeGrains</span>
          <span className="text-xs text-foreground/60">Admin Panel</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider px-3 mb-4">Main Menu</p>
        {links.map((link) => {
          const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start gap-3 transition-all ${
                  isActive ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-sidebar-accent/30"
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span className="flex-1 text-left font-medium">{link.label}</span>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-sidebar-border space-y-3 bg-gradient-to-t from-sidebar-accent/10">
        <div className="px-3 py-2">
          <p className="text-sm font-semibold text-foreground">Admin User</p>
          <p className="text-xs text-foreground/60">admin@wholegrains.com</p>
        </div>
        <Button variant="outline" className="w-full justify-start gap-3 text-destructive hover:text-destructive">
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
