import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors duration-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-none leading-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 border border-transparent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent",
        outline: "bg-background border border-border/50 hover:bg-accent hover:border-border active:bg-accent active:border-border text-foreground disabled:bg-background disabled:text-muted-foreground disabled:border-border",
        ghost: "hover:bg-accent hover:text-accent-foreground border border-transparent",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 border border-transparent",
      },
      size: {
        sm: "h-8 px-2.5 text-xs rounded-[0.6rem]",
        md: "h-10 px-4 py-2 text-sm rounded-[0.6rem]",
        lg: "h-11 px-8 text-base rounded-[0.8rem]",
        icon: "h-8 w-8 rounded-[0.6rem]",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
