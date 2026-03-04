import { getProductById } from "@/lib/mock-data";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product)
    return { title: "Product Not Found – WholeGrains" };
  return {
    title: `${product.name} – WholeGrains`,
    description: product.description,
  };
}

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
