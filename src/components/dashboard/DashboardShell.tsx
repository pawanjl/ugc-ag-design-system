"use client"

import * as React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/Sidebar"
import { Topbar } from "@/components/dashboard/Topbar"
import { DockLayout, DockContent, DockPanel } from "@/components/ui/dock-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button/button"
import { SendIcon } from "lucide-react"
import { FaqSection } from "@/components/ds/FaqSection"
import { Divider } from "@/components/ds/Divider"
import { MobileBottomNav } from "@/components/navigation/MobileBottomNav"

export function DashboardShell({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-screen w-full flex flex-col bg-background text-foreground selection:bg-primary/30 overflow-hidden">
            <DockLayout className="flex-1 min-h-0 bg-background">
                {/* ── Main content area (Shrinks when Dock opens) ─────────────────── */}
                <DockContent className="flex flex-row flex-1 min-w-0 overflow-hidden bg-background p-0">
                    <SidebarProvider defaultOpen={true} className="flex-1 min-w-0 w-full">
                        {/* ── Left sidebar ─────────────────────── */}
                        <DashboardSidebar />

                        {/* ── Main Content Area ─────────────────── */}
                        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
                            {/* Sticky top bar */}
                            <Topbar />
                            <Divider />

                            {/* Scrollable page content */}
                            <div className="relative flex-1 min-h-0 overflow-y-auto bg-background styled-scrollbar">
                                <main className="p-6 lg:p-8" style={{ scrollbarGutter: "stable" }}>
                                    <div className="mx-auto max-w-6xl space-y-8 pb-12">
                                        {children}
                                        <FaqSection />
                                    </div>
                                </main>
                            </div>
                        </div>
                    </SidebarProvider>
                </DockContent>
                    
                {/* ── AI Assistant Dock Panel (Slides from Right) ─────────────────── */}
                <DockPanel id="ask" side="right" size={400} className="border-l border-border bg-card">
                    <div className="flex h-full flex-col">
                        {/* Panel Header */}
                        <div className="flex h-14 items-center justify-between border-b border-border px-4 shrink-0">
                            <h2 className="text-sm font-medium text-foreground">Ask AI</h2>
                        </div>
                        
                        {/* Panel Chat Content */}
                        <div className="flex-1 overflow-y-auto p-4 styled-scrollbar">
                            <div className="rounded-lg bg-muted/50 p-4 border border-border">
                                <p className="text-sm text-foreground/80">
                                    Hi! I can help you find resources, analyze your data, or navigate the platform. 
                                    What can I help you with today?
                                </p>
                            </div>
                        </div>
                        
                        {/* Panel Input Area */}
                        <div className="border-t border-border p-4 bg-card shrink-0">
                            <div className="relative">
                                <Input 
                                    placeholder="Ask a question..." 
                                    className="pr-10 bg-muted border-border rounded-full focus-visible:ring-primary/50"
                                />
                                <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="absolute right-1 top-1 h-7 w-7 rounded-full text-muted-foreground hover:text-foreground"
                                    disableScale={true}
                                    disableHover={true}
                                >
                                    <SendIcon className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </DockPanel>
            </DockLayout>
            <MobileBottomNav />
        </div>
    )
}
