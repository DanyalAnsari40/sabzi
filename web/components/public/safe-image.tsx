"use client";

import { useState } from "react";
import Image from "next/image";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=300&fit=crop";

type SafeImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function SafeImage({
  src,
  alt,
  fill = true,
  className,
  sizes,
  priority,
}: SafeImageProps) {
  const [error, setError] = useState(false);
  const effectiveSrc = error ? PLACEHOLDER : src;

  return (
    <Image
      src={effectiveSrc}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}
