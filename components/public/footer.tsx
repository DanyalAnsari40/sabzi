import Link from "next/link";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-muted/30 to-primary/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-foreground">WholeGrains</span>
            </div>
            <p className="text-sm text-foreground/70 mb-6 leading-relaxed">
              Premium wholesale grocery solutions for businesses worldwide.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-foreground/60">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/60">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@wholegrains.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/60">
                <MapPin className="w-4 h-4 text-primary" />
                <span>123 Market St, City</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-foreground mb-5">Products</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/categories" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  Vegetables
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  Fruits & Dairy
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  Proteins
                </Link>
              </li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h3 className="font-bold text-foreground mb-5">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/request-quote" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  Request Quote
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  Partner Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-foreground mb-5">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  Cookie Settings
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-foreground/60">
              © 2024 WholeGrains Co. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors text-sm font-medium">
                Follow us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
