import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { CategoryCard } from "@/components/public/category-card";
import { ProductCard } from "@/components/public/product-card";
import { categories, products } from "@/lib/mock-data";

export const metadata = {
  title: "All Products - WholeGrains",
  description: "Browse all our wholesale grocery products by category",
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-12 md:py-16 bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              All Products
            </h1>
            <p className="text-lg text-foreground/60">
              Browse our complete selection of wholesale groceries
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Product Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>

            {/* All Products */}
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              All Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
