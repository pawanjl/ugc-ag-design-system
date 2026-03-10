"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { AnalyticsFilterBar } from "@/components/dashboard/analytics/AnalyticsFilterBar"
import { AnalyticsChart } from "@/components/dashboard/analytics/AnalyticsChart"
import { AnalyticsStatsTable } from "@/components/dashboard/analytics/AnalyticsStatsTable"

// ── Tab Data ─────────────────────────────────────────────────────────────────

const TABS = ["API Requests", "Usage", "Webhooks"] as const
type Tab = typeof TABS[number]

// ── Usage Tab (placeholder) ──────────────────────────────────────────────────

function UsageTabContent() {
    return (
        <div className="flex items-center justify-center h-48 rounded-xl border border-dashed border-border text-muted-foreground text-sm">
            Usage metrics coming soon
        </div>
    )
}

// ── Webhooks Tab (placeholder) ───────────────────────────────────────────────

function WebhooksTabContent() {
    return (
        <div className="flex items-center justify-center h-48 rounded-xl border border-dashed border-border text-muted-foreground text-sm">
            Webhook event logs coming soon
        </div>
    )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
    const [activeTab, setActiveTab] = React.useState<Tab>("API Requests")
    const [dateRange, setDateRange] = React.useState("Last week")
    const [granularity, setGranularity] = React.useState("Day")
    const [groupBy, setGroupBy] = React.useState(["Response Code"])

    const removeGroupBy = (label: string) =>
        setGroupBy((prev) => prev.filter((g) => g !== label))

    return (
        <div className="flex flex-col gap-0 -mt-2">
            {/* ── Breadcrumb ──────────────────────────────────────────── */}
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                <span>Analytics</span>
                <span>›</span>
                <span>API Requests</span>
                <span>›</span>
                <span className="text-foreground font-medium">API Requests</span>
            </nav>

            {/* ── Page Header ─────────────────────────────────────────── */}
            <div className="flex items-start justify-between mb-1">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Analytics</h1>
                <div className="flex items-center gap-3">
                    <a
                        href="#"
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        API Pricing
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Documentation
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                </div>
            </div>

            {/* ── Tabs ────────────────────────────────────────────────── */}
            <div className="flex items-end border-b border-border mb-0">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
                            relative px-4 py-2.5 text-sm font-medium transition-colors
                            ${activeTab === tab
                                ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-foreground after:rounded-full"
                                : "text-muted-foreground hover:text-foreground"
                            }
                        `}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* ── Filter Bar ──────────────────────────────────────────── */}
            <AnalyticsFilterBar
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                granularity={granularity}
                onGranularityChange={setGranularity}
                groupBy={groupBy}
                onRemoveGroupBy={removeGroupBy}
            />

            {/* ── Tab Content ─────────────────────────────────────────── */}
            <div className="mt-4 space-y-4">
                {activeTab === "API Requests" && (
                    <>
                        <AnalyticsChart dateRangeLabel={dateRange} />
                        <AnalyticsStatsTable />
                    </>
                )}
                {activeTab === "Usage" && <UsageTabContent />}
                {activeTab === "Webhooks" && <WebhooksTabContent />}
            </div>
        </div>
    )
}
