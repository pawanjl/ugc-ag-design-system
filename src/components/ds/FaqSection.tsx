"use client"

import React, { useState } from "react"
import { ChevronDown, RefreshCcw } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * FaqSection
 *
 * Design token source: Figma node 7:5684
 *
 * A full-width FAQ accordion section with:
 *   - Section heading "Frequently Asked Questions"
 *   - "Ask" ghost-bordered button (top-right)
 *   - List of question accordion items, each separated by a 1px bottom border
 *   - Clicking an item expands its answer panel
 *   - Only one item open at a time (collapse others on open)
 *
 * Design specs (Figma 7:5684):
 * - Container: max-w-[800px], py-[80px] px-content (centered)
 * - Heading: 22.3px Medium, letter-spacing -0.15px, color rgba(229,229,232,0.89)
 * - Ask btn: h-8 px-[11px] rounded-[8px] bordered 13px Medium
 * - Item row: py-[16px] flex items-center justify-between
 * - Question: 14px Medium, color rgba(229,229,232,0.85)
 * - Answer: 14px Regular, color rgba(229,229,232,0.55), pb-[16px]
 * - Divider: border-b border-[rgba(229,229,232,0.08)]
 *
 * Props:
 * - items         — array of { question, answer }. If no answer provided, item is still expandable.
 * - title         — section heading (default: "Frequently Asked Questions")
 * - onAsk         — Ask button click handler
 * - initialOpen   — index of item open by default (-1 for none)
 * - className     — outer container override
 */

export interface FaqItem {
    question: string
    answer?: string
}

export interface FaqSectionProps {
    items?: FaqItem[]
    title?: string
    onAsk?: () => void
    initialOpen?: number
    className?: string
}

const DEFAULT_ITEMS: FaqItem[] = [
    {
        question: "What's the maximum amount of text I can generate?",
        answer: "The character limit depends on your plan. Free users can generate up to 10,000 characters per month, while paid plans offer significantly more.",
    },
    {
        question: "Can the content I generate be used for commercial purposes?",
        answer: "Yes, content generated on paid plans can be used commercially. Free plan usage comes with restrictions — please review our terms of service for details.",
    },
    {
        question: "How do I know how many credits I have remaining?",
        answer: "You can view your remaining credits in the top-right corner of the dashboard, or on the billing page in your account settings.",
    },
    {
        question: "How do I change my subscription plan?",
        answer: "Navigate to Settings → Billing, and click 'Change plan' to upgrade or downgrade at any time.",
    },
    {
        question: "Am I charged for every request?",
        answer: "Credits are deducted for each generation request. Failed requests due to server errors are not charged.",
    },
    {
        question: "What is the billing interval?",
        answer: "Plans are billed monthly on the date you first subscribed.",
    },
    {
        question: "At which point in time can I cancel my subscription?",
        answer: "You can cancel at any time. Your access continues until the end of the current billing period.",
    },
    {
        question: "What happens to my unused credits at the end of the month?",
        answer: "Unused credits do not roll over. They reset at the beginning of each billing cycle.",
    },
    {
        question: "How can I lower the API streaming latency?",
        answer: "Choose a server region closest to your users, and prefer the streaming endpoints. Our latency guide in the docs has more tips.",
    },
    {
        question: "Do you have a pay as you go option?",
        answer: "Yes, you can purchase credit top-ups at any time from the billing page, even without a subscription.",
    },
    {
        question: "Do you offer multi-account management or SSO?",
        answer: "Enterprise plans include SSO and multi-seat management. Contact sales for details.",
    },
    {
        question: "Is there a limit on how many times I can edit / add / remove voices?",
        answer: "Voice library edits are generally unlimited, but the number of saved custom voices depends on your plan tier.",
    },
    {
        question: "What is Professional Voice Cloning?",
        answer: "Professional Voice Cloning (PVC) creates an ultra-realistic clone of a voice from longer audio samples, offering higher fidelity than Instant Voice Cloning.",
    },
]

export function FaqSection({
    items = DEFAULT_ITEMS,
    title = "Frequently Asked Questions",
    onAsk,
    initialOpen = -1,
    className,
}: FaqSectionProps) {
    const [openIndex, setOpenIndex] = useState<number>(initialOpen)

    function toggle(i: number) {
        setOpenIndex((prev) => (prev === i ? -1 : i))
    }

    return (
        <section
            className={cn(
                "w-full flex flex-col items-center py-[80px] px-4",
                className
            )}
        >
            <div className="w-full max-w-[800px] flex flex-col gap-4">
                {/* ── Header row ── */}
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-[22.3px] font-medium leading-[30px] tracking-[-0.15px] text-[rgba(229,229,232,0.89)]">
                        {title}
                    </h2>
                    <button
                        onClick={onAsk}
                        className={cn(
                            "inline-flex items-center gap-1.5 h-8 px-[11px] rounded-[8px]",
                            "border border-[rgba(229,229,232,0.1)] bg-[rgba(229,229,232,0.04)]",
                            "text-[13px] font-medium text-[rgba(229,229,232,0.7)] leading-5",
                            "hover:bg-[rgba(229,229,232,0.08)] hover:text-[rgba(229,229,232,0.9)]",
                            "transition-colors"
                        )}
                    >
                        <RefreshCcw className="w-3.5 h-3.5 opacity-70 shrink-0" />
                        Ask
                    </button>
                </div>

                {/* ── Accordion list ── */}
                <div className="flex flex-col">
                    {items.map((item, i) => {
                        const isOpen = openIndex === i
                        return (
                            <div
                                key={i}
                                className="border-b border-[rgba(229,229,232,0.08)]"
                            >
                                {/* Question trigger */}
                                <button
                                    onClick={() => toggle(i)}
                                    className="w-full flex items-center justify-between py-4 text-left group"
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-[14px] font-medium text-[rgba(229,229,232,0.85)] leading-5 pr-4">
                                        {item.question}
                                    </span>
                                    <ChevronDown
                                        className={cn(
                                            "w-4 h-4 shrink-0 text-[rgba(229,229,232,0.4)] transition-transform duration-200",
                                            isOpen && "rotate-180"
                                        )}
                                    />
                                </button>

                                {/* Answer panel */}
                                <div
                                    className={cn(
                                        "overflow-hidden transition-all duration-200",
                                        isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                                    )}
                                >
                                    {item.answer && (
                                        <p className="text-[14px] font-normal text-[rgba(229,229,232,0.55)] leading-5 pb-4">
                                            {item.answer}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
