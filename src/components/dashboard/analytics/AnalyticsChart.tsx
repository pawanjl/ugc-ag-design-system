"use client"

import * as React from "react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"
import { TrendingUp, Download } from "lucide-react"

// ── Mock Data ────────────────────────────────────────────────────────────────

const generateData = () => {
    const data = []
    const start = new Date("2026-03-01T05:30:00")
    for (let i = 0; i <= 7; i++) {
        const d = new Date(start)
        d.setDate(d.getDate() + i)
        const isSpike = i === 5
        data.push({
            date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            "200": isSpike ? 620 : Math.floor(Math.random() * 15),
            "4xx": isSpike ? 34 : Math.floor(Math.random() * 5),
        })
    }
    return data
}

const chartData = generateData()

const totalRequests = chartData.reduce((sum, d) => sum + d["200"] + d["4xx"], 0)

// ── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null
    return (
        <div className="rounded-lg border border-border bg-popover shadow-md px-3 py-2 text-xs space-y-1">
            <p className="font-medium text-foreground mb-1">{label}</p>
            {payload.map((p: any) => (
                <div key={p.dataKey} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                    <span className="text-muted-foreground">{p.dataKey}:</span>
                    <span className="font-semibold text-foreground">{p.value}</span>
                </div>
            ))}
        </div>
    )
}

// ── Main Component ───────────────────────────────────────────────────────────

interface AnalyticsChartProps {
    dateRangeLabel: string
}

export function AnalyticsChart({ dateRangeLabel }: AnalyticsChartProps) {
    const [scale, setScale] = React.useState<"linear" | "log">("linear")

    return (
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">Total Requests</p>
                    <p className="text-3xl font-bold text-foreground tabular-nums">{totalRequests.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setScale(s => s === "linear" ? "log" : "linear")}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors border border-border"
                    >
                        <TrendingUp className="h-3.5 w-3.5" />
                        {scale === "linear" ? "Linear scale" : "Log scale"}
                    </button>
                    <button className="p-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors border border-border">
                        <Download className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>

            {/* Chart */}
            <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                        <CartesianGrid
                            strokeDasharray="0"
                            horizontal={true}
                            vertical={false}
                            stroke="hsl(var(--border))"
                            strokeOpacity={0.7}
                        />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                            axisLine={false}
                            tickLine={false}
                            tickMargin={8}
                        />
                        <YAxis
                            scale={scale}
                            domain={scale === "log" ? ["auto", "auto"] : [0, "auto"]}
                            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                            axisLine={false}
                            tickLine={false}
                            tickMargin={4}
                            width={40}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="200"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, fill: "#3b82f6" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="4xx"
                            stroke="#f97316"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, fill: "#f97316" }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Date range footer */}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border">
                <span>Mar 01, 2026, 05:30 AM</span>
                <span className="text-center">{dateRangeLabel}</span>
                <span>Mar 08, 2026, 05:30 AM</span>
            </div>
        </div>
    )
}
