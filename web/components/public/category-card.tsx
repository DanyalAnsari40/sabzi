import Image from "next/image";
import Link from "next/link";
import { Category } from "@/lib/types";
import { Card } from "@/components/ui/card";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <Card className="h-full overflow-hidden hover:shadow-2xl transition-all cursor-pointer group border-0 hover-lift">
        {/* Category Image */}
        <div className="relative h-56 bg-muted overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-125 transition-transform duration-500"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-300 flex items-end">
            {/* Badge */}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-primary/90 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                Popular
              </span>
            </div>

            <div className="p-6 w-full">
              <h3 className="font-bold text-white text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">{category.description}</p>
            </div>
          </div>

          {/* Arrow Icon */}
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
