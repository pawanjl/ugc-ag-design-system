"use client"

import React from "react"
import { cn } from "@/lib/utils"

/**
 * QuickActionCard
 *
 * Design token source: Figma node 1:85–1:329 — the 6-card product quick-action grid
 * (Instant speech · Audiobook · Image & Video · ElevenAgents · Music · Dubbed video)
 *
 * A square card with an illustration thumbnail area and a centered label below.
 * Used to present product shortcuts on the home dashboard.
 *
 * Design specs:
 * - Thumbnail: 180×180px, bg rgba(0,0,23,0.04), rounded-[20px]
 * - Label: 14px Inter Medium, centered
 * - Hover: subtle scale + brightness lift
 *
 * Props:
 * - label       — action name shown below the thumbnail
 * - icon        — ReactNode rendered inside the thumbnail (SVG, img, lucide, etc.)
 * - href        — optional link URL
 * - onClick     — optional click handler
 * - className   — additional overrides
 * - thumbnailBg — override thumbnail background (any Tailwind bg class or CSS value)
 */
export interface QuickActionCardProps {
    label: string
    icon?: React.ReactNode
    href?: string
    onClick?: () => void
    className?: string
    thumbnailBg?: string
}

export function QuickActionCard({
    label,
    icon,
    href,
    onClick,
    className,
    thumbnailBg,
}: QuickActionCardProps) {
    const card = (
        <div
            className={cn(
                "group flex flex-col items-center gap-2 w-[180px] cursor-pointer select-none",
                className
            )}
            onClick={onClick}
        >
            {/* Thumbnail */}
            <div
                className="relative flex items-center justify-center w-full h-[180px] rounded-[20px] overflow-hidden transition-all duration-200 group-hover:brightness-105 group-hover:scale-[1.02]"
                style={{ background: thumbnailBg ?? "rgba(0,0,23,0.06)" }}
            >
                {icon && (
                    <div className="flex items-center justify-center w-[108px] h-[108px]">
                        {icon}
                    </div>
                )}
            </div>

            {/* Label */}
            <span className="text-[14px] font-medium leading-5 text-[rgba(229,229,232,0.9)] text-center">
                {label}
            </span>
        </div>
    )

    if (href) {
        return (
            <a href={href} className="no-underline">
                {card}
            </a>
        )
    }

    return card
}

/**
 * QuickActionGrid
 *
 * Convenience wrapper that renders a row of QuickActionCards.
 * Handles even spacing via flex with gap.
 */
export interface QuickActionGridProps {
    items: QuickActionCardProps[]
    className?: string
}

export function QuickActionGrid({ items, className }: QuickActionGridProps) {
    return (
        <div className={cn("flex items-start justify-center gap-3 flex-wrap", className)}>
            {items.map((item) => (
                <QuickActionCard key={item.label} {...item} />
            ))}
        </div>
    )
}
