"use client"

import React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * SearchInput
 *
 * Design token source: Figma node 7:1646 — "Search path or query..." input with search icon
 *
 * Full-width search field with a magnifier icon pinned to the left edge.
 * Optionally renders a trailing action button (e.g. "Jump to timestamp").
 *
 * Design specs:
 * - Height: 40px, rounded-[12px]
 * - Border: 1px rgba(0,0,29,0.08)
 * - Icon: 18px, opacity-50, left-10px
 * - Placeholder: 14px Medium, muted color
 * - Action button (optional): dark pill on the right, height 40px, rounded-[12px]
 *
 * Props:
 * - value       — controlled value
 * - onChange    — change handler
 * - placeholder — placeholder text
 * - action      — optional { label, onClick } for a trailing CTA button
 * - className   — additional overrides
 */
export interface SearchInputProps {
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    action?: { label: string; onClick: () => void }
    className?: string
    id?: string
}

export function SearchInput({
    value,
    onChange,
    placeholder = "Search…",
    action,
    className,
    id,
}: SearchInputProps) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            {/* Search field */}
            <div className="relative flex-1 flex items-center h-10 rounded-xl border border-border bg-background overflow-hidden">
                {/* Icon */}
                <Search className="absolute left-2.5 w-[18px] h-[18px] text-muted-foreground/50 shrink-0 pointer-events-none" />

                {/* Input */}
                <input
                    id={id}
                    type="search"
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder={placeholder}
                    className="h-full w-full bg-transparent pl-9 pr-3 text-[14px] font-medium text-foreground placeholder:text-muted-foreground outline-none"
                />
            </div>

            {/* Optional CTA button */}
            {action && (
                <button
                    onClick={action.onClick}
                    className="shrink-0 h-10 px-4 rounded-xl bg-foreground text-background text-[14px] font-medium whitespace-nowrap hover:bg-foreground/90 transition-colors"
                >
                    {action.label}
                </button>
            )}
        </div>
    )
}
