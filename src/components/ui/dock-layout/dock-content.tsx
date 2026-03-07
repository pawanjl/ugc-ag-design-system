"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useDock } from "./dock-layout"

interface DockContentProps {
  children: React.ReactNode
  className?: string
}

export function DockContent({ children, className }: DockContentProps) {
  const { panels } = useDock()

  // Calculate borders based on open panels pushing against the content
  const openPanels = Object.values(panels).filter((p) => p.isOpen)
  
  const hasAnyPanel = openPanels.length > 0

    return (
    <motion.main
      layout
      initial={false}
      animate={{
        borderRadius: hasAnyPanel ? 16 : 0,
        margin: hasAnyPanel ? "12px" : "0px",
        borderColor: hasAnyPanel ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0)",
        borderWidth: hasAnyPanel ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`
        relative flex flex-1 flex-col overflow-auto bg-background origin-center
        ${hasAnyPanel ? "shadow-2xl overflow-hidden" : ""}
        ${className || ""}
      `}
    >
      {children}
    </motion.main>
  )
}
