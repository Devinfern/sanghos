
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-brand-primary text-white hover:bg-brand-primary/90 after:absolute after:inset-0 after:bg-white after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-10 hover:shadow-md hover:translate-y-[-2px] active:translate-y-0 active:scale-[0.98] [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-md hover:translate-y-[-2px] active:translate-y-0 active:scale-[0.98]",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-brand-primary hover:shadow-sm hover:translate-y-[-1px] active:translate-y-0 [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5",
        secondary:
          "bg-brand-sand text-white hover:bg-brand-sand/80 hover:shadow-sm hover:translate-y-[-1px] active:translate-y-0 [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5",
        ghost: "hover:bg-accent hover:text-accent-foreground [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5",
        link: "text-brand-primary underline-offset-4 hover:underline hover:text-brand-primary/80 [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
