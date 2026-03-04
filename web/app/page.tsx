import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { CategoryCard } from "@/components/public/category-card";
import { ProductCard } from "@/components/public/product-card";
import { Button } from "@/components/ui/button";
import { categories, products } from "@/lib/mock-data";
import { ArrowRight, CheckCircle, Leaf, TrendingUp, Zap, Shield } from "lucide-react";

export const metadata = {
  title: "Sabzi - Halal Meat, Vegetables & Fruits | B2B Wholesale",
  description: "Halal-certified meat, fresh vegetables & fruits. Wholesale for restaurants, hotels & food businesses.",
};

export default function HomePage() {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 md:py-32 bg-gradient-to-b from-background via-background/95 to-primary/5">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="animate-fade-in-left">
                <div className="flex items-center gap-2 mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/15 rounded-full backdrop-blur-sm border border-primary/30 animate-scale-in">
                    <Leaf className="w-4 h-4 text-primary animate-bounce-subtle" />
                    <span className="text-sm font-semibold text-primary">
                      Trusted by 100+ Businesses
                    </span>
                  </div>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                  Halal Meat, Fresh Vegetables & Fruits – Wholesale Made Simple
                </h1>

                <p className="text-xl text-foreground/70 mb-8 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                  Halal-certified meat, farm-fresh vegetables, fruits, dairy & grains at wholesale prices. Bulk quantities, competitive pricing, and reliable delivery for your business.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                  <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg hover:scale-105 transition-all duration-300 hover-lift font-semibold gap-2" asChild>
                    <Link href="/categories">
                      Browse Products
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="hover:bg-primary/5 hover:border-primary/60 font-semibold hover-lift" asChild>
                    <Link href="/request-quote">Request Quote</Link>
                  </Button>
                </div>

                {/* Benefits */}
                <div className="space-y-3 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                  {[
                    "Halal-certified meat & poultry",
                    "Fresh vegetables & fruits, organic options",
                    "Fast & reliable delivery",
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground/80 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative h-96 md:h-full animate-fade-in-right">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/10 rounded-2xl" />
                <Image
                  src="/images/hero-banner.jpg"
                  alt="Halal meat, fresh vegetables and fruits – wholesale produce"
                  fill
                  className="object-cover rounded-2xl shadow-2xl hover-lift"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary/8 via-background to-secondary/8 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { number: "500+", label: "Products Available", icon: "📦" },
                { number: "100+", label: "Business Partners", icon: "🤝" },
                { number: "99%", label: "On-Time Delivery", icon: "🚚" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center p-8 rounded-2xl bg-white/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 hover-lift animate-fade-in-up"
                  style={{animationDelay: `${i * 0.15}s`}}
                >
                  <p className="text-6xl mb-4 animate-float" style={{animationDelay: `${i * 0.2}s`}}>{stat.icon}</p>
                  <p className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-3">
                    {stat.number}
                  </p>
                  <p className="text-lg text-foreground/70 font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 md:py-20 relative overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-secondary/8 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12 animate-fade-in-down">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Shop by Category
              </h2>
              <p className="text-lg text-foreground/60 font-medium">
                Explore our wide range of premium products
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
                Featured Products
              </h2>
              <p className="text-lg text-foreground/60 font-medium">
                Our most popular wholesale offerings
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
                Ready to Scale Your Business?
              </h2>
              <p className="text-lg md:text-xl mb-10 opacity-95 max-w-2xl mx-auto leading-relaxed font-medium">
                Get personalized quotes and dedicated support from our wholesale experts.
              </p>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold gap-2 px-8 py-6 text-lg hover-lift"
                asChild
              >
                <Link href="/request-quote">
                  Request a Quote Today
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
