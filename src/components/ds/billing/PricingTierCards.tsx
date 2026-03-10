"use client"

import React from "react"
import { PricingCard, PricingFeature } from "../PricingCard"
import { cn } from "@/lib/utils"

const FREE_FEATURES: PricingFeature[][] = [
    [
        { label: "10,000 characters / month" },
        { label: "Standard voices" },
    ],
    [
        { label: "3 voices" },
        { label: "1 project" },
    ],
]

const PRO_FEATURES: PricingFeature[][] = [
    [
        { label: "100,000 characters / month" },
        { label: "₹26.40/1000 chars overage" },
    ],
    [
        { label: "All high-quality voices" },
        { label: "10 voices" },
        { label: "5 projects" },
    ],
    [
        { label: "1 PVC included" },
    ],
]

const ENTERPRISE_FEATURES: PricingFeature[][] = [
    [
        { label: "Unlimited characters" },
        { label: "Custom voice cloning" },
    ],
    [
        { label: "Priority rendering" },
        { label: "Professional services" },
        { label: "99.9% Uptime SLA" },
    ],
    [
        { label: "Dedicated Account Manager" },
    ],
]

export function PricingTierCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 py-8">
            <PricingCard
                className="w-full"
                planName="Free"
                price="₹0"
                originalPrice=""
                promoBadge=""
                description="Experiment with the world's most advanced AI voices"
                ctaLabel="Current Plan"
                featureGroups={FREE_FEATURES}
            />
            <PricingCard
                className="w-full"
                planName="Pro"
                price="₹968"
                originalPrice="₹1,936"
                promoBadge="Popular"
                description="For creators making premium content for global audiences"
                ctaLabel="Upgrade"
                highlighted={true}
                featureGroups={PRO_FEATURES}
            />
            <PricingCard
                className="w-full"
                planName="Enterprise"
                price="Custom"
                priceSuffix=""
                originalPrice=""
                promoBadge=""
                description="Scalable solutions for teams and large-scale productions"
                ctaLabel="Contact Sales"
                featureGroups={ENTERPRISE_FEATURES}
            />
        </div>
    )
}
