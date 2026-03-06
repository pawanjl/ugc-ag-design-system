"use client"

import React from "react"
import { ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * AnnouncementBanner
 *
 * Design token source: Figma node 1:25 — "Introducing the Eleven Album" pill
 *
 * A dismissable pill-style announcement banner used at the top of content
 * areas. Contains a "New" label badge, announcement text, and a chevron/CTA.
 *
 * Props:
 * - badge     — label shown in the dark pill (default: "New")
 * - message   — announcement text
 * - href      — optional link URL; if provided, wraps in <a>
 * - onDismiss — optional callback; renders an × button when provided
 * - className — additional class overrides
 */
export interface AnnouncementBannerProps {
    badge?: string
    message: string
    href?: string
    onDismiss?: () => void
    className?: string
}

export function AnnouncementBanner({
    badge = "New",
    message,
    href,
    onDismiss,
    className,
}: AnnouncementBannerProps) {
    const inner = (
        <span className="inline-flex items-center gap-3 px-2 py-1.5">
            {/* Dark badge pill */}
            <span className="inline-flex items-center px-2.5 py-[3px] rounded-full bg-[#0f0f10] text-white text-[11px] font-medium tracking-[0.03px] leading-4 shrink-0">
                {badge}
            </span>

            {/* Message text */}
            <span className="text-sm font-medium text-[#e5e5e8] leading-5 pr-1">
                {message}
            </span>

            {/* Chevron */}
            <ChevronRight className="w-4 h-4 text-[#787881] shrink-0" />
        </span>
    )

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border border-[#262626] bg-[#0a0a0a]",
                className
            )}
        >
            {href ? (
                <a href={href} className="flex items-center hover:opacity-80 transition-opacity">
                    {inner}
                </a>
            ) : (
                <span className="flex items-center">{inner}</span>
            )}

            {onDismiss && (
                <button
                    onClick={onDismiss}
                    aria-label="Dismiss announcement"
                    className="mr-2 rounded-full p-1 hover:bg-[#1a1a1a] transition-colors"
                >
                    <X className="w-3 h-3 text-[#787881]" />
                </button>
            )}
        </div>
    )
}
