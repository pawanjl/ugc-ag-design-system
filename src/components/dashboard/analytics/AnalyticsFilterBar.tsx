"use client"

import * as React from "react"
import {
    Plus,
    ChevronDown,
    X,
    SlidersHorizontal,
} from "lucide-react"

interface GroupByChip {
    label: string
    onRemove: () => void
}

interface AnalyticsFilterBarProps {
    dateRange: string
    onDateRangeChange: (value: string) => void
    granularity: string
    onGranularityChange: (value: string) => void
    groupBy: string[]
    onRemoveGroupBy: (label: string) => void
}

const DATE_RANGES = ["Last 24 hours", "Last week", "Last month", "Last 3 months", "Custom"]
const GRANULARITIES = ["Hour", "Day", "Week", "Month"]

export function AnalyticsFilterBar({
    dateRange,
    onDateRangeChange,
    granularity,
    onGranularityChange,
    groupBy,
    onRemoveGroupBy,
}: AnalyticsFilterBarProps) {
    const [dateOpen, setDateOpen] = React.useState(false)
    const [granOpen, setGranOpen] = React.useState(false)

    return (
        <div className="flex flex-wrap items-center gap-2 py-3 border-b border-border">
            {/* Create view */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-foreground hover:bg-accent transition-colors border border-border">
                <Plus className="h-3.5 w-3.5" />
                Create view
            </button>

            <div className="h-4 w-px bg-border" />

            {/* Date Range */}
            <div className="relative">
                <button
                    onClick={() => { setDateOpen(p => !p); setGranOpen(false) }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-foreground hover:bg-accent transition-colors border border-border"
                >
                    Date Range
                    <span className="text-muted-foreground text-xs">{dateRange}</span>
                    <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${dateOpen ? "rotate-180" : ""}`} />
                </button>
                {dateOpen && (
                    <div className="absolute top-full mt-1 left-0 z-30 w-44 rounded-lg border border-border bg-popover shadow-lg overflow-hidden">
                        {DATE_RANGES.map((d) => (
                            <button
                                key={d}
                                onClick={() => { onDateRangeChange(d); setDateOpen(false) }}
                                className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-accent ${d === dateRange ? "text-foreground font-medium" : "text-muted-foreground"}`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Granularity */}
            <div className="relative">
                <button
                    onClick={() => { setGranOpen(p => !p); setDateOpen(false) }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-foreground hover:bg-accent transition-colors border border-border"
                >
                    Granularity
                    <span className="text-muted-foreground text-xs">{granularity}</span>
                    <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${granOpen ? "rotate-180" : ""}`} />
                </button>
                {granOpen && (
                    <div className="absolute top-full mt-1 left-0 z-30 w-36 rounded-lg border border-border bg-popover shadow-lg overflow-hidden">
                        {GRANULARITIES.map((g) => (
                            <button
                                key={g}
                                onClick={() => { onGranularityChange(g); setGranOpen(false) }}
                                className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-accent ${g === granularity ? "text-foreground font-medium" : "text-muted-foreground"}`}
                            >
                                {g}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Group By chips */}
            {groupBy.map((label) => (
                <div
                    key={label}
                    className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-md text-sm font-medium bg-foreground text-background"
                >
                    <span className="text-xs text-background/60 mr-0.5">Group By</span>
                    {label}
                    <button onClick={() => onRemoveGroupBy(label)} className="ml-1 hover:opacity-70 transition-opacity">
                        <X className="h-3 w-3" />
                    </button>
                </div>
            ))}

            {/* Filter */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors border border-border ml-auto">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filter
            </button>
        </div>
    )
}
