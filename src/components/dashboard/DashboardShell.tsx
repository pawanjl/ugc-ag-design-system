"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/Sidebar"
import { Topbar } from "@/components/dashboard/Topbar"

export function DashboardShell({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 dark selection:bg-[#a855f7]/30">
            <SidebarProvider defaultOpen={true}>
                {/* ── Left sidebar ─────────────────────── */}
                <DashboardSidebar />

                {/* ── Main content area ─────────────────── */}
                <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
                    {/* Sticky top bar */}
                    <Topbar />

                    {/* Scrollable page content */}
                    <main
                        className="flex-1 overflow-y-auto bg-[#0a0a0a] p-6 lg:p-8"
                        style={{ scrollbarGutter: "stable" }}
                    >
                        <div className="mx-auto max-w-6xl space-y-8 pb-12">
                            {children}
                        </div>
                    </main>
                </div>
            </SidebarProvider>
        </div>
    )
}
