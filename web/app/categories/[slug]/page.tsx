import Link from "next/link";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { ProductCard } from "@/components/public/product-card";
import { Breadcrumb } from "@/components/public/breadcrumb";
import { EmptyState } from "@/components/public/empty-state";
import { Button } from "@/components/ui/button";
import { categories, getProductsByCategory } from "@/lib/mock-data";
import { Package } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} – WholeGrains`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

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
            <Breadcrumb
              items={[
                { label: "Categories", href: "/categories" },
                { label: category.name },
              ]}
            />
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
              <EmptyState
                icon={<Package />}
                title="No products in this category"
                description="No products available in this category yet."
                actionLabel="Browse Other Categories"
                actionHref="/categories"
              />
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
