"use client"

import React from "react"
import { cn } from "@/lib/utils"

/**
 * IconLinkCard
 *
 * Design token source: Figma node 9:37–9:82 — "Create an API Key", "Browse Models",
 * "API Reference", "Libraries & SDKs", "ElevenAgents", "Pricing Overview" tiles
 * on the Developers overview page.
 *
 * A wide, clickable card tile with a 24px icon on the left and a text label.
 * Used in a 3-column (or 2-column) grid as quick-navigation shortcuts.
 *
 * Design specs (Figma node 9:37):
 * - Height: 56px
 * - Padding: 17px all sides
 * - Border: 1px rgba(0,0,29,0.1), bg: white (light) / #0a0a0a (dark)
 * - Rounded: 12px
 * - Icon size: 24px, muted color
 * - Text: 14px Medium, #0f0f10 (light) / #e5e5e8 (dark)
 * - Gap between icon and text: 10px
 *
 * Props:
 * - icon      — ReactNode shown on the left
 * - label     — link label text
 * - href      — optional href; renders as <a> when provided, else <button>
 * - onClick   — optional click handler
 * - className — additional overrides
 *
 * Use IconLinkGrid to wrap multiple cards in a responsive grid.
 */
export interface IconLinkCardProps {
    icon: React.ReactNode
    label: string
    href?: string
    onClick?: () => void
    className?: string
}

export function IconLinkCard({ icon, label, href, onClick, className }: IconLinkCardProps) {
    const baseClasses = cn(
        "w-full flex items-center gap-[10px] h-14 px-[17px] rounded-xl",
        "bg-[#0a0a0a] border border-[rgba(229,229,232,0.08)]",
        "text-[14px] font-medium text-[#e5e5e8] whitespace-nowrap",
        "transition-colors duration-150 cursor-pointer outline-none",
        "hover:bg-[#141414] hover:border-[rgba(229,229,232,0.12)]",
        "active:bg-[#0f0f0f]",
        "focus-visible:ring-2 focus-visible:ring-[#e5e5e8]/40",
        className
    )

    const content = (
        <>
            <span className="text-[rgba(229,229,232,0.5)] shrink-0 w-6 h-6 flex items-center justify-center">
                {icon}
            </span>
            <span>{label}</span>
        </>
    )

    if (href) {
        return (
            <a href={href} className={baseClasses}>
                {content}
            </a>
        )
    }

    return (
        <button onClick={onClick} className={baseClasses}>
            {content}
        </button>
    )
}

/**
 * IconLinkGrid
 *
 * Responsive grid wrapper for IconLinkCard tiles.
 * Defaults to 3 columns (matching the Developers page layout).
 *
 * Props:
 * - items     — array of IconLinkCardProps
 * - cols      — number of columns (default 3)
 * - className — additional overrides
 */
export interface IconLinkGridItem extends IconLinkCardProps {
    id: string
}

export interface IconLinkGridProps {
    items: IconLinkGridItem[]
    cols?: 2 | 3
    className?: string
}

export function IconLinkGrid({ items, cols = 3, className }: IconLinkGridProps) {
    return (
        <div
            className={cn(
                "grid gap-2",
                cols === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2",
                className
            )}
        >
            {items.map((item) => (
                <IconLinkCard key={item.id} {...item} />
            ))}
        </div>
    )
}
