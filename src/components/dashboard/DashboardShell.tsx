"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/Sidebar"
import { Topbar } from "@/components/dashboard/Topbar"
import { PlatformProvider, usePlatform } from "@/components/dashboard/platform-context"

function DashboardShellInner({ children }: { children: React.ReactNode }) {
    const { platform } = usePlatform()

    return (
        <div
            className="min-h-screen bg-(--bg-shell) selection:bg-[#a855f7]/30"
            data-platform={platform}
        >
            <SidebarProvider defaultOpen={true}>
                {/* ── Left sidebar ─────────────────────── */}
                <DashboardSidebar />

                {/* ── Main content area ─────────────────── */}
                <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
                    {/* Sticky top bar */}
                    <Topbar />

                    {/* Scrollable page content */}
                    <main
                        className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8"
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

export function DashboardShell({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <PlatformProvider>
            <DashboardShellInner>{children}</DashboardShellInner>
        </PlatformProvider>
    )
}
