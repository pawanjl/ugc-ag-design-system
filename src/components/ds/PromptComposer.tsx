"use client"

import React, { useRef, useEffect } from "react"
import { ArrowUp, Layers, Clock, AlignLeft } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * PromptComposer (ChatBox)
 *
 * Design token source: Figma node 10:5163
 *
 * A floating frosted-glass prompt input card used for AI music / content generation.
 * Contains:
 *   - Auto-growing textarea for the prompt text
 *   - Row of control combobox-style chips (variants count, duration, lyrics mode)
 *   - Credits-per-minute pill indicator on the right
 *   - Circular send/generate button
 *   - Optional disclaimer text below the card (e.g. "For downloading… upgrade")
 *
 * Design specs (Figma 10:5163):
 * - Card: rounded-[20px], backdrop-blur(6px), bg rgba(255,255,255,0.9) → dark: rgba(15,15,16,0.92)
 * - Shadow: layered multi-stop
 * - Textarea: 16px Regular, placeholder color rgba(229,229,232,0.35)
 * - Control chip: h-8 pl-[6px] pr-[8px] rounded-[10px], text 14px Medium, muted color
 * - Credits pill: h-9 rounded-[40px] bg rgba(229,229,232,0.04), icon + text + send circle btn
 * - Send button: size-9 rounded-full bg-[#a6a6ae] → active: bg-[#e5e5e8]
 *
 * Props:
 * - value          — controlled textarea value
 * - onChange       — textarea change handler
 * - onSubmit       — called when send button is clicked (or Cmd+Enter)
 * - placeholder    — textarea placeholder text
 * - disabled       — disables input + send btn
 * - credits        — credits cost string shown in pill (e.g. "900 credits/min")
 * - controls       — array of control chip configs { icon, label, onClick }
 * - disclaimer     — optional disclaimer text (supports { text, linkLabel, onLinkClick })
 * - className      — additional overrides on the outer wrapper
 */

export interface ComposerControl {
    icon: React.ReactNode
    label: string
    onClick?: () => void
}

export interface PromptComposerProps {
    value?: string
    onChange?: (value: string) => void
    onSubmit?: (value: string) => void
    placeholder?: string
    disabled?: boolean
    credits?: string
    controls?: ComposerControl[]
    disclaimer?: {
        text: string
        linkLabel?: string
        onLinkClick?: () => void
    }
    className?: string
}

const DEFAULT_CONTROLS: ComposerControl[] = [
    { icon: <Layers className="w-5 h-5" />, label: "2" },
    { icon: <Clock className="w-5 h-5" />, label: "Auto" },
    { icon: <AlignLeft className="w-5 h-5" />, label: "Auto" },
]

export function PromptComposer({
    value = "",
    onChange,
    onSubmit,
    placeholder = "Compose a melancholic post-rock instrumental…",
    disabled = false,
    credits = "900 credits/min",
    controls = DEFAULT_CONTROLS,
    disclaimer,
    className,
}: PromptComposerProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // Auto-resize textarea
    useEffect(() => {
        const el = textareaRef.current
        if (!el) return
        el.style.height = "auto"
        el.style.height = `${el.scrollHeight}px`
    }, [value])

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            e.preventDefault()
            onSubmit?.(value)
        }
    }

    const hasContent = value.trim().length > 0

    return (
        <div className={cn("flex flex-col items-center w-full max-w-[680px]", className)}>
            {/* ── Floating card ──────────────────────────────────────── */}
            <div
                className={cn(
                    "w-full rounded-[20px] overflow-hidden",
                    "bg-[rgba(15,15,16,0.92)] backdrop-blur-[6px]",
                    "shadow-[0px_0px_0px_1px_rgba(229,229,232,0.08),0px_1px_1px_-0.5px_rgba(0,0,0,0.2),0px_3px_3px_-1.5px_rgba(0,0,0,0.16),0px_6px_6px_-3px_rgba(0,0,0,0.12),0px_12px_12px_-6px_rgba(0,0,0,0.1),0px_24px_24px_-12px_rgba(0,0,0,0.08)]"
                )}
            >
                {/* ── Textarea area ──────────────────────────────────── */}
                <div className="px-5 pt-3 pb-0">
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={(e) => onChange?.(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                        placeholder={placeholder}
                        rows={2}
                        className={cn(
                            "w-full bg-transparent resize-none outline-none",
                            "text-[16px] font-normal leading-6 text-[rgba(229,229,232,0.9)]",
                            "placeholder:text-[rgba(229,229,232,0.35)]",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            "min-h-[56px] max-h-[200px] overflow-y-auto"
                        )}
                    />
                </div>

                {/* ── Bottom controls row ─────────────────────────────── */}
                <div className="flex items-center justify-between px-[10px] pb-[10px] pt-0">
                    {/* Left: control chips */}
                    <div className="flex items-center gap-1">
                        {controls.map((ctrl, i) => (
                            <button
                                key={i}
                                onClick={ctrl.onClick}
                                disabled={disabled}
                                className={cn(
                                    "flex items-center gap-0 h-8 pl-[6px] pr-2 rounded-[10px]",
                                    "text-[14px] font-medium text-[rgba(229,229,232,0.5)]",
                                    "hover:bg-[rgba(229,229,232,0.06)] hover:text-[rgba(229,229,232,0.8)]",
                                    "transition-colors disabled:cursor-not-allowed"
                                )}
                            >
                                <span className="shrink-0 text-[rgba(229,229,232,0.4)]">{ctrl.icon}</span>
                                <span className="ml-0.5 leading-5 whitespace-nowrap">{ctrl.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Right: credits pill + send button */}
                    <div className="flex items-center h-9 rounded-[40px] bg-[rgba(229,229,232,0.04)] overflow-hidden">
                        <div className="flex items-center gap-1 pl-[10px] pr-2 py-2">
                            <span className="text-[rgba(229,229,232,0.4)] shrink-0">
                                {/* credit coin icon approx */}
                                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18" aria-hidden>
                                    <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.2" />
                                    <text x="9" y="13" textAnchor="middle" fontSize="8" fill="currentColor" fontWeight="500">$</text>
                                </svg>
                            </span>
                            <span className="text-[14px] font-medium text-[rgba(229,229,232,0.5)] leading-5 whitespace-nowrap">
                                {credits}
                            </span>
                        </div>
                        <button
                            onClick={() => onSubmit?.(value)}
                            disabled={disabled}
                            aria-label="Generate"
                            className={cn(
                                "size-9 shrink-0 rounded-full flex items-center justify-center transition-colors",
                                hasContent
                                    ? "bg-[#e5e5e8] hover:bg-white"
                                    : "bg-[rgba(229,229,232,0.2)] hover:bg-[rgba(229,229,232,0.3)]",
                                "disabled:cursor-not-allowed disabled:opacity-50"
                            )}
                        >
                            <ArrowUp className={cn("w-4 h-4", hasContent ? "text-[#0a0a0a]" : "text-[rgba(229,229,232,0.5)]")} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Disclaimer text ────────────────────────────────────── */}
            {disclaimer && (
                <p className="mt-3 text-[12px] font-medium text-[rgba(229,229,232,0.4)] tracking-[0.03px] text-center">
                    {disclaimer.text}
                    {disclaimer.linkLabel && (
                        <>
                            {" "}
                            <button
                                onClick={disclaimer.onLinkClick}
                                className="underline hover:text-[rgba(229,229,232,0.7)] transition-colors"
                            >
                                {disclaimer.linkLabel}
                            </button>
                            {" to a paid plan."}
                        </>
                    )}
                </p>
            )}
        </div>
    )
}
