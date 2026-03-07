"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

// --- Context ---

type DockSide = "left" | "right" | "top" | "bottom"

interface DockPanelState {
  isOpen: boolean
  side: DockSide
  size: number
}

interface DockContextType {
  panels: Record<string, DockPanelState>
  registerPanel: (id: string, initialState: DockPanelState) => void
  unregisterPanel: (id: string) => void
  togglePanel: (id: string) => void
  setPanelState: (id: string, isOpen: boolean) => void
}

const DockContext = React.createContext<DockContextType | undefined>(undefined)

export function useDock() {
  const context = React.useContext(DockContext)
  if (!context) {
    throw new Error("useDock must be used within a DockLayout")
  }
  return context
}

// --- Layout Wrapper ---

interface DockLayoutProps {
  children: React.ReactNode
  className?: string
}

export function DockLayout({ children, className }: DockLayoutProps) {
  const [panels, setPanels] = React.useState<Record<string, DockPanelState>>({})

  const registerPanel = React.useCallback(
    (id: string, initialState: DockPanelState) => {
      setPanels((prev) => {
        if (prev[id]) return prev // Already registered
        return { ...prev, [id]: initialState }
      })
    },
    []
  )

  const unregisterPanel = React.useCallback((id: string) => {
    setPanels((prev) => {
      const newPanels = { ...prev }
      delete newPanels[id]
      return newPanels
    })
  }, [])

  const togglePanel = React.useCallback((id: string) => {
    setPanels((prev) => {
      const panel = prev[id]
      if (!panel) return prev
      return {
        ...prev,
        [id]: { ...panel, isOpen: !panel.isOpen },
      }
    })
  }, [])

  const setPanelState = React.useCallback((id: string, isOpen: boolean) => {
    setPanels((prev) => {
      const panel = prev[id]
      if (!panel || panel.isOpen === isOpen) return prev
      return {
        ...prev,
        [id]: { ...panel, isOpen },
      }
    })
  }, [])

  return (
    <DockContext.Provider
      value={{ panels, registerPanel, unregisterPanel, togglePanel, setPanelState }}
    >
      <div className={`relative flex h-screen w-full overflow-hidden bg-background ${className || ""}`}>
        {children}
      </div>
    </DockContext.Provider>
  )
}
