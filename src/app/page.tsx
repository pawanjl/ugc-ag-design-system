"use client"

import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Card as CardContainer } from "@/components/ds/Card"
import { BarChart3, Bot, Mic, Sparkles, Plus } from "lucide-react"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { SlideUp } from "@/components/animations/slide-up"
import { Button } from "@/components/ui/button/button"
import { Divider } from "@/components/ds/Divider"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { toast } from "sonner"
import { 
    Modal, 
    ModalContent, 
    ModalDescription, 
    ModalFooter, 
    ModalHeader, 
    ModalTitle, 
    ModalTrigger,
    ModalClose,
} from "@/components/ds/Modal"

export default function Home() {
    const metrics = [
        { title: "Voice Generations", value: "12,430", change: "+14.2%", icon: Mic },
        { title: "Custom Voices", value: "8", change: "+2", icon: Bot },
        { title: "API Calls", value: "1.2M", change: "+24.5%", icon: Sparkles },
        { title: "Characters used", value: "840K", change: "84% quota", icon: BarChart3 },
    ]

    return (
        <DashboardShell>
            <div className="flex flex-col gap-8">
                <SlideUp className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Design System Playground</h1>
                    <p className="text-muted-foreground">A showcase of premium components designed for performance and aesthetics.</p>
                    <Divider className="mt-2" />
                </SlideUp>

                <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {metrics.map((metric, i) => (
                        <StaggerItem key={i}>
                            <CardContainer className="hover:scale-[1.02] cursor-pointer h-full transition-all duration-300 group">
                                <div className="flex flex-col flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-muted-foreground">{metric.title}</span>
                                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                            <metric.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                                    <p className="text-xs text-emerald-500 mt-1">{metric.change}</p>
                                </div>
                            </CardContainer>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                <Divider />

                <SlideUp className="flex flex-col gap-10 mt-4 pb-20">
                    {/* Tabs Section */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">Premium Tabs</h2>
                            <p className="text-muted-foreground">Smooth, text-aware animations built with Radix UI and Framer Motion.</p>
                        </div>
                        
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Pill Variant */}
                            <CardContainer className="flex flex-col gap-6">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-lg font-semibold">Pill Style</h3>
                                    <p className="text-sm text-muted-foreground">Floating background indicator that follows the text.</p>
                                </div>
                                <Tabs defaultValue="account" variant="pill">
                                    <TabsList className="w-full justify-start">
                                        <TabsTrigger value="account" layoutId="pill-hp">Account</TabsTrigger>
                                        <TabsTrigger value="password" layoutId="pill-hp">Password</TabsTrigger>
                                        <TabsTrigger value="settings" layoutId="pill-hp">Settings</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="account" className="p-4 border border-dashed rounded-xl bg-muted/10 h-32">
                                        <p className="text-sm">Manage your profile and account settings here.</p>
                                    </TabsContent>
                                    <TabsContent value="password" className="p-4 border border-dashed rounded-xl bg-muted/10 h-32">
                                        <p className="text-sm">Keep your account secure by rotating passwords.</p>
                                    </TabsContent>
                                    <TabsContent value="settings" className="p-4 border border-dashed rounded-xl bg-muted/10 h-32">
                                        <p className="text-sm">Configure your preferred app notifications.</p>
                                    </TabsContent>
                                </Tabs>
                            </CardContainer>

                            {/* Underline Variant */}
                            <CardContainer className="flex flex-col gap-6">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-lg font-semibold">Underline Style</h3>
                                    <p className="text-sm text-muted-foreground">Minimalist sliding line that matches text width.</p>
                                </div>
                                <Tabs defaultValue="overview" variant="underline">
                                    <TabsList className="gap-8">
                                        <TabsTrigger value="overview" layoutId="underline-hp">Overview</TabsTrigger>
                                        <TabsTrigger value="analytics" layoutId="underline-hp">Analytics</TabsTrigger>
                                        <TabsTrigger value="history" layoutId="underline-hp">History</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="overview" className="p-4 border border-dashed rounded-xl bg-muted/10 h-32">
                                        <p className="text-sm">Summary of your recent activities and stats.</p>
                                    </TabsContent>
                                    <TabsContent value="analytics" className="p-4 border border-dashed rounded-xl bg-muted/10 h-32">
                                        <p className="text-sm">Deep dive into usage metrics and patterns.</p>
                                    </TabsContent>
                                    <TabsContent value="history" className="p-4 border border-dashed rounded-xl bg-muted/10 h-32">
                                        <p className="text-sm">Historical record of all your generated assets.</p>
                                    </TabsContent>
                                </Tabs>
                            </CardContainer>
                        </div>
                    </div>

                    {/* Modals Section */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">Premium Modal</h2>
                            <p className="text-muted-foreground">Radix-based modal with glassmorphism and spring animations.</p>
                        </div>

                        <CardContainer className="flex flex-col gap-6 items-center justify-center py-12 bg-muted/5">
                            <Modal>
                                <ModalTrigger asChild>
                                    <Button size="lg" className="rounded-full px-8 hover:scale-105 transition-transform active:scale-95">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Launch Premium Modal
                                    </Button>
                                </ModalTrigger>
                                <ModalContent>
                                    <ModalHeader>
                                        <ModalTitle>Premium Experience</ModalTitle>
                                        <ModalDescription>
                                            This modal features a custom glassmorphism effect and smooth Framer Motion animations.
                                        </ModalDescription>
                                    </ModalHeader>
                                    <div className="py-6">
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            The design system focuses on high-performance animations and premium aesthetics. 
                                            Every interaction is polished to provide the best user experience.
                                        </p>
                                    </div>
                                    <ModalFooter>
                                        <ModalClose asChild>
                                            <Button variant="ghost" className="rounded-full">Cancel</Button>
                                        </ModalClose>
                                        <ModalClose asChild>
                                            <Button className="rounded-full px-6">Confirm Action</Button>
                                        </ModalClose>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </CardContainer>
                    </div>

                    {/* Toasts Section */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">Interactive Toasts</h2>
                            <p className="text-muted-foreground">Premium notification system powered by Sonner with custom icons.</p>
                        </div>

                        <CardContainer className="flex flex-col gap-6 items-center justify-center py-12 bg-muted/5">
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <Button 
                                    variant="outline" 
                                    onClick={() => toast.success("Changes saved successfully!")}
                                    className="rounded-full px-6"
                                >
                                    Success Toast
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={() => toast.error("An error occurred while saving.")}
                                    className="rounded-full px-6"
                                >
                                    Error Toast
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={() => {
                                        const id = toast.loading("Processing your request...")
                                        setTimeout(() => toast.success("Request completed!", { id }), 2000)
                                    }}
                                    className="rounded-full px-6"
                                >
                                    Loading Toast
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={() => toast.info("New update available for download.")}
                                    className="rounded-full px-6"
                                >
                                    Info Toast
                                </Button>
                            </div>
                        </CardContainer>
                    </div>

                </SlideUp>
            </div>
        </DashboardShell>
    )
}
