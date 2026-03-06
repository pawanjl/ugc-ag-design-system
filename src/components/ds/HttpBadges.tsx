"use client"

import React from "react"
import { cn } from "@/lib/utils"

/**
 * StatusBadge
 *
 * Design token source: Figma node 7:1753 / 7:1776 — HTTP status code pills in the request log table
 *
 * A compact pill displaying an HTTP status code. Automatically applies semantic
 * color variants based on the status range:
 * - 2xx → dark (black bg, white text) — Figma uses #0f0f10 bg
 * - 3xx → blue (adapted)
 * - 4xx → orange/amber (adapted)
 * - 5xx → red (adapted)
 *
 * Props:
 * - code      — HTTP status code number or string (e.g. 200, "404")
 * - variant   — explicit override: 'success' | 'redirect' | 'client-error' | 'server-error' | 'default'
 * - className — additional overrides
 */
export type StatusBadgeVariant =
    | "success"
    | "redirect"
    | "client-error"
    | "server-error"
    | "default"

export interface StatusBadgeProps {
    code: number | string
    variant?: StatusBadgeVariant
    className?: string
}

function inferVariant(code: number | string): StatusBadgeVariant {
    const n = typeof code === "string" ? parseInt(code, 10) : code
    if (n >= 200 && n < 300) return "success"
    if (n >= 300 && n < 400) return "redirect"
    if (n >= 400 && n < 500) return "client-error"
    if (n >= 500) return "server-error"
    return "default"
}

const VARIANT_STYLES: Record<StatusBadgeVariant, string> = {
    "success": "bg-[#0f0f10] text-white border-transparent",
    "redirect": "bg-[#1a3a5c] text-[#93c5fd] border-transparent",
    "client-error": "bg-[#431407] text-[#fb923c] border-transparent",
    "server-error": "bg-[#450a0a] text-[#f87171] border-transparent",
    "default": "bg-[#1a1a1a] text-[rgba(229,229,232,0.7)] border-[#262626]",
}

export function StatusBadge({ code, variant, className }: StatusBadgeProps) {
    const resolved = variant ?? inferVariant(code)
    return (
        <span
            className={cn(
                "inline-flex items-center h-6 px-[11px] py-px rounded-full border text-[12px] font-medium leading-4 tracking-[0.03px] whitespace-nowrap shrink-0",
                VARIANT_STYLES[resolved],
                className
            )}
        >
            {code}
        </span>
    )
}

/**
 * MethodBadge
 *
 * Design token source: Figma node 7:1755 / 7:1778 — HTTP method pills (GET, POST, DELETE…)
 *
 * A compact pill displaying an HTTP method. Muted bg, dark text — matching Figma's
 * rgba(0,0,23,0.04) background for the method pill.
 *
 * Automatically applies color variants per method:
 * - GET    → muted (near-transparent bg, dark text)
 * - POST   → green-tinted
 * - PUT    → blue-tinted
 * - PATCH  → amber-tinted
 * - DELETE → red-tinted
 *
 * Props:
 * - method    — HTTP method string ("GET", "POST", etc.)
 * - className — additional overrides
 */
export interface MethodBadgeProps {
    method: string
    className?: string
}

const METHOD_STYLES: Record<string, string> = {
    GET: "bg-[rgba(229,229,232,0.06)] text-[rgba(229,229,232,0.7)] border-transparent",
    POST: "bg-[#052e16] text-[#4ade80] border-transparent",
    PUT: "bg-[#1e3a5f] text-[#60a5fa] border-transparent",
    PATCH: "bg-[#422006] text-[#fb923c] border-transparent",
    DELETE: "bg-[#450a0a] text-[#f87171] border-transparent",
}

export function MethodBadge({ method, className }: MethodBadgeProps) {
    const styles = METHOD_STYLES[method.toUpperCase()] ?? METHOD_STYLES.GET
    return (
        <span
            className={cn(
                "inline-flex items-center h-6 px-[11px] py-px rounded-full border text-[12px] font-medium leading-4 tracking-[0.03px] whitespace-nowrap shrink-0",
                styles,
                className
            )}
        >
            {method.toUpperCase()}
        </span>
    )
}
