"use client"

import React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * PricingCard
 *
 * Design token source: Figma node 7:3886
 *
 * A single pricing plan card. Designed to be used standalone or within a pricing table grid.
 * Contains:
 *   - Plan name + optional promo badge (pill)
 *   - Strikethrough original price + discounted price + /month label
 *   - Short plan description
 *   - CTA button (e.g. "Subscribe")
 *   - Feature rows (icon + label), each separated by a 1px border
 *     Feature groups are separated by a faint section divider
 *
 * Design specs (Figma 7:3886):
 * - Card: bg-white/dark, rounded-[20px], shadow-[...], pt-[24px]
 * - Plan name: 18px Medium, letter-spacing -0.045px
 * - Promo badge: pill bg-[#defce9] (green tint), text-[#052e16] 12px Medium, rounded-full h-6
 * - Original price: 18px Bold, line-through, color #5b5b64 (muted)
 * - Discounted price: 24px Bold, letter-spacing -0.15px
 * - /month suffix: 16px Regular
 * - Description: 16px Regular, color rgba(0,0,17,0.53) → dark: rgba(229,229,232,0.45)
 * - Subscribe btn: bg-[#0f0f10] text-white h-9 rounded-[10px] 14px Medium full-width
 * - Feature row: h-[44px] border-b/t 1px border, icon-left + label-right, 14px Regular
 * - Feature icon: size-4, check SVG mark
 *
 * Props:
 * - planName          — plan display name
 * - promoBadge        — optional promo badge text (e.g. "First month 50% off")
 * - originalPrice     — price before discount (string with currency symbol)
 * - price             — current plan price (string with currency symbol)
 * - priceSuffix       — "/month" etc.
 * - description       — short plan tagline
 * - ctaLabel          — CTA button label (default: "Subscribe")
 * - onCta             — CTA button handler
 * - features          — array of feature rows: { label, subLabel? }
 *                       Grouped arrays → renders a section divider between groups
 * - highlighted       — renders the card with a highlighted border style
 * - className         — outer override
 */

export interface PricingFeature {
    label: string
    subLabel?: string
    available?: boolean
}

export interface PricingCardProps {
    planName?: string
    promoBadge?: string
    originalPrice?: string
    price?: string
    priceSuffix?: string
    description?: string
    ctaLabel?: string
    onCta?: () => void
    featureGroups?: PricingFeature[][]
    highlighted?: boolean
    className?: string
}

const DEFAULT_FEATURE_GROUPS: PricingFeature[][] = [
    [
        { label: "100,000 characters / month" },
        { label: "₹26.40/1000 chars overage" },
    ],
    [
        { label: "100,000 credits (~100 min)" },
        { label: "₹26.40/1000 credits overage" },
        { label: "100,000 credits (~200 min)" },
        { label: "₹13.20/1000 credits overage" },
        { label: "5 voices" },
        { label: "5 projects" },
    ],
    [
        { label: "4 hours 53 minutes audio" },
        { label: "₹396 per hour overage" },
    ],
    [
        { label: "62 hours 51 minutes audio" },
        { label: "₹30.80 per hour" },
        { label: "₹42.24/hour peak" },
    ],
    [
        { label: "1 PVC included" },
    ],
    [
        { label: "1,000 requests/min API limit" },
    ],
]

export function PricingCard({
    planName = "Creator",
    promoBadge = "First month 50% off",
    originalPrice = "₹1,936",
    price = "₹968",
    priceSuffix = "/month",
    description = "For creators making premium content for global audiences",
    ctaLabel = "Subscribe",
    onCta,
    featureGroups = DEFAULT_FEATURE_GROUPS,
    highlighted = false,
    className,
}: PricingCardProps) {
    return (
        <div
            className={cn(
                "relative flex flex-col w-full rounded-[20px] pt-6 overflow-hidden",
                "bg-card/95 backdrop-blur-sm",
                highlighted
                    ? "ring-2 ring-primary/50 shadow-[0px_0px_0px_1px_rgba(var(--primary),0.2),0px_8px_24px_rgba(0,0,0,0.4)]"
                    : "shadow-[0px_1px_3px_0px_rgba(0,0,0,0.3),0px_1px_2px_-1px_rgba(0,0,0,0.2)] ring-1 ring-border/10",
                className
            )}
        >
            {/* ── Header / sticky ──────────────────────────────── */}
            <div className="sticky top-0 z-10 flex flex-col gap-3 px-5 bg-card/95 pb-1">
                {/* Plan name + badge */}
                <div className="flex items-center justify-between">
                    <h3 className="text-[18px] font-medium leading-[26px] tracking-[-0.045px] text-foreground/90">
                        {planName}
                    </h3>
                    {promoBadge && (
                        <span
                            className={cn(
                                "inline-flex items-center h-6 px-[11px] rounded-full",
                                "bg-[rgba(5,46,22,0.6)] border border-[rgba(34,197,94,0.2)]",
                                "text-[12px] font-medium tracking-[0.03px] text-[rgb(74,222,128)]"
                            )}
                        >
                            {promoBadge}
                        </span>
                    )}
                </div>

                {/* Price row */}
                <div className="flex items-end gap-2">
                    {originalPrice && (
                        <span className="text-[18px] font-bold leading-[26px] tracking-[-0.045px] text-muted-foreground/40 line-through">
                            {originalPrice}
                        </span>
                    )}
                    <div className="flex items-end text-foreground/90">
                        <span className="text-[24px] font-bold leading-[30px] tracking-[-0.15px]">{price}</span>
                        <span className="text-[16px] font-normal leading-[24px]">{priceSuffix}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-[16px] font-normal leading-6 text-muted-foreground/50">
                    {description}
                </p>

                {/* CTA */}
                <div className="pt-1 pb-3">
                    <button
                        onClick={onCta}
                        className={cn(
                            "w-full h-9 rounded-[10px] px-3",
                            "bg-foreground/90 hover:bg-foreground",
                            "text-[14px] font-medium text-background leading-5",
                            "transition-colors"
                        )}
                    >
                        {ctaLabel}
                    </button>
                </div>
            </div>

            {/* ── Feature rows ─────────────────────────────────── */}
            <div className="flex flex-col px-5 pb-6">
                {featureGroups.map((group, gi) => (
                    <React.Fragment key={gi}>
                        {gi > 0 && (
                            <div className="h-px bg-border/10 my-1" />
                        )}
                        {group.map((feat, fi) => (
                            <div
                                key={fi}
                                className={cn(
                                    "flex items-start gap-3 py-3",
                                    fi < group.length - 1 && "border-b border-border/5"
                                )}
                            >
                                <Check className="w-4 h-4 shrink-0 text-primary mt-0.5" />
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[14px] font-normal leading-5 text-foreground/80">
                                        {feat.label}
                                    </span>
                                    {feat.subLabel && (
                                        <span className="text-[12px] text-muted-foreground/50 leading-4">{feat.subLabel}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}
