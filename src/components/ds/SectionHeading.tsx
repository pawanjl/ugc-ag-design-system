"use client"

import React from "react"
import { cn } from "@/lib/utils"

/**
 * SectionHeading
 *
 * Design token source: Figma nodes 1:336, 1:478
 * ("Latest from the library" / "Create or clone a voice")
 *
 * An 18px semi-bold section heading with optional trailing action link.
 * Used to label content sections within a dashboard page.
 *
 * Props:
 * - children  — heading text
 * - action    — optional { label, href } for a trailing text link
 * - className — additional class overrides
 */
export interface SectionHeadingProps {
    children: React.ReactNode
    action?: { label: string; href: string }
    className?: string
}

export function SectionHeading({ children, action, className }: SectionHeadingProps) {
    return (
        <div className={cn("flex items-center justify-between", className)}>
            <h2 className="text-[18px] font-semibold leading-[26px] tracking-[-0.045px] text-[#e5e5e8]">
                {children}
            </h2>
            {action && (
                <a
                    href={action.href}
                    className="text-sm font-medium text-[rgba(229,229,232,0.5)] hover:text-[#e5e5e8] transition-colors"
                >
                    {action.label}
                </a>
            )}
        </div>
    )
}
