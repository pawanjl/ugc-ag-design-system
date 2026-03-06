"use client"

import React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Breadcrumb
 *
 * Design token source: Figma node 7:1851 — "Developers › Request Log" topbar breadcrumb
 *
 * A slim horizontal breadcrumb trail. Each segment except the last is muted/linked;
 * the last segment is the active page in full-weight text.
 *
 * Props:
 * - items      — array of { label, href? }. Last item is treated as the active page.
 * - className  — additional overrides
 */
export interface BreadcrumbItem {
    label: string
    href?: string
}

export interface BreadcrumbProps {
    items: BreadcrumbItem[]
    className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1.5", className)}>
            {items.map((item, i) => {
                const isLast = i === items.length - 1
                return (
                    <React.Fragment key={item.label}>
                        {i > 0 && (
                            <ChevronRight className="w-4 h-4 text-[#787881] shrink-0" aria-hidden />
                        )}
                        {isLast ? (
                            <span className="text-[14px] font-medium leading-5 text-[#e5e5e8]">
                                {item.label}
                            </span>
                        ) : (
                            <a
                                href={item.href ?? "#"}
                                className="text-[14px] font-medium leading-5 text-[#787881] hover:text-[#e5e5e8] transition-colors"
                            >
                                {item.label}
                            </a>
                        )}
                    </React.Fragment>
                )
            })}
        </nav>
    )
}
