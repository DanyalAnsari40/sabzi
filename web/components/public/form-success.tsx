"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface FormSuccessProps {
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

export function FormSuccess({
  title,
  message,
  actionLabel = "Return to Home",
  actionHref = "/",
  onActionClick,
}: FormSuccessProps) {
  return (
    <Card className="p-12 text-center max-w-md w-full mx-4 border-primary/30 bg-primary/5">
      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-8 h-8 text-primary-foreground" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
      <p className="text-foreground/60 mb-6">{message}</p>
      {actionHref && (
        <Button asChild className="w-full">
          <Link href={actionHref} onClick={onActionClick}>
            {actionLabel}
          </Link>
        </Button>
      )}
      {onActionClick && !actionHref && (
        <Button className="w-full" onClick={onActionClick}>
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}
