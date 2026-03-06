import * as React from "react"
import { cn } from "@/lib/utils"

export interface GenericCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/**
 * GenericCard
 * 
 * A reusable container component following the ElevenLabs aesthetic.
 * Features:
 * - Subtle border (border-border/50)
 * - Card background (bg-card - #fafafa in light mode)
 * - Large border radius (rounded-3xl)
 * - Responsive padding and layout
 * - Subtle shadow (shadow-sm)
 */
export function Card({ children, className, ...props }: GenericCardProps) {
  return (
    <section
      className={cn(
        "flex flex-col lg:flex-row gap-3 p-6",
        "bg-card text-card-foreground",
        "border border-border  rounded-3xl",
        "transition-all duration-200",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

/**
 * GenericCardSubtle
 * 
 * A variant of the GenericCard with a more subtle background or different padding
 * if needed for specific use cases.
 */
export function GenericCardSubtle({ children, className, ...props }: GenericCardProps) {
    return (
      <section
        className={cn(
          "flex flex-col gap-4 p-5",
          "bg-muted/30 text-foreground",
          "border border-border/40 shadow-none rounded-2xl",
          className
        )}
        {...props}
      >
        {children}
      </section>
    )
  }
