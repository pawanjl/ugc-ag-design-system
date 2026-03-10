"use client"

import * as React from "react"
import { Search } from "lucide-react"

// ── Mock Data ────────────────────────────────────────────────────────────────

const TABLE_DATA = [
    { code: "200", value: 635, color: "#3b82f6", label: "OK" },
    { code: "201", value: 8, color: "#3b82f6", label: "Created" },
    { code: "400", value: 3, color: "#f97316", label: "Bad Request" },
    { code: "401", value: 1, color: "#f97316", label: "Unauthorized" },
    { code: "422", value: 5, color: "#f97316", label: "Unprocessable Entity" },
    { code: "429", value: 2, color: "#eab308", label: "Too Many Requests" },
    { code: "500", value: 0, color: "#ef4444", label: "Internal Server Error" },
]

const TOTAL = TABLE_DATA.reduce((sum, r) => sum + r.value, 0)

// ── Main Component ───────────────────────────────────────────────────────────

export function AnalyticsStatsTable() {
    const [filter, setFilter] = React.useState("")
    const [selected, setSelected] = React.useState<string[]>([])

    const filtered = TABLE_DATA.filter(
        (r) =>
            filter === "" ||
            r.code.includes(filter) ||
            r.label.toLowerCase().includes(filter.toLowerCase())
    )

    const toggleRow = (code: string) =>
        setSelected((prev) =>
            prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
        )

    const allSelected = filtered.length > 0 && filtered.every((r) => selected.includes(r.code))
    const toggleAll = () =>
        setSelected(allSelected ? [] : filtered.map((r) => r.code))

    return (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
            {/* Count header + filter */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border gap-3">
                <div>
                    <p className="text-xs text-muted-foreground">Count</p>
                    <p className="text-2xl font-bold text-foreground tabular-nums">{TOTAL}</p>
                </div>
                <div className="flex-1 max-w-xs relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                    <input
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Filter..."
                        className="w-full pl-8 pr-3 py-1.5 text-sm rounded-md border border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                </div>
            </div>

            {/* Table */}
            <table className="w-full">
                <thead>
                    <tr className="border-b border-border">
                        <th className="w-10 px-4 py-2.5">
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={toggleAll}
                                className="rounded border-border accent-primary"
                            />
                        </th>
                        <th className="text-left px-2 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Response Code
                        </th>
                        <th className="text-right px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Value
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((row) => (
                        <tr
                            key={row.code}
                            className="border-b border-border/50 last:border-0 hover:bg-accent/40 transition-colors cursor-pointer"
                            onClick={() => toggleRow(row.code)}
                        >
                            <td className="px-4 py-2.5">
                                <input
                                    type="checkbox"
                                    checked={selected.includes(row.code)}
                                    onChange={() => toggleRow(row.code)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="rounded border-border accent-primary"
                                />
                            </td>
                            <td className="px-2 py-2.5">
                                <div className="flex items-center gap-2">
                                    <span
                                        className="h-2.5 w-2.5 rounded-sm shrink-0"
                                        style={{ background: row.color }}
                                    />
                                    <span className="text-sm font-mono text-foreground">{row.code}</span>
                                    <span className="text-xs text-muted-foreground">{row.label}</span>
                                </div>
                            </td>
                            <td className="text-right px-4 py-2.5 text-sm font-semibold tabular-nums text-foreground">
                                {row.value}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
