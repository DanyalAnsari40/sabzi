"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Home, Bell, User, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

export function AdminHeader() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/categories", label: "Categories" },
    { href: "/admin/requests", label: "RFQ Requests" },
    { href: "/admin/inquiries", label: "Inquiries" },
    { href: "/admin/settings", label: "Settings" },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden border-b border-border bg-background flex items-center justify-between px-4 h-16 sticky top-0 z-40">
        <Link href="/admin" className="font-bold text-lg text-foreground flex items-center gap-2">
          <Home className="w-5 h-5 text-primary" />
          WholeGrains
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 p-0">
              <nav className="flex flex-col gap-1 mt-8 px-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      pathname === link.href || pathname.startsWith(link.href)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex items-center justify-between px-8 h-16 border-b border-border bg-gradient-to-r from-background to-background sticky top-0 z-40">
        <div className="flex items-center gap-6 flex-1">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
            <input
              type="text"
              placeholder="Search products, orders..."
              className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="text-right text-sm">
              <p className="font-semibold text-foreground">Admin User</p>
              <p className="text-xs text-foreground/60">Administrator</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
