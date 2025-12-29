import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2.5 whitespace-nowrap",
    "rounded-xl font-medium",
    "transition-all duration-300 ease-out",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
    "shrink-0 [&_svg]:shrink-0",
    "outline-none select-none",
    "focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90",
          "shadow-sm",
          "hover:shadow-md",
          "active:scale-[0.98] active:shadow-sm",
        ].join(" "),

        // Premium gradient button - refined shimmer
        premium: [
          "relative overflow-hidden",
          "bg-gradient-to-r from-[oklch(0.55_0.18_265)] via-[oklch(0.6_0.16_285)] to-[oklch(0.55_0.18_265)]",
          "bg-[length:200%_100%]",
          "text-white font-semibold tracking-[-0.01em]",
          "shadow-[0_2px_16px_oklch(0.55_0.18_265_/_0.25)]",
          "hover:shadow-[0_4px_24px_oklch(0.55_0.18_265_/_0.35)]",
          "hover:bg-[position:100%_0]",
          "active:scale-[0.98]",
          "shimmer",
        ].join(" "),

        // Glass button - elegant and minimal
        glass: [
          "bg-white/[0.05] backdrop-blur-2xl",
          "border border-white/[0.08]",
          "text-white/90",
          "hover:bg-white/[0.08]",
          "hover:border-white/[0.12]",
          "hover:text-white",
          "shadow-[0_2px_8px_rgba(0,0,0,0.12)]",
          "hover:shadow-[0_4px_12px_rgba(0,0,0,0.16)]",
          "active:scale-[0.98]",
        ].join(" "),

        // Outline - clean border
        outline: [
          "border border-white/10",
          "bg-transparent",
          "text-foreground/70",
          "hover:bg-white/[0.03]",
          "hover:border-white/15",
          "hover:text-foreground",
          "active:scale-[0.98]",
        ].join(" "),

        // Ghost - minimal
        ghost: [
          "text-muted-foreground",
          "hover:bg-white/[0.04]",
          "hover:text-foreground",
          "active:scale-[0.98]",
        ].join(" "),

        // Secondary - subtle emphasis
        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:bg-secondary/80",
          "shadow-xs",
          "active:scale-[0.98]",
        ].join(" "),

        // Success - refined green
        success: [
          "bg-[oklch(0.55_0.16_155)] text-white",
          "hover:bg-[oklch(0.58_0.16_155)]",
          "shadow-[0_2px_12px_oklch(0.55_0.16_155_/_0.2)]",
          "hover:shadow-[0_4px_16px_oklch(0.55_0.16_155_/_0.3)]",
          "active:scale-[0.98]",
        ].join(" "),

        // Destructive - refined red
        destructive: [
          "bg-destructive text-white",
          "hover:bg-destructive/90",
          "shadow-[0_2px_12px_oklch(0.55_0.22_25_/_0.2)]",
          "active:scale-[0.98]",
        ].join(" "),
      },
      size: {
        default: "h-10 px-5 py-2 text-sm",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-7 text-[15px]",
        xl: "h-14 rounded-2xl px-8 text-base tracking-[-0.01em]",
        icon: "size-10",
        "icon-sm": "size-8 rounded-lg",
        "icon-lg": "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
