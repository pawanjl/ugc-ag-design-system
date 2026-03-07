"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDock } from "./dock-layout"
import { cn } from "@/lib/utils"

interface DockPanelProps {
  /** Uniquely identifies the panel to trigger it elsewhere */
  id: string
  /** The side of the screen it pushes from */
  side: "left" | "right" | "top" | "bottom"
  /** Maximum size in pixels (width for left/right, height for top/bottom) */
  size: number
  children: React.ReactNode
  className?: string
  defaultOpen?: boolean
}

export function DockPanel({ id, side, size, children, className, defaultOpen = false }: DockPanelProps) {
  const { panels, registerPanel, unregisterPanel } = useDock()

  // Register panel with global layout Context on mount
  React.useEffect(() => {
    registerPanel(id, { isOpen: defaultOpen, side, size })
    return () => unregisterPanel(id)
  }, [id, side, size, defaultOpen, registerPanel, unregisterPanel])

  const isOpen = panels[id]?.isOpen ?? false

  const isVertical = side === "left" || side === "right"
  const isHorizontal = side === "top" || side === "bottom"

  // Animation variants dictate which direction width/height originates from
  const variants = {
    open: {
      width: isVertical ? size : "100%",
      height: isHorizontal ? size : "100%",
      opacity: 1,
    },
    closed: {
      width: isVertical ? 0 : "100%",
      height: isHorizontal ? 0 : "100%",
      opacity: 0,
    },
  }

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.aside
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            order: side === "left" || side === "top" ? -1 : 1, // Determines DOM order vs Content
          }}
          className={cn(
            "relative z-40 bg-background overflow-hidden",
            // Shadows to simulate the sliding depth
            side === "right" ? "-ml-[1px] shadow-[-8px_0_24px_-16px_rgba(0,0,0,0.5)]" : "",
            side === "left" ? "-mr-[1px] shadow-[8px_0_24px_-16px_rgba(0,0,0,0.5)]" : "",
            side === "top" ? "-mb-[1px] shadow-[0_8px_24px_-16px_rgba(0,0,0,0.5)]" : "",
            side === "bottom" ? "-mt-[1px] shadow-[0_-8px_24px_-16px_rgba(0,0,0,0.5)]" : "",
            className
          )}
        >
          {/* Inner constraint to prevent React children from reflowing during animation width collapse */}
          <div
            style={{
              width: isVertical ? size : "100%",
              height: isHorizontal ? size : "100%",
            }}
            className="flex flex-col overflow-y-auto"
          >
            {children}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
