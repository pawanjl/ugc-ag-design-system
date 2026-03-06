"use client"

import React from "react"
import { Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * FilterChip
 *
 * Design token source: Figma node 7:1657–7:1725 — the filter chip pills in the filter bar
 * (Method · Code · Pattern (active/dark) · XI API Key · Start Time · End Time …)
 *
 * A compact pill chip used inside a filter bar. Two visual variants:
 * - default: light bg, border, "+" prefix icon, dark text — for addable filters
 * - active:  dark bg (#0f0f10), white text, "×" remove icon — for applied filters
 *
 * Active chips with a count separator (like "Pattern | 4 patterns") are supported
 * via `count` + `countLabel`.
 *
 * Props:
 * - label      — chip label text
 * - active     — whether the chip is in "applied" state
 * - count      — optional count shown after a vertical separator (active only)
 * - countLabel — optional text shown next to the count
 * - onAdd      — callback for adding this filter (default/inactive chips)
 * - onRemove   — callback for removing this filter (active chips)
 * - className  — additional overrides
 */
export interface FilterChipProps {
    label: string
    active?: boolean
    count?: number
    countLabel?: string
    onAdd?: () => void
    onRemove?: () => void
    className?: string
}

export function FilterChip({
    label,
    active,
    count,
    countLabel,
    onAdd,
    onRemove,
    className,
}: FilterChipProps) {
    if (active) {
        // Active state — dark pill with × remove and optional count badge
        return (
            <div
                className={cn(
                    "inline-flex items-center h-6 rounded-lg bg-[#0f0f10] border border-transparent px-1 py-px gap-1 shrink-0",
                    className
                )}
            >
                {/* Remove button */}
                <button
                    onClick={onRemove}
                    aria-label={`Remove ${label} filter`}
                    className="size-4 rounded-full flex items-center justify-center shrink-0 hover:bg-white/10 transition-colors"
                >
                    <X className="w-2.5 h-2.5 text-white rotate-0" />
                </button>

                {/* Label */}
                <span className="text-[12px] font-medium leading-4 tracking-[0.03px] text-white whitespace-nowrap px-0.5">
                    {label}
                </span>

                {/* Optional count separator */}
                {count !== undefined && (
                    <span className="flex items-center pl-2.5 border-l border-[#494950] ml-px">
                        <span className="text-[12px] font-medium leading-4 tracking-[0.03px] text-white whitespace-nowrap pr-1">
                            {countLabel ?? count}
                        </span>
                    </span>
                )}
            </div>
        )
    }

    // Default/inactive state — light pill with + prefix
    return (
        <button
            onClick={onAdd}
            className={cn(
                "inline-flex items-center h-6 rounded-lg bg-[#0a0a0a] border border-[rgba(0,0,29,0.08)] px-1 py-px gap-1 shrink-0",
                "hover:bg-[#141414] hover:border-[#262626] transition-colors",
                className
            )}
        >
            <Plus className="w-3.5 h-3.5 text-[#e5e5e8] shrink-0" />
            <span className="text-[12px] font-medium leading-4 tracking-[0.03px] text-[#e5e5e8] whitespace-nowrap pr-0.5">
                {label}
            </span>
        </button>
    )
}

/**
 * FilterBar
 *
 * Convenience wrapper that lays out a row of FilterChips with a trailing
 * clear-all button (×) when any chip is active.
 */
export interface FilterBarChip extends FilterChipProps {
    id: string
}

export interface FilterBarProps {
    chips: FilterBarChip[]
    onClearAll?: () => void
    className?: string
}

export function FilterBar({ chips, onClearAll, className }: FilterBarProps) {
    const hasActive = chips.some((c) => c.active)

    return (
        <div className={cn("flex flex-wrap items-center gap-2", className)}>
            {chips.map((chip) => (
                <FilterChip key={chip.id} {...chip} />
            ))}

            {hasActive && onClearAll && (
                <button
                    onClick={onClearAll}
                    aria-label="Clear all filters"
                    className="size-6 rounded-md flex items-center justify-center hover:bg-[#1a1a1a] transition-colors"
                >
                    <X className="w-3 h-3 text-[rgba(229,229,232,0.5)]" />
                </button>
            )}
        </div>
    )
}
