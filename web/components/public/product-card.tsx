import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import { ArrowRight } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-2xl transition-all hover:border-primary/60 cursor-pointer group border-0">
        {/* Product Image */}
        <div className="relative h-56 bg-muted overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.stock <= 50 && (
            <Badge variant="destructive" className="absolute top-4 right-4 shadow-lg">
              Low Stock
            </Badge>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">
            {product.category.name}
          </p>
          <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <p className="text-sm text-foreground/60 mb-5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Specs */}
          <div className="flex items-baseline gap-2 mb-5">
            <p className="text-xs text-foreground/60">Price per {product.unit}</p>
            <p className="font-bold text-2xl text-primary">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Min Order */}
          <p className="text-xs text-foreground/50 mb-4 font-medium">
            Minimum order: {product.minOrderQuantity} {product.unit}
          </p>

          {/* Certifications */}
          {product.certifications.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {product.certifications.slice(0, 2).map((cert) => (
                <Badge key={cert} variant="secondary" className="text-xs font-semibold">
                  {cert}
                </Badge>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
            View Details
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
