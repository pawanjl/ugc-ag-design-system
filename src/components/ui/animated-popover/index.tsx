"use client"

import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export interface AnimatedPopoverProps {
  /**
   * The element providing the trigger mechanism for the popover (e.g. a Button).
   */
  trigger: React.ReactNode
  /**
   * The body/content of the popover that appears when open.
   */
  children: React.ReactNode
  /**
   * Additional classNames to merge into the popover content block.
   */
  className?: string
  /**
   * Controlled open state.
   */
  open?: boolean
  /**
   * Controlled open state change handler.
   */
  onOpenChange?: (open: boolean) => void
  /**
   * The alignment of the popover relative to the trigger.
   * @default "center"
   */
  align?: "start" | "center" | "end"
  /**
   * The distance from the trigger.
   * @default 8
   */
  sideOffset?: number
}

/**
 * A generic animated wrapper over Shadcn's Popover Primitive.
 * It enforces the precise scale-in, fade-in, backdrop-blur aesthetics
 * from the design system's floating elements.
 */
export function AnimatedPopover({
  trigger,
  children,
  className,
  open,
  onOpenChange,
  align = "center",
  sideOffset = 8,
}: AnimatedPopoverProps) {
  // If no external control is provided, handle state internally
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = open !== undefined && onOpenChange !== undefined
  
  const isOpen = isControlled ? open : internalOpen
  const setIsOpen = isControlled ? onOpenChange : setInternalOpen

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
      
      <PopoverContent 
        align={align}
        sideOffset={sideOffset}
        className={cn(
          // Essential layout constraints
          "z-50 max-w-[var(--radix-popover-content-available-width)] max-h-[var(--radix-popover-content-available-height)] overflow-auto",
          
          // Aesthetic & Layout
          "bg-background/90 backdrop-blur-md text-foreground shadow-2xl border border-[#1f1f1f] rounded-[16px] p-3",
          
          // Accessiblity & Animations
          "outline-none duration-100",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          
          // Inject user classNames like w-[340px] if provided, overridden defaults if necessary
          className
        )}
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}
