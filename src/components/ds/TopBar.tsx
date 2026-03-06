"use client"

import React from "react"
import { PanelLeft, ChevronRight, FolderOpen, Bell, RefreshCcw } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * TopBar
 *
 * Design token source: Figma node 10:5104 — App header (excluding sidebar)
 *
 * A sticky frosted-glass header strip that sits at the top of the main content area.
 * Contains:
 *   - Sidebar collapse toggle button (left)
 *   - Breadcrumb navigation (left)
 *   - Right action bar: Feedback, Docs, Ask ghost-bordered buttons
 *                       + Files, Notifications icon buttons
 *                       + Avatar / profile button with credit-usage ring indicator
 *
 * Design specs (Figma 10:5104):
 * - Height: 50px (h-[50px])
 * - Backdrop: blur(4px), bg rgba(255,255,255,0.9) → dark: rgba(10,10,10,0.85)
 * - Bottom border: 1px solid rgba(0,0,29,0.08)
 * - Sidebar toggle: size-8 rounded-[10px] ghost hover
 * - Breadcrumb: Inter Medium 14px, muted ancestors, active dark
 * - Action buttons: h-8 px-[11px] rounded-[9.6px] border border-[rgba(229,229,232,0.1)] 13px Medium
 * - Icon buttons: size-8 rounded-[9.6px] bordered
 * - Avatar: 32px circle, percentage text in center, wrapping ring SVG
 *
 * Props:
 * - breadcrumbs       — array of { label, href? }. Last one is current (no link).
 * - onToggleSidebar   — handler for sidebar toggle button
 * - onFeedback        — Feedback button handler
 * - onDocs            — Docs link href or handler
 * - onAsk             — Ask button handler
 * - onFiles           — Files icon button handler
 * - onNotifications   — Notifications button handler
 * - onProfile         — Profile/avatar button handler
 * - avatarSrc         — optional avatar image URL
 * - avatarLabel       — fallback label in avatar circle (e.g. "RB" initials or "0%")
 * - creditPercentage  — 0-100, shown in ring indicator (renders as "XX%")
 * - className         — additional overrides
 */

export interface BreadcrumbItem {
    label: string
    href?: string
}

export interface TopBarProps {
    breadcrumbs?: BreadcrumbItem[]
    onToggleSidebar?: () => void
    onFeedback?: () => void
    docsHref?: string
    onAsk?: () => void
    onFiles?: () => void
    onNotifications?: () => void
    onProfile?: () => void
    avatarSrc?: string
    avatarLabel?: string
    creditPercentage?: number
    className?: string
}

/** Bordered pill / ghost button used for Feedback / Docs / Ask */
function HeaderAction({
    href,
    onClick,
    children,
    className,
}: {
    href?: string
    onClick?: () => void
    children: React.ReactNode
    className?: string
}) {
    const base = cn(
        "inline-flex items-center justify-center h-8 px-[11px] rounded-[9.6px]",
        "border border-[rgba(229,229,232,0.1)] bg-[rgba(229,229,232,0.04)]",
        "text-[13px] font-medium text-[rgba(229,229,232,0.7)] leading-5 whitespace-nowrap",
        "hover:bg-[rgba(229,229,232,0.08)] hover:text-[rgba(229,229,232,0.9)]",
        "transition-colors",
        className
    )
    if (href) return <a href={href} className={base}>{children}</a>
    return <button onClick={onClick} className={base}>{children}</button>
}

/** Square icon-only bordered button */
function IconAction({
    onClick,
    children,
    label,
    className,
}: {
    onClick?: () => void
    children: React.ReactNode
    label: string
    className?: string
}) {
    return (
        <button
            onClick={onClick}
            aria-label={label}
            className={cn(
                "inline-flex items-center justify-center size-8 rounded-[9.6px] shrink-0",
                "border border-[rgba(229,229,232,0.1)] bg-[rgba(229,229,232,0.04)]",
                "text-[rgba(229,229,232,0.6)]",
                "hover:bg-[rgba(229,229,232,0.08)] hover:text-[rgba(229,229,232,0.8)]",
                "transition-colors",
                className
            )}
        >
            {children}
        </button>
    )
}

export function TopBar({
    breadcrumbs = [],
    onToggleSidebar,
    onFeedback,
    docsHref = "#",
    onAsk,
    onFiles,
    onNotifications,
    onProfile,
    avatarSrc,
    avatarLabel = "0%",
    creditPercentage = 0,
    className,
}: TopBarProps) {
    return (
        <header
            className={cn(
                "w-full h-[50px] shrink-0",
                "flex items-center gap-2 px-[10px]",
                "bg-[rgba(10,10,10,0.85)] backdrop-blur-[4px]",
                "border-b border-[rgba(229,229,232,0.08)]",
                className
            )}
        >
            {/* ── Sidebar toggle ──────────────────────────────────── */}
            <button
                onClick={onToggleSidebar}
                aria-label="Toggle sidebar"
                className="shrink-0 size-8 flex items-center justify-center rounded-[10px] text-[rgba(229,229,232,0.6)] hover:bg-[rgba(229,229,232,0.06)] hover:text-[rgba(229,229,232,0.9)] transition-colors"
            >
                <PanelLeft className="w-5 h-5" />
            </button>

            {/* ── Breadcrumb ──────────────────────────────────────── */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-[6px] min-w-0 flex-1 overflow-hidden">
                {breadcrumbs.map((crumb, i) => {
                    const isLast = i === breadcrumbs.length - 1
                    return (
                        <React.Fragment key={crumb.label}>
                            {i > 0 && (
                                <ChevronRight className="w-[14px] h-[14px] shrink-0 text-[rgba(229,229,232,0.3)]" />
                            )}
                            {isLast ? (
                                <span className="text-[14px] font-medium text-[rgba(229,229,232,0.85)] truncate">
                                    {crumb.label}
                                </span>
                            ) : (
                                <a
                                    href={crumb.href ?? "#"}
                                    className="text-[14px] font-medium text-[rgba(229,229,232,0.45)] hover:text-[rgba(229,229,232,0.7)] transition-colors truncate"
                                >
                                    {crumb.label}
                                </a>
                            )}
                        </React.Fragment>
                    )
                })}
            </nav>

            {/* ── Right action strip ──────────────────────────────── */}
            <div className="flex items-center gap-2 shrink-0 ml-auto">
                <HeaderAction onClick={onFeedback}>Feedback</HeaderAction>
                <HeaderAction href={docsHref}>Docs</HeaderAction>
                <HeaderAction onClick={onAsk}>
                    <RefreshCcw className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                    Ask
                </HeaderAction>

                <IconAction onClick={onFiles} label="Files">
                    <FolderOpen className="w-4 h-4" />
                </IconAction>

                <IconAction onClick={onNotifications} label="Notifications">
                    <Bell className="w-4 h-4" />
                </IconAction>

                {/* Avatar / profile with credit ring */}
                <button
                    onClick={onProfile}
                    aria-label="Your profile"
                    className="relative size-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                    {/* Circular progress ring (SVG) */}
                    <svg
                        className="absolute inset-0 w-full h-full -rotate-90"
                        viewBox="0 0 32 32"
                        fill="none"
                        aria-hidden
                    >
                        <circle cx="16" cy="16" r="14" stroke="rgba(229,229,232,0.08)" strokeWidth="2" />
                        <circle
                            cx="16"
                            cy="16"
                            r="14"
                            stroke="rgba(229,229,232,0.5)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 14}`}
                            strokeDashoffset={`${2 * Math.PI * 14 * (1 - creditPercentage / 100)}`}
                        />
                    </svg>
                    {/* Avatar image or initials */}
                    {avatarSrc ? (
                        <img
                            src={avatarSrc}
                            alt="Profile"
                            className="size-[26px] rounded-full object-cover"
                        />
                    ) : (
                        <div className="size-[26px] rounded-full bg-[rgba(229,229,232,0.1)] flex items-center justify-center">
                            <span className="text-[8px] font-semibold text-[rgba(229,229,232,0.7)]">{avatarLabel}</span>
                        </div>
                    )}
                </button>
            </div>
        </header>
    )
}
