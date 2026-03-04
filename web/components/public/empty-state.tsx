import { ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <Card className={`p-12 text-center border-0 bg-muted/30 ${className}`}>
      {icon && (
        <div className="flex justify-center mb-4 text-foreground/30 [&>svg]:w-12 [&>svg]:h-12">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-foreground/60 mb-6 max-w-sm mx-auto">{description}</p>
      )}
      {(actionLabel && (actionHref || onAction)) &&
        (actionHref ? (
          <Button asChild variant="outline">
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        ) : (
          <Button variant="outline" onClick={onAction}>
            {actionLabel}
          </Button>
        ))}
    </Card>
  );
}
