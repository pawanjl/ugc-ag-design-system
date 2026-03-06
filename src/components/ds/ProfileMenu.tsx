"use client"

import React from "react"
import { ArrowLeftRight, LogOut, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * ProfileMenu
 *
 * Design token source: Figma node 10:5545 — Profile bar popup / dropdown
 *
 * A floating frosted-glass dropdown panel that appears when the user clicks
 * their avatar in the topbar. Contains:
 *   1. Credit balance card (Balance · Upgrade CTA)
 *   2. Current workspace card (name · plan · switch button)
 *   3. Grouped navigation menu sections with bottom-border dividers
 *   4. Sign out row
 *
 * Design specs:
 * - Width: 224px
 * - Backdrop: blur(4px), bg rgba(255,255,255,0.9) → adapted to dark: rgba(10,10,10,0.92)
 * - Shadow: layered multi-stop box-shadow
 * - Rounded: 10px outer, 8px inner cards
 * - Menu item: px-12px py-6px, 14px Regular, hover bg rgba(0,0,0,0.04)
 * - Section separator: 1px bottom border rgba(0,0,29,0.1)
 *
 * Props:
 * - workspaceName  — workspace display name
 * - workspacePlan  — plan label ("Free plan", "Starter", etc.)
 * - totalCredits   — total credits number
 * - usedCredits    — credits used (remaining = total - used)
 * - onUpgrade      — Upgrade button click
 * - onSwitchWorkspace — switch workspace button click
 * - sections       — array of menu section groups (each is an array of items)
 * - onSignOut      — sign out click
 * - className      — additional overrides
 */

export interface ProfileMenuItem {
    label: string
    href?: string
    onClick?: () => void
    /** If true, renders a › chevron on the right (sub-menu indicator) */
    hasSubMenu?: boolean
}

export interface ProfileMenuProps {
    workspaceName?: string
    workspacePlan?: string
    totalCredits?: number
    remainingCredits?: number
    onUpgrade?: () => void
    onSwitchWorkspace?: () => void
    sections?: ProfileMenuItem[][]
    onSignOut?: () => void
    className?: string
}

// A single menu item row
function MenuItem({ item }: { item: ProfileMenuItem }) {
    const inner = (
        <div className="flex items-center justify-between px-3 py-[6px] w-full rounded-lg hover:bg-[rgba(229,229,232,0.06)] transition-colors cursor-pointer">
            <span className="text-[14px] font-normal leading-5 text-[#e5e5e8] truncate">{item.label}</span>
            {item.hasSubMenu && (
                <ChevronRight className="w-4 h-4 text-[rgba(229,229,232,0.4)] shrink-0" />
            )}
        </div>
    )

    if (item.href) {
        return <a href={item.href} className="block w-full">{inner}</a>
    }
    return <button onClick={item.onClick} className="block w-full text-left">{inner}</button>
}

export function ProfileMenu({
    workspaceName = "My Workspace",
    workspacePlan = "Free plan",
    totalCredits = 10000,
    remainingCredits = 10000,
    onUpgrade,
    onSwitchWorkspace,
    sections = DEFAULT_SECTIONS,
    onSignOut,
    className,
}: ProfileMenuProps) {
    return (
        <div
            className={cn(
                "w-[224px] rounded-[10px] overflow-hidden",
                "bg-[rgba(15,15,16,0.92)] backdrop-blur-[4px]",
                // layered shadow matching Figma
                "shadow-[0px_0px_0px_1px_rgba(229,229,232,0.08),0px_1px_1px_-0.5px_rgba(0,0,0,0.2),0px_3px_3px_0px_rgba(0,0,0,0.16),0px_6px_6px_0px_rgba(0,0,0,0.12),0px_12px_12px_0px_rgba(0,0,0,0.1),0px_24px_24px_0px_rgba(0,0,0,0.08)]",
                className
            )}
        >
            {/* ── Credit balance card ──────────────────────────────── */}
            <div className="px-1 pt-1 pb-0">
                <div className="bg-[#141414] rounded-lg px-3 py-[10px] border border-[rgba(229,229,232,0.06)] space-y-1.5">
                    {/* Balance row + Upgrade */}
                    <div className="flex items-center justify-between">
                        <span className="text-[14px] font-medium leading-5 text-[#e5e5e8]">Balance</span>
                        <button
                            onClick={onUpgrade}
                            className="h-6 px-1.5 bg-[#e5e5e8] text-[#0a0a0a] text-[12px] font-medium leading-4 rounded-[6px] tracking-[0.03px] hover:bg-white transition-colors"
                        >
                            Upgrade
                        </button>
                    </div>
                    {/* Credits */}
                    <div className="space-y-0.5">
                        <div className="flex items-center justify-between">
                            <span className="text-[13px] font-normal text-[rgba(229,229,232,0.5)] leading-5">Total</span>
                            <span className="text-[13px] font-medium text-[#e5e5e8] leading-5">{totalCredits.toLocaleString()} credits</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[13px] font-normal text-[rgba(229,229,232,0.5)] leading-5">Remaining</span>
                            <span className="text-[13px] font-medium text-[#e5e5e8] leading-5">{remainingCredits.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Workspace card ───────────────────────────────────── */}
            <div className="px-1 py-1 border-b border-[rgba(229,229,232,0.07)]">
                <div className="bg-[#141414] rounded-lg border border-[rgba(229,229,232,0.06)] px-2 pt-2 pb-2">
                    <p className="text-[12px] font-normal text-[rgba(229,229,232,0.4)] leading-4 tracking-[0.03px] px-2 mb-[6px]">
                        Current workspace
                    </p>
                    <div className="flex items-center justify-between px-2 py-[6px]">
                        <div className="min-w-0 flex-1">
                            <p className="text-[14px] font-medium leading-5 text-[#e5e5e8] truncate">{workspaceName}</p>
                            <p className="text-[12px] font-normal leading-4 text-[rgba(229,229,232,0.4)] tracking-[0.03px] truncate">{workspacePlan}</p>
                        </div>
                        <button
                            onClick={onSwitchWorkspace}
                            aria-label="Switch workspace"
                            className="ml-2 shrink-0 size-6 flex items-center justify-center rounded-[6px] bg-[#0a0a0a] border border-[rgba(229,229,232,0.1)] hover:bg-[#1a1a1a] transition-colors"
                        >
                            <ArrowLeftRight className="w-3 h-3 text-[rgba(229,229,232,0.6)]" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Menu sections ────────────────────────────────────── */}
            <div className="py-1">
                {sections.map((group, gi) => (
                    <div
                        key={gi}
                        className={cn(
                            "px-1 py-1",
                            gi < sections.length - 1 && "border-b border-[rgba(229,229,232,0.07)]"
                        )}
                    >
                        {group.map((item) => (
                            <MenuItem key={item.label} item={item} />
                        ))}
                    </div>
                ))}
            </div>

            {/* ── Sign out ─────────────────────────────────────────── */}
            <div className="px-1 pb-1 border-t border-[rgba(229,229,232,0.07)]">
                <button
                    onClick={onSignOut}
                    className="flex items-center gap-[6px] px-3 py-[6px] w-full rounded-lg hover:bg-[rgba(229,229,232,0.06)] transition-colors"
                >
                    <LogOut className="w-[14px] h-[14px] text-[rgba(229,229,232,0.6)] shrink-0" />
                    <span className="text-[14px] font-normal leading-5 text-[#e5e5e8]">Sign out</span>
                </button>
            </div>
        </div>
    )
}

// Default menu sections matching the Figma design
const DEFAULT_SECTIONS: ProfileMenuItem[][] = [
    [
        { label: "Settings" },
        { label: "Subscription" },
        { label: "Pronunciation dictionaries" },
        { label: "Theme", hasSubMenu: true },
    ],
    [
        { label: "Payouts" },
        { label: "Become an affiliate" },
        { label: "Apply for Impact Program" },
        { label: "Usage analytics" },
    ],
    [
        { label: "Voiceover Studio" },
        { label: "AI Speech Classifier" },
        { label: "Docs and resources", hasSubMenu: true },
        { label: "Terms and privacy", hasSubMenu: true },
    ],
]
