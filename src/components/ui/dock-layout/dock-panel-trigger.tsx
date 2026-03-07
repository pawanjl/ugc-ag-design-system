"use client"

import * as React from "react"
import { useDock } from "./dock-layout"
import { Slot } from "@radix-ui/react-slot"

interface DockPanelTriggerProps {
  /** The ID of the panel this trigger controls */
  panel: string
  /** Wrap existing component or render native button */
  asChild?: boolean
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
}

export function DockPanelTrigger({
  panel,
  asChild,
  children,
  onClick,
  ...props
}: DockPanelTriggerProps) {
  const { togglePanel } = useDock()

  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      {...props}
      onClick={(e: React.MouseEvent) => {
        togglePanel(panel)
        onClick?.(e)
      }}
    >
      {children}
    </Comp>
  )
}
