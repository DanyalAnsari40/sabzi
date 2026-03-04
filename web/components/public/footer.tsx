import Link from "next/link";
import { Leaf, Mail, Phone, MapPin, Twitter, Linkedin, Youtube } from "lucide-react";
import { categories } from "@/lib/mock-data";

export function Footer() {
  const year = new Date().getFullYear();
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
              <span className="font-bold text-lg text-foreground">Sabzi</span>
            </div>
            <p className="text-sm text-foreground/70 mb-6 leading-relaxed">
              Halal meat, fresh vegetables, fruits & more. Premium B2B wholesale for businesses worldwide.
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

          {/* Products - real category links */}
          <div>
            <h3 className="font-bold text-foreground mb-5">Products</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/categories" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  All Categories
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/categories/${cat.slug}`} className="text-foreground/70 hover:text-primary transition-colors font-medium">
                    {cat.name}
                  </Link>
                </li>
              ))}
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
                <Link href={process.env.NEXT_PUBLIC_ADMIN_URL || "#"} className="text-foreground/70 hover:text-primary transition-colors font-medium" target={process.env.NEXT_PUBLIC_ADMIN_URL ? "_blank" : undefined} rel={process.env.NEXT_PUBLIC_ADMIN_URL ? "noopener noreferrer" : undefined}>
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
              © {year} Sabzi. Halal meat, vegetables & fruits – B2B wholesale.
            </p>
            <div className="flex items-center gap-4" aria-label="Social links">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
