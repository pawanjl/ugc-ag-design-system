"use client"

import React from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface UsageItem {
    label: string
    current: number
    limit: number
    unit: string
    color?: string
}

const usageData: UsageItem[] = [
    { label: "Total Characters", current: 45230, limit: 100000, unit: "chars", color: "bg-primary" },
    { label: "API Requests", current: 234, limit: 1000, unit: "reqs", color: "bg-secondary" },
    { label: "PVC Credits", current: 1, limit: 2, unit: "clones", color: "bg-accent" },
]

export function UsageMeterDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
            {usageData.map((item) => {
                const percentage = (item.current / item.limit) * 100
                return (
                    <Card key={item.label} className="bg-card/50 backdrop-blur-sm border-border/10">
                        <CardContent className="p-5 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                                    {item.label}
                                </span>
                                <span className="text-xs font-medium text-primary">
                                    {percentage.toFixed(0)}%
                                </span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold tracking-tight">
                                    {item.current.toLocaleString()}
                                </span>
                                <span className="text-xs text-muted-foreground/50">
                                    / {item.limit.toLocaleString()} {item.unit}
                                </span>
                            </div>
                            <div className="w-full bg-secondary/20 h-1.5 rounded-full overflow-hidden">
                                <div 
                                    className={cn("h-full rounded-full transition-all duration-500", item.color)} 
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
