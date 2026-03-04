import Link from "next/link";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { ProductCard } from "@/components/public/product-card";
import { Button } from "@/components/ui/button";
import { categories, getProductsByCategory } from "@/lib/mock-data";
import { ArrowLeft, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Category not found
            </h1>
            <Button asChild>
              <Link href="/categories">Back to Categories</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const products = getProductsByCategory(category.id);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="py-4 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="gap-2"
              >
                <Link href="/categories">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Link>
              </Button>
              <span className="text-sm text-foreground/60">/</span>
              <span className="text-sm font-semibold">{category.name}</span>
            </div>
          </div>
        </section>

        {/* Header */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {category.name}
            </h1>
            <p className="text-lg text-foreground/70">
              {category.description}
            </p>
          </div>
        </section>

        {/* Products */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-foreground/60 mb-4">
                  No products available in this category yet
                </p>
                <Button asChild>
                  <Link href="/categories">
                    Browse Other Categories
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="text-foreground/60">
                    Showing {products.length} product{products.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
