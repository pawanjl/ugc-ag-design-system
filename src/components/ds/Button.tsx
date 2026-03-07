"use client"

import React, { forwardRef } from "react"
import { cn } from "@/lib/utils"

/**
 * Button
 *
 * Design token source: Figma node 9:4 — "Enhance" / "Generate speech" / topbar buttons
 *
 * A single multi-variant button atom. Covers every button style in the ElevenLabs design system:
 *
 * Variants (maps to what's in Figma):
 * - "primary"   → dark filled (#e5e5e8 bg, #0a0a0a text on dark theme).
 *                 In the Figma light theme: #0f0f10 bg, white text.
 *                 This is "Generate speech" (node 9:99) — the action CTA.
 * - "secondary" → white/dark surface + border. "Enhance" (node 9:92), topbar "Feedback/Docs/Ask".
 * - "ghost"     → no bg, no border, text only. Useful inside list items/nav.
 * - "danger"    → destructive red fill variant (common in DS; not in Figma explicitly
 *                 but required for confirmation dialogs).
 *
 * Sizes:
 * - "sm"  → h-7 (28px), px-2.5, text-12px  — filter-bar / chip buttons
 * - "md"  → h-9 (36px), px-3, text-14px    — default (Enhance, Generate speech, Feedback)
 * - "lg"  → h-10 (40px), px-4, text-14px   — search bar action (Jump to timestamp)
 *
 * Additional:
 * - icon  — optional ReactNode rendered before the label
 * - as    — "button" | "a" — renders as anchor when needed
 * - All native button/anchor props are forwarded.
 *
 * Figma design specs:
 * - Primary:      bg-[#0f0f10] text-white rounded-[10px] px-3 h-9
 * - Secondary:    bg-[#0a0a0a] border border-[rgba(0,0,29,0.15)] rounded-[10px]
 * - Topbar ghost: bg-white border border-[rgba(0,0,29,0.1)] rounded-[9.6px] h-8 px-[11px] text-13px (light variant)
 */

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger"
export type ButtonSize = "sm" | "md" | "lg"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    icon?: React.ReactNode
    loading?: boolean
    asChild?: boolean
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
    sm: "h-7 px-2.5 text-[12px] gap-1.5 rounded-lg",
    md: "h-9 px-3 text-[14px] gap-2 rounded-[10px]",
    lg: "h-10 px-4 text-[14px] gap-2 rounded-xl",
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
    primary:
        "bg-[#e5e5e8] text-[#0a0a0a] border border-transparent hover:bg-white active:bg-[#d4d4d8] disabled:bg-[#2a2a2a] disabled:text-[rgba(229,229,232,0.3)]",
    secondary:
        "bg-[#0a0a0a] text-[#e5e5e8] border border-[rgba(229,229,232,0.1)] hover:bg-[#141414] hover:border-[rgba(229,229,232,0.15)] active:bg-[#0f0f0f] disabled:opacity-40",
    ghost:
        "bg-transparent text-[rgba(229,229,232,0.6)] border border-transparent hover:bg-[#141414] hover:text-[#e5e5e8] active:bg-[#0f0f10] disabled:opacity-40",
    danger:
        "bg-[#450a0a] text-[#f87171] border border-[rgba(248,113,113,0.2)] hover:bg-[#7f1d1d] hover:text-[#fca5a5] active:bg-[#6b1d1d] disabled:opacity-40",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "secondary",
            size = "md",
            icon,
            loading = false,
            disabled,
            className,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={cn(
                    // base
                    "inline-flex items-center justify-center font-medium whitespace-nowrap transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#e5e5e8]/40 cursor-pointer select-none shrink-0",
                    "disabled:cursor-not-allowed",
                    SIZE_CLASSES[size],
                    VARIANT_CLASSES[variant],
                    className
                )}
                {...props}
            >
                {loading ? (
                    <svg
                        className="animate-spin w-4 h-4 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                    </svg>
                ) : (
                    icon && <span className="shrink-0 flex items-center justify-center">{icon}</span>
                )}
                {children && <span className="flex items-center">{children}</span>}
            </button>
        )
    }
)

Button.displayName = "Button"

/**
 * IconButton
 *
 * Square icon-only button. Same variants/sizes as Button but forces equal width/height.
 * Used for the topbar notification bell (node 9:17) and row ⋯ action menu.
 */
export interface IconButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    "aria-label": string
}

const ICON_SIZE_CLASSES: Record<ButtonSize, string> = {
    sm: "size-7 rounded-lg",
    md: "size-9 rounded-[10px]",
    lg: "size-10 rounded-xl",
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ variant = "ghost", size = "md", className, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center font-medium transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#e5e5e8]/40 cursor-pointer shrink-0",
                    "disabled:cursor-not-allowed disabled:opacity-40",
                    ICON_SIZE_CLASSES[size],
                    VARIANT_CLASSES[variant],
                    className
                )}
                {...props}
            >
                {children}
            </button>
        )
    }
)

IconButton.displayName = "IconButton"
