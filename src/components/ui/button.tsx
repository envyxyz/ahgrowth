import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Pill buttons matching the reference set: sentence case (never uppercase),
 * generous horizontal padding, full radius. `primary` is the one place a
 * large vermilion fill is allowed.
 */
const buttonVariants = cva(
  "type-button inline-flex items-center justify-center gap-xs whitespace-nowrap rounded-full transition-colors duration-layout ease-smooth disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary hover:bg-primary-hover",
        secondary: "bg-overlay-fill text-ink hover:bg-overlay-fill-hover",
        /* For use ON the dark contrast block, which stays dark in both
           themes — so this pill reads light in both. `on-inverse` is a light
           value in either palette; `surface` is not. */
        inverse: "bg-on-inverse text-inverse hover:bg-on-inverse-secondary",
        ghost: "text-ink-muted hover:text-ink",
      },
      size: {
        sm: "h-9 px-lg",
        md: "h-12 px-xl",
        lg: "h-14 px-xxl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
