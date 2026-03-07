"use client"

import { Card as CardContainer } from "@/components/ds/Card"
import { Card as ShadcnCard, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Bot, Mic, Sparkles, Send, BellRing, Terminal } from "lucide-react"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { SlideUp } from "@/components/animations/slide-up"
import { toast } from "sonner"
import { Button } from "@/components/ui/button/button"
import { Divider } from "@/components/ds/Divider"
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
import { useState } from "react"

export default function DashboardPage() {
    const metrics = [
        { title: "Voice Generations", value: "12,430", change: "+14.2%", icon: Mic },
        { title: "Custom Voices", value: "8", change: "+2", icon: Bot },
        { title: "API Calls", value: "1.2M", change: "+24.5%", icon: Sparkles },
        { title: "Characters used", value: "840K", change: "84% quota", icon: BarChart3 },
    ]

    return (
        <div className="flex flex-col gap-8">
            <SlideUp className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Overview</h1>
                <p className="text-muted-foreground">Welcome back. Here&apos;s what&apos;s happening today.</p>
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

            <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-2">
                <StaggerItem className="col-span-4 block">
                    <CardContainer className="h-full block">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-foreground">Usage Analytics</h3>
                                <div className="flex gap-2">
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => toast.success("Analytics data updated", {
                                            description: "We've fetched the latest usage stats for your account."
                                        })}
                                        className="h-8 rounded-lg"
                                    >
                                        Update
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => toast.error("Failed to sync data", {
                                            description: "Please check your network connection and try again."
                                        })}
                                        className="h-8 rounded-lg"
                                    >
                                        Sync
                                    </Button>
                                </div>
                            </div>
                            <div className="flex h-[300px] items-center justify-center text-muted-foreground border border-dashed border-border rounded-xl bg-muted/20">
                                [Chart Placeholder]
                            </div>
                            
                            <div className="pt-2">
                                <h4 className="text-sm font-medium text-muted-foreground mb-3 px-1">Quick Actions</h4>
                                <div className="flex flex-wrap gap-2">
                                    <Button 
                                        variant="outline" 
                                        className="rounded-xl border-border/60 hover:bg-accent"
                                        leftIcon={<Send className="h-4 w-4" />}
                                        onClick={() => toast("Draft Saved", {
                                            description: "Your changes have been saved to local storage."
                                        })}
                                    >
                                        Save Draft
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        className="rounded-xl border-border/60 hover:bg-accent"
                                        leftIcon={<BellRing className="h-4 w-4" />}
                                        onClick={() => toast.info("System Notification", {
                                            description: "A new security update is available for your workspace."
                                        })}
                                    >
                                        Notifications
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        className="rounded-xl border-border/60 hover:bg-accent"
                                        leftIcon={<Terminal className="h-4 w-4" />}
                                        onClick={() => toast.promise(new Promise(resolve => setTimeout(resolve, 2000)), {
                                            loading: 'Processing request...',
                                            success: 'Request completed successfully',
                                            error: 'Error processing request',
                                        })}
                                    >
                                        Run Task
                                    </Button>

                                    <Modal>
                                        <ModalTrigger asChild>
                                            <Button 
                                                variant="outline" 
                                                className="rounded-xl border-border/60 hover:bg-accent"
                                                leftIcon={<Sparkles className="h-4 w-4" />}
                                            >
                                                Open Modal
                                            </Button>
                                        </ModalTrigger>
                                        <ModalContent>
                                            <ModalHeader>
                                                <ModalTitle>Generic Modal Component</ModalTitle>
                                                <ModalDescription>
                                                    This modal follows your premium design system with 3xl rounded corners and semantic theme colors.
                                                </ModalDescription>
                                            </ModalHeader>
                                            <div className="py-4 text-sm text-foreground/80">
                                                You can place any content here. It automatically supports light and dark themes using your CSS variables.
                                            </div>
                                            <ModalFooter>
                                                <ModalClose asChild>
                                                    <Button variant="outline" className="rounded-full">Close</Button>
                                                </ModalClose>
                                                <Button className="rounded-full">Primary Action</Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </CardContainer>
                </StaggerItem>
                <StaggerItem className="col-span-3 block">
                    <CardContainer className="h-full block">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-lg font-semibold text-foreground">Recent Generations</h3>
                                <p className="text-sm text-muted-foreground">You&apos;ve generated 14 audio files today.</p>
                            </div>
                            <div className="flex h-[350px] items-center justify-center text-muted-foreground border border-dashed border-border rounded-xl bg-muted/20">
                                [List Placeholder]
                            </div>
                        </div>
                    </CardContainer>
                </StaggerItem>
            </StaggerContainer>
        </div>
    )
}
