"use client"

import React from "react"
import { cn } from "@/lib/utils"

/**
 * VoiceActionCard
 *
 * Design token source: Figma node 1:480–1:548 — "Create or clone a voice" cards
 * (Voice Design · Clone your Voice · Voice Collections)
 *
 * A horizontal card used for voice creation/clone actions. Shows:
 * - A square thumbnail on the left (muted bg, icon inside)
 * - Title + description on the right
 * - Whole card is clickable
 *
 * Design specs:
 * - Card: min-h 92px, rounded-[16px], p-[6px], border border-[#262626]
 * - Thumbnail: 122×~80px, rounded-[16px], muted bg
 * - Title: 14px Medium
 * - Description: 14px Regular muted
 * - Hover: bg lighten + slight scale
 *
 * Props:
 * - title       — card title (e.g. "Voice Design")
 * - description — supporting text
 * - icon        — ReactNode rendered inside the thumbnail area
 * - href        — optional link URL
 * - onClick     — optional click handler
 * - className   — additional overrides
 */
export interface VoiceActionCardProps {
    title: string
    description?: string
    icon?: React.ReactNode
    href?: string
    onClick?: () => void
    className?: string
}

export function VoiceActionCard({
    title,
    description,
    icon,
    href,
    onClick,
    className,
}: VoiceActionCardProps) {
    const card = (
        <div
            className={cn(
                "group flex items-center gap-4 min-h-[92px] p-1.5 rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a]",
                "hover:bg-[#0f0f10] hover:border-[#262626] transition-all duration-150 cursor-pointer",
                className
            )}
            onClick={onClick}
        >
            {/* Thumbnail */}
            <div className="shrink-0 flex items-center justify-center w-[110px] self-stretch rounded-2xl bg-[#141414] border border-[#1a1a1a] group-hover:bg-[#1a1a1a] transition-colors overflow-hidden">
                {icon && (
                    <div className="flex items-center justify-center w-12 h-12">
                        {icon}
                    </div>
                )}
            </div>

            {/* Text content */}
            <div className="flex flex-col gap-0.5 min-w-0 flex-1 py-1">
                <span className="text-[14px] font-medium leading-5 text-[rgba(229,229,232,0.9)]">
                    {title}
                </span>
                {description && (
                    <span className="text-[14px] font-normal leading-5 text-[rgba(229,229,232,0.5)]">
                        {description}
                    </span>
                )}
            </div>
        </div>
    )

    if (href) {
        return (
            <a href={href} className="block no-underline">
                {card}
            </a>
        )
    }

    return card
}
