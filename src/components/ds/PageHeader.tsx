"use client"

import React from "react"
import { cn } from "@/lib/utils"

/**
 * PageHeader
 *
 * Design token source: Figma node 1:69–1:79 — "My Workspace / Good morning, Ricky"
 *
 * Two-line page heading pattern used at the top of dashboard content areas.
 * Shows an optional muted eyebrow label above a large personalized heading.
 *
 * Props:
 * - eyebrow   — small muted label above the title (e.g. "My Workspace")
 * - title     — large heading text (e.g. "Good morning, Ricky")
 * - className — additional class overrides
 */
export interface PageHeaderProps {
    eyebrow?: string
    title: string
    className?: string
}

export function PageHeader({ eyebrow, title, className }: PageHeaderProps) {
    return (
        <div className={cn("flex flex-col gap-0.5", className)}>
            {eyebrow && (
                <p className="text-sm font-medium text-[rgba(229,229,232,0.5)] leading-5">
                    {eyebrow}
                </p>
            )}
            <h1
                className="text-[26px] font-medium leading-9 tracking-[-0.21px] text-[rgba(229,229,232,0.9)]"
            >
                {title}
            </h1>
        </div>
    )
}
