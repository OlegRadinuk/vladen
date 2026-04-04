"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-oswald font-medium tracking-wide transition-all duration-200 rounded",
        {
          "bg-accent text-white hover:bg-amber-600 shadow-lg hover:shadow-accent/30":
            variant === "primary",
          "border-2 border-accent text-accent hover:bg-accent hover:text-white":
            variant === "outline",
          "text-accent hover:text-amber-600 underline-offset-4 hover:underline":
            variant === "ghost",
        },
        {
          "px-4 py-2 text-sm": size === "sm",
          "px-6 py-3 text-base": size === "md",
          "px-8 py-4 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
