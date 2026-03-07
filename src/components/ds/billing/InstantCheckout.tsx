"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ds/Button"
import { CreditCard, ShieldCheck } from "lucide-react"

export function InstantCheckout() {
    return (
        <Card className="bg-card/50 backdrop-blur-sm border-border/10">
            <CardHeader className="p-5">
                <CardTitle className="text-lg font-bold">Instant Checkout</CardTitle>
                <CardDescription className="text-muted-foreground/50">
                    Quickly upgrade or add credits to your account.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-4">
                <div className="p-4 rounded-[12px] bg-secondary/10 border border-border/5 flex items-center gap-4">
                    <div className="h-9 w-12 rounded-md bg-[#1a1a1a] flex items-center justify-center border border-border/10 shrink-0">
                        <span className="text-[10px] font-black tracking-widest text-muted-foreground/50 uppercase">Visa</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold tracking-tight">•••• •••• •••• 4242</p>
                        <p className="text-xs text-muted-foreground/40 font-medium">Expires 12/25</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs h-7 px-2 hover:bg-secondary/20">Change</Button>
                </div>

                <div className="space-y-3 py-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground/60 font-medium">Pro Plan (Monthly)</span>
                        <span className="font-semibold">₹968.00</span>
                    </div>
                    <div className="flex justify-between items-baseline text-lg font-black border-t border-border/10 pt-3">
                        <span className="text-foreground/90">Total Due</span>
                        <span className="text-primary tracking-tighter">₹968.00</span>
                    </div>
                </div>

                <Button className="w-full h-12 rounded-[14px] gap-3 font-bold text-base bg-primary hover:scale-[0.98] transition-transform shadow-lg shadow-primary/10">
                    <CreditCard className="w-5 h-5" />
                    Pay Now
                </Button>

                <div className="flex items-center justify-center gap-1.5 pt-2 opacity-60">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[11px] font-medium tracking-wide">Securely encrypted checkout</span>
                </div>
            </CardContent>
        </Card>
    )
}
