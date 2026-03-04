"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Leaf, ArrowRight, Search, User, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Products" },
    { href: "/search", label: "Search" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-lg"
          : "border-b border-transparent bg-gradient-to-b from-background via-background to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 md:h-20">
          {/* Logo with Animation */}
          <Link
            href="/"
            className="flex items-center gap-3 group animate-fade-in-left"
          >
            <div className="p-2.5 bg-gradient-to-br from-primary via-primary to-primary/80 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Sabzi
              </span>
              <span className="text-xs font-medium text-primary/70">Halal Meat, Vegetables & Fruits</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  animation: `fadeInDown 0.6s ease-out ${idx * 0.1}s backwards`,
                }}
              >
                <Button
                  variant="ghost"
                  className="relative text-base font-semibold text-foreground hover:text-primary hover:bg-primary/15 rounded-lg transition-all duration-200 px-4 py-2 group"
                >
                  {link.label}
                  <span className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-200 rounded-full" />
                </Button>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2 animate-fade-in-right">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-foreground hover:text-primary hover:bg-primary/15 transition-colors duration-200"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            )}
            <Button variant="ghost" size="sm" className="gap-2 font-semibold text-foreground hover:text-primary hover:bg-primary/15 transition-colors duration-200" asChild>
              <Link href="/buyer-portal">
                <User className="w-4 h-4" />
                Buyer Portal
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-primary/50 bg-transparent font-semibold text-foreground hover:bg-primary/15 hover:border-primary hover:text-primary transition-all duration-200"
              size="sm"
              asChild
            >
              <Link href={process.env.NEXT_PUBLIC_ADMIN_URL || "#"} target={process.env.NEXT_PUBLIC_ADMIN_URL ? "_blank" : undefined} rel={process.env.NEXT_PUBLIC_ADMIN_URL ? "noopener noreferrer" : undefined}>Admin Portal</Link>
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:brightness-110 font-semibold gap-2 shadow-md hover:shadow-lg transition-all duration-200"
              size="sm"
              asChild
            >
              <Link href="/request-quote">
                Request Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden hover:bg-primary/10">
                {isOpen ? (
                  <X className="w-6 h-6 text-primary" />
                ) : (
                  <Menu className="w-6 h-6 text-primary" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 bg-gradient-to-b from-background to-background/95 border-l border-border/50"
            >
              <div className="flex flex-col gap-6 mt-12">
                {/* Mobile Links */}
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="py-2 px-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/15 transition-colors text-lg font-semibold"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Divider */}
                <div className="border-t border-border/30" />

                {/* Mobile Actions */}
                <div className="space-y-3 pt-2">
                  {mounted && (
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                      {theme === "dark" ? "Light mode" : "Dark mode"}
                    </Button>
                  )}
                  <Button variant="ghost" className="w-full justify-start gap-2 font-semibold" asChild>
                    <Link href="/buyer-portal" onClick={() => setIsOpen(false)}>
                      <User className="w-5 h-5" />
                      Buyer Portal
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-primary/30 hover:bg-primary/5 font-semibold"
                    asChild
                  >
                    <Link href={process.env.NEXT_PUBLIC_ADMIN_URL || "#"} target={process.env.NEXT_PUBLIC_ADMIN_URL ? "_blank" : undefined} rel={process.env.NEXT_PUBLIC_ADMIN_URL ? "noopener noreferrer" : undefined} onClick={() => setIsOpen(false)}>Admin Portal</Link>
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg font-semibold"
                    asChild
                  >
                    <Link href="/request-quote" className="gap-2" onClick={() => setIsOpen(false)}>
                      Request Quote
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
