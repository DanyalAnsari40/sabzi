"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { ProductCard } from "@/components/public/product-card";
import { Breadcrumb } from "@/components/public/breadcrumb";
import { EmptyState } from "@/components/public/empty-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { products, getProductById } from "@/lib/mock-data";
import { formatPrice } from "@/lib/format";
import { Leaf, Truck, Check, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";
  const product = getProductById(id);
  const [quantity, setQuantity] = useState<string>(
    product?.minOrderQuantity.toString() || "1"
  );

  useEffect(() => {
    if (product) setQuantity(product.minOrderQuantity.toString());
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-12 px-4">
          <EmptyState
            title="Product not found"
            description="The product you're looking for doesn't exist or has been removed."
            actionLabel="Back to Products"
            actionHref="/categories"
          />
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 3);

  const handleAddToRFQ = () => {
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty < product.minOrderQuantity) {
      alert(
        `Minimum order quantity is ${product.minOrderQuantity} ${product.unit}`
      );
      return;
    }
    router.push(
      `/request-quote?product=${product.id}&quantity=${qty}&unit=${product.unit}`
    );
  };

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
                { label: product.name },
              ]}
            />
          </div>
        </section>

        {/* Product Detail */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              {/* Image */}
              <div className="flex flex-col gap-4">
                <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Details */}
              <div>
                <div className="mb-6">
                  <Badge variant="outline" className="mb-4">
                    {product.category.name}
                  </Badge>
                  <h1 className="text-4xl font-bold text-foreground mb-2">
                    {product.name}
                  </h1>
                  <p className="text-lg text-foreground/60">
                    {product.description}
                  </p>
                </div>

                {/* Pricing */}
                <Card className="p-6 mb-6 bg-primary/5 border-primary/20">
                  <div className="mb-4">
                    <p className="text-sm text-foreground/60 mb-2">
                      Price per {product.unit}
                    </p>
                    <p className="text-5xl font-bold text-primary mb-4">
                      {formatPrice(product.price)}
                    </p>
                    <p className="text-sm text-foreground/60">
                      SKU: {product.sku}
                    </p>
                  </div>
                </Card>

                {/* Specs */}
                <div className="space-y-4 mb-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-foreground/60 mb-1">
                        Min Order
                      </p>
                      <p className="font-semibold text-foreground">
                        {product.minOrderQuantity} {product.unit}
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-foreground/60 mb-1">Stock</p>
                      <p className="font-semibold text-foreground">
                        {product.stock} {product.unit}
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-foreground/60 mb-1">
                        Shelf Life
                      </p>
                      <p className="font-semibold text-foreground">
                        {product.shelf_life_days} days
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-foreground/60 mb-1">Origin</p>
                      <p className="font-semibold text-foreground">
                        {product.origin}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                {product.certifications.length > 0 && (
                  <div className="mb-8">
                    <p className="text-sm font-semibold text-foreground mb-3">
                      Certifications
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.certifications.map((cert) => (
                        <Badge key={cert} className="bg-green-100 text-green-800">
                          <Check className="w-3 h-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity and CTA */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">
                      Quantity ({product.unit})
                    </label>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="0"
                      min={product.minOrderQuantity}
                      className="h-12"
                    />
                    <p className="text-xs text-foreground/60 mt-2">
                      Minimum order: {product.minOrderQuantity} {product.unit}
                    </p>
                  </div>

                  <Button
                    size="lg"
                    className="w-full gap-2"
                    onClick={handleAddToRFQ}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Request Quote
                  </Button>
                </div>

                {/* Benefits */}
                <div className="mt-8 pt-8 border-t border-border space-y-4">
                  {[
                    { icon: Truck, text: "Fast Delivery" },
                    { icon: Leaf, text: "Premium Quality" },
                    { icon: Check, text: "Best Prices" },
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <benefit.icon className="w-5 h-5 text-primary" />
                      <span className="text-foreground/70">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <section className="py-12 border-t border-border">
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  Related Products
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
