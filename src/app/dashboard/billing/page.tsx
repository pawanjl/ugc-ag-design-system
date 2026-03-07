"use client"

import React from "react"
import { SlideUp } from "@/components/animations/slide-up"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { Divider } from "@/components/ds/Divider"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PricingTierCards } from "@/components/ds/billing/PricingTierCards"
import { UsageMeterDashboard } from "@/components/ds/billing/UsageMeterDashboard"
import { OrderHistoryTable } from "@/components/ds/billing/OrderHistoryTable"
import { GSTInvoicePreviewer } from "@/components/ds/billing/GSTInvoicePreviewer"
import { InstantCheckout } from "@/components/ds/billing/InstantCheckout"
import { AffiliateDashboard } from "@/components/ds/billing/AffiliateDashboard"

export default function BillingPage() {
    return (
        <div className="flex flex-col gap-8 pb-20">
            {/* Page Header */}
            <SlideUp className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Billing & Usage</h1>
                <p className="text-muted-foreground">Manage your subscription, view usage, and track your payments.</p>
                <Divider className="mt-2" />
            </SlideUp>

            {/* Usage Overview */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-foreground">Usage Overview</h2>
                <UsageMeterDashboard />
            </section>

            {/* Main Content Tabs */}
            <section className="mt-4">
                <Tabs defaultValue="plans" variant="pill">
                    <TabsList className="mb-6">
                        <TabsTrigger value="plans" layoutId="billing-tabs">Pricing Plans</TabsTrigger>
                        <TabsTrigger value="history" layoutId="billing-tabs">Order History</TabsTrigger>
                        <TabsTrigger value="affiliate" layoutId="billing-tabs">Affiliate</TabsTrigger>
                    </TabsList>

                    <TabsContent value="plans" className="space-y-16 outline-none py-4">
                        <section className="space-y-6">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl font-bold tracking-tight text-foreground">Pick a Plan</h2>
                                <p className="text-sm text-muted-foreground/60">Choose the best plan for your content creation needs.</p>
                            </div>
                            <SlideUp>
                                <PricingTierCards />
                            </SlideUp>
                        </section>
                        
                        <Divider />

                        <section className="space-y-6">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl font-bold tracking-tight text-foreground">Payment Method</h2>
                                <p className="text-sm text-muted-foreground/60">Manage your active subscription and saved payment cards.</p>
                            </div>
                            <SlideUp className="max-w-xl">
                                <InstantCheckout />
                            </SlideUp>
                        </section>
                    </TabsContent>

                    <TabsContent value="history" className="space-y-6 outline-none">
                        <SlideUp className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold tracking-tight text-foreground">Payment History</h2>
                                <GSTInvoicePreviewer />
                            </div>
                            <OrderHistoryTable />
                        </SlideUp>
                    </TabsContent>

                    <TabsContent value="affiliate" className="outline-none">
                        <SlideUp>
                            <h2 className="text-xl font-bold tracking-tight text-foreground mb-4">Affiliate Program</h2>
                            <AffiliateDashboard />
                        </SlideUp>
                    </TabsContent>
                </Tabs>
            </section>
        </div>
    )
}
