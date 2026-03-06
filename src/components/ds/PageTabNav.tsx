"use client"

import React from "react"
import { cn } from "@/lib/utils"

/**
 * PageTabNav
 *
 * Design token source: Figma node 7:1625 — "Overview · API Keys · Webhooks · Analytics · Request Log" tab bar
 *
 * Horizontal underline-style tab navigation. The active tab gets a solid bottom
 * border and darker text; inactive tabs are muted.
 *
 * Design specs:
 * - Tab height: ~47.5px with bottom border
 * - Active tab: 1.5px bottom border #0f0f10, text #0f0f10 → adapted to #e5e5e8
 * - Inactive: border transparent, text rgba(229,229,232,0.5)
 * - Tab padding: px-3 py-1.5 with rounded-[10px] border on inner element
 *
 * Props:
 * - tabs       — array of { label, value, href? }
 * - active     — current active tab value
 * - onChange   — callback when a tab is clicked
 * - className  — additional overrides
 */
export interface TabItem {
    label: string
    value: string
    href?: string
}

export interface PageTabNavProps {
    tabs: TabItem[]
    active: string
    onChange?: (value: string) => void
    className?: string
}

export function PageTabNav({ tabs, active, onChange, className }: PageTabNavProps) {
    return (
        <nav
            role="tablist"
            aria-label="Page navigation"
            className={cn("flex items-center gap-1.5 border-b border-[#1a1a1a]", className)}
        >
            {tabs.map((tab) => {
                const isActive = tab.value === active
                const Tag = tab.href ? "a" : "button"
                return (
                    <Tag
                        key={tab.value}
                        href={tab.href}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onChange?.(tab.value)}
                        className={cn(
                            "relative flex items-center justify-center pb-[11.5px] pt-1 shrink-0 cursor-pointer bg-transparent border-0 outline-none transition-all duration-150",
                            // active bottom border
                            isActive
                                ? "border-b-[1.5px] border-b-[#e5e5e8] -mb-px"
                                : "border-b-[1.5px] border-b-transparent -mb-px"
                        )}
                    >
                        <span
                            className={cn(
                                "inline-flex items-center px-3 py-[5px] rounded-[10px] text-[14px] font-medium leading-5 transition-colors",
                                isActive
                                    ? "text-[#e5e5e8] bg-[#141414]"
                                    : "text-[rgba(229,229,232,0.5)] hover:text-[#e5e5e8] hover:bg-[#0f0f10]"
                            )}
                        >
                            {tab.label}
                        </span>
                    </Tag>
                )
            })}
        </nav>
    )
}
