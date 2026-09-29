"use client";

import Button from "@/components/ui/Button";

interface ScrollCTAProps {
  targetId: string;
  label: string;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ScrollCTA({
  targetId,
  label,
  variant = "primary",
  size = "lg",
  className,
}: ScrollCTAProps) {
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" })}
    >
      {label}
    </Button>
  );
}
