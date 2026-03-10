"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Compass, Plus, MessageSquare, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface MobileNavItem {
  id: string
  label: string
  icon: React.ElementType
  href: string
  isPrimary?: boolean
}

const DEFAULT_ITEMS: MobileNavItem[] = [
  { id: "home", label: "Home", icon: Home, href: "/dashboard" },
  { id: "explore", label: "Explore", icon: Compass, href: "/dashboard/layouts" },
  { id: "create", label: "Create", icon: Plus, href: "/dashboard/create", isPrimary: true },
  { id: "messages", label: "Messages", icon: MessageSquare, href: "/dashboard/messages" },
  { id: "profile", label: "Profile", icon: User, href: "/dashboard/profile" },
]

export function MobileBottomNav({ items = DEFAULT_ITEMS }: { items?: MobileNavItem[] }) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Hide nav on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    // Use a passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 inset-x-0 mx-auto w-[calc(100%-2rem)] max-w-sm z-50 md:hidden"
        >
          <div className="flex items-center justify-between px-2 py-2 bg-background/80 backdrop-blur-xl border border-border/50 rounded-full shadow-2xl">
            {items.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              if (item.isPrimary) {
                return (
                  <Link href={item.href} key={item.id} className="relative -mt-6">
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/25 border-4 border-background"
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                  </Link>
                )
              }

              return (
                <Link
                  href={item.href}
                  key={item.id}
                  className="relative flex flex-col items-center justify-center w-14 h-12 gap-1 rounded-full transition-colors"
                >
                  <motion.div
                    initial={false}
                    animate={{ scale: isActive ? 1.1 : 1 }}
                    className={cn(
                      "flex items-center justify-center p-1 rounded-full transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
