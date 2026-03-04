"use client";

import Image from "next/image";
import { useState } from "react";

const HERO_PLACEHOLDER =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop";

export function HeroImage() {
  const [error, setError] = useState(false);
  const src = error ? HERO_PLACEHOLDER : "/images/hero-banner.jpg";

  return (
    <Image
      src={src}
      alt="Fresh produce – vegetables and fruits"
      fill
      className="object-cover object-center"
      priority
      sizes="(max-width: 1024px) 100vw, 50vw"
      onError={() => setError(true)}
    />
  );
}
