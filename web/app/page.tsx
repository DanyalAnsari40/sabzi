import Link from "next/link";
import { Navbar } from "@/components/public/navbar";
import { HeroImage } from "@/components/public/hero-image";
import { Footer } from "@/components/public/footer";
import { CategoryCard } from "@/components/public/category-card";
import { ProductCard } from "@/components/public/product-card";
import { LeafBranchLeft, LeafBranchRight } from "@/components/public/hero-decorations";
import { Button } from "@/components/ui/button";
import { categories, products } from "@/lib/mock-data";
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle, Leaf, Package, TrendingUp } from "lucide-react";

export const metadata = {
  title: "Sabzi - Sell With Us | List Your Products & Connect With Buyers",
  description: "Sellers: list your halal meat, vegetables, fruits & more. Enter your product details, we share with our admin and connect you with buyers.",
};

export default function HomePage() {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section – template style */}
        <section className="relative overflow-hidden bg-[#7cb342]">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 md:py-6">
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[420px] md:min-h-[480px]">
                {/* Left: text + CTA */}
                <div className="relative order-2 lg:order-1 px-6 md:px-10 py-8 lg:py-12">
                  {/* Decorative branch – left */}
                  <div className="absolute left-0 top-1/4 w-24 h-20 text-primary/40 -translate-y-1/2 pointer-events-none">
                    <LeafBranchLeft className="w-full h-full" />
                  </div>
                  {/* Dotted pattern */}
                  <div
                    className="absolute right-8 top-8 w-16 h-16 opacity-30 pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(circle, currentColor 1.5px, transparent 1.5px)",
                      backgroundSize: "8px 8px",
                    }}
                    aria-hidden
                  />
                  {/* Small green circle */}
                  <div className="absolute right-12 top-16 w-4 h-4 rounded-full bg-primary/20 pointer-events-none" aria-hidden />

                  <p className="text-2xl md:text-3xl text-primary mb-2 animate-fade-in-up" style={{ fontFamily: "var(--font-dancing-script), cursive" }}>
                    Welcome, Sellers
                  </p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
                    <span className="text-foreground">LIST YOUR PRODUCTS</span>
                    <br />
                    <span className="text-primary">WE CONNECT YOU</span>
                  </h1>
                  <p className="text-muted-foreground text-base md:text-lg mb-6 max-w-lg animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                    Select the products you want to sell, enter your item details, and submit. Our admin panel receives your data and we will get in touch to connect you with buyers.
                  </p>
                  <div className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg" asChild>
                      <Link href="/categories">Browse & list products</Link>
                    </Button>
                  </div>

                  {/* Slider arrows – decorative */}
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1 text-muted-foreground/60">
                    <button type="button" className="p-1 rounded hover:bg-muted/50" aria-label="Previous">
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button type="button" className="p-1 rounded hover:bg-muted/50" aria-label="Next">
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Right: hero image */}
                <div className="relative order-1 lg:order-2 h-72 md:h-96 lg:h-full min-h-[320px] lg:min-h-[420px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
                  <div className="absolute bottom-4 left-4 w-28 h-20 text-primary/30 pointer-events-none">
                    <LeafBranchRight className="w-full h-full" />
                  </div>
                  <div className="absolute top-8 right-8 w-8 h-8 rounded-full bg-primary/15 pointer-events-none" aria-hidden />
                  <HeroImage />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature blocks – Always Fresh, 100% Organic */}
        <section className="grid grid-cols-1 md:grid-cols-2">
          <Link
            href="/categories"
            className="group flex flex-col md:flex-row items-center gap-4 md:gap-6 px-6 md:px-8 py-8 md:py-10 bg-[#e8e0d5] text-foreground hover:bg-[#dfd6ca] transition-colors"
          >
            <div className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-foreground/20 flex items-center justify-center">
              <Package className="w-7 h-7 text-foreground/80" strokeWidth={1.5} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-bold text-lg mb-2">Select products to sell</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Browse categories, pick the items you supply, and add your details. Our team receives your listing and will reach out.
              </p>
              <span className="text-sm font-semibold text-foreground/80 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                FIND OUT MORE <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
          <Link
            href="/request-quote"
            className="group flex flex-col md:flex-row items-center gap-4 md:gap-6 px-6 md:px-8 py-8 md:py-10 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <div className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-white/40 flex items-center justify-center">
              <Leaf className="w-7 h-7" strokeWidth={1.5} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-bold text-lg mb-2">Enter item details</h3>
              <p className="text-primary-foreground/90 text-sm mb-3">
                Add quantity, notes, and requirements. Your submission goes to our admin panel so we can connect you with buyers.
              </p>
              <span className="text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                FIND OUT MORE <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </section>

        {/* Categories Section */}
        <section className="py-16 md:py-20 relative overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-secondary/8 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12 animate-fade-in-down">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Categories to list under
              </h2>
              <p className="text-lg text-foreground/60 font-medium">
                Choose a category, then add the products you want to sell
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category, idx) => (
                <div
                  key={category.id}
                  className="animate-fade-in-up"
                  style={{animationDelay: `${idx * 0.1}s`}}
                >
                  <CategoryCard category={category} />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <Button variant="outline" size="lg" className="hover-lift font-semibold gap-2" asChild>
                <Link href="/categories">
                  View All Categories
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-primary/5 to-secondary/5 relative overflow-hidden">
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12 animate-fade-in-down">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Products you can list
              </h2>
              <p className="text-lg text-foreground/60 font-medium">
                Select products, enter your details, and we will get back to you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{animationDelay: `${idx * 0.1}s`}}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg hover:scale-105 transition-all duration-300 hover-lift font-semibold gap-2" asChild>
                <Link href="/categories">
                  Browse All Products
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-primary-foreground relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-black/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}} />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <div className="animate-fade-in-down">
              <TrendingUp className="w-16 h-16 mx-auto mb-8 opacity-90 animate-float" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Ready to sell with us?
              </h2>
              <p className="text-lg md:text-xl mb-10 opacity-95 max-w-2xl mx-auto leading-relaxed font-medium">
                List your products and enter your item details. Our admin gets your data and we will connect you with buyers.
              </p>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold gap-2 px-8 py-6 text-lg hover-lift"
                asChild
              >
                <Link href="/request-quote">
                  Submit your listing
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
