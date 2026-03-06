"use client"

import React, { useState } from "react"
import { Play, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * VoiceLibraryItem
 *
 * Design token source: Figma node 1:344–1:471 — voice list items under "Latest from the library"
 *
 * A single row in a voice library list. Shows:
 * - A circular avatar with a gradient image (hover reveals a play button overlay)
 * - A verified badge icon (top-right of avatar)
 * - Voice name (semi-bold) + description (muted regular)
 * - Optional add/actions on hover
 *
 * Design specs:
 * - Avatar: 32×32px circle, overflow-clip
 * - Play button overlay: appears on hover, dark bg circle
 * - Name: 14px Semi Bold #e5e5e8
 * - Description: 14px Regular rgba(229,229,232,0.5)
 * - Row padding: py-3, gap-2 between avatar and text
 *
 * Props:
 * - name        — voice display name
 * - description — short description text
 * - avatarSrc   — URL or data URI for the avatar image
 * - avatarFallback — initials/emoji shown when avatarSrc fails
 * - verified    — whether to show the verified badge
 * - onPlay      — callback when play button is clicked
 * - onAdd       — callback when add button is clicked
 * - className   — additional overrides
 */
export interface VoiceLibraryItemProps {
    name: string
    description?: string
    avatarSrc?: string
    avatarFallback?: string
    verified?: boolean
    onPlay?: () => void
    onAdd?: () => void
    className?: string
}

export function VoiceLibraryItem({
    name,
    description,
    avatarSrc,
    avatarFallback,
    verified = true,
    onPlay,
    onAdd,
    className,
}: VoiceLibraryItemProps) {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            className={cn(
                "group flex items-center gap-2 py-3 w-full transition-colors hover:bg-[#0f0f10] rounded-lg px-1 -mx-1 cursor-pointer",
                className
            )}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Avatar + play overlay */}
            <div className="relative shrink-0 size-8">
                {/* Avatar circle */}
                <div className="size-8 rounded-full overflow-clip bg-[#1a1a1a] border border-[#262626] flex items-center justify-center">
                    {avatarSrc ? (
                        <img
                            src={avatarSrc}
                            alt={name}
                            className="size-full object-cover"
                            onError={(e) => {
                                // Fallback to initials
                                ; (e.target as HTMLImageElement).style.display = "none"
                            }}
                        />
                    ) : (
                        <span className="text-[11px] font-semibold text-[#787881]">
                            {avatarFallback ?? name.slice(0, 2).toUpperCase()}
                        </span>
                    )}
                </div>

                {/* Play button overlay (visible on hover) */}
                <button
                    onClick={(e) => { e.stopPropagation(); onPlay?.() }}
                    className={cn(
                        "absolute inset-0 rounded-full bg-[#0f0f10]/90 flex items-center justify-center transition-opacity",
                        hovered ? "opacity-100" : "opacity-0"
                    )}
                    aria-label={`Play ${name}`}
                >
                    <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                </button>

                {/* Verified badge */}
                {verified && (
                    <span
                        className="absolute -top-1.5 -right-1.5 size-4 rounded-full bg-[#0a0a0a] border border-[#262626] flex items-center justify-center"
                        aria-label="Verified"
                    >
                        <span className="text-[7px] text-[#22c55e]">✓</span>
                    </span>
                )}
            </div>

            {/* Text */}
            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                <span className="text-[14px] font-semibold leading-5 text-[#e5e5e8] truncate">
                    {name}
                </span>
                {description && (
                    <span className="text-[14px] font-normal leading-5 text-[rgba(229,229,232,0.5)] truncate">
                        {description}
                    </span>
                )}
            </div>

            {/* Add button (visible on hover) */}
            {onAdd && (
                <button
                    onClick={(e) => { e.stopPropagation(); onAdd() }}
                    className={cn(
                        "shrink-0 size-7 rounded-lg border border-[#262626] bg-[#141414] flex items-center justify-center hover:bg-[#1a1a1a] transition-all",
                        hovered ? "opacity-100" : "opacity-0"
                    )}
                    aria-label={`Add ${name}`}
                >
                    <Plus className="w-3.5 h-3.5 text-[#e5e5e8]" />
                </button>
            )}
        </div>
    )
}

/**
 * VoiceLibraryList
 *
 * Convenience wrapper that renders a list of VoiceLibraryItems
 * with dividers between rows, and an optional "Explore Library" button.
 */
export interface VoiceLibraryListProps {
    items: VoiceLibraryItemProps[]
    onExplore?: () => void
    className?: string
}

export function VoiceLibraryList({ items, onExplore, className }: VoiceLibraryListProps) {
    return (
        <div className={cn("flex flex-col", className)}>
            {items.map((item, i) => (
                <React.Fragment key={item.name}>
                    {i > 0 && <div className="h-px bg-[#1a1a1a] mx-1" />}
                    <VoiceLibraryItem {...item} />
                </React.Fragment>
            ))}

            {onExplore && (
                <div className="pt-2">
                    <button
                        onClick={onExplore}
                        className="inline-flex items-center px-3 h-8 rounded-lg border border-[#262626] bg-[#0a0a0a] text-[13px] font-medium text-[#e5e5e8] hover:bg-[#141414] transition-colors"
                    >
                        Explore Library
                    </button>
                </div>
            )}
        </div>
    )
}
