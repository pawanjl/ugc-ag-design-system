"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ds/Button"
import { Users, TrendingUp, Copy, ExternalLink } from "lucide-react"

export function AffiliateDashboard() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-card/50 backdrop-blur-sm border-border/10">
                    <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Total Earnings
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">₹12,450.00</div>
                        <p className="text-[10px] text-green-500 font-medium">+15% from last month</p>
                    </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/10">
                    <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Active Referrals
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-[10px] text-muted-foreground/60">3 new this week</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-border/10">
                <CardHeader className="p-5 pb-2">
                    <CardTitle className="text-lg font-bold">Referral Program</CardTitle>
                    <CardDescription className="text-muted-foreground/50">
                        Invite your friends and earn 20% commission on every payment they make.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-5 pt-0 space-y-4">
                    <div className="flex gap-2">
                        <div className="flex-1 h-10 px-3 rounded-lg bg-[#111] border border-border/10 flex items-center text-sm text-muted-foreground/80 truncate">
                            https://elevenlabs.io/?from=bajrangi_4242
                        </div>
                        <Button variant="secondary" className="h-10 px-3 gap-2">
                            <Copy className="w-4 h-4" />
                            Copy
                        </Button>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-primary font-medium hover:underline cursor-pointer">
                        View Program Terms
                        <ExternalLink className="w-3 h-3" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
