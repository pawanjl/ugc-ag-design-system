import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Card as PremiumCard } from "@/components/ds/Card"
import { BarChart3, Bot, Mic, Sparkles } from "lucide-react"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { SlideUp } from "@/components/animations/slide-up"
import { toast } from "sonner"
import { Button } from "@/components/ui/button/button"
import { Divider } from "@/components/ds/Divider"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
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
                <p className="text-muted-foreground">Welcome back. Here's what's happening today.</p>
            </SlideUp>

            <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric, i) => (
                    <StaggerItem key={i}>
                        <Card className="bg-card border-border rounded-xl hover:bg-accent/50 hover:scale-[1.02] shadow-sm transition-all duration-300 group cursor-pointer h-full">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                                <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center group-hover:bg-[#a855f7]/10 transition-colors">
                                    <metric.icon className="h-4 w-4 text-muted-foreground group-hover:text-[#a855f7] transition-colors" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-card-foreground">{metric.value}</div>
                                <p className="text-xs text-emerald-500 mt-1">{metric.change}</p>
                            </CardContent>
                        </Card>
                    </StaggerItem>
                ))}
            </StaggerContainer>

            <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-2">
                {/* ... existing cells ... */}
            </StaggerContainer>

            <SlideUp className="flex flex-col gap-6 mt-4 pb-20">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">Premium Tabs</h2>
                    <p className="text-muted-foreground">Smooth, context-aware animations built with Radix UI and Framer Motion.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Pill Variant */}
                    <PremiumCard className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-semibold">Pill Style</h3>
                            <p className="text-sm text-muted-foreground">Floating background indicator that follows the text.</p>
                        </div>
                        <Tabs defaultValue="account" variant="pill">
                            <TabsList className="w-full justify-start">
                                <TabsTrigger value="account" layoutId="pill-indicator">Account</TabsTrigger>
                                <TabsTrigger value="password" layoutId="pill-indicator">Password</TabsTrigger>
                                <TabsTrigger value="settings" layoutId="pill-indicator">Settings</TabsTrigger>
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
                    </PremiumCard>

                    {/* Underline Variant */}
                    <PremiumCard className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-semibold">Underline Style</h3>
                            <p className="text-sm text-muted-foreground">Minimalist sliding line for clean dashboards.</p>
                        </div>
                        <Tabs defaultValue="overview" variant="underline">
                            <TabsList className="gap-8">
                                <TabsTrigger value="overview" layoutId="underline-indicator">Overview</TabsTrigger>
                                <TabsTrigger value="analytics" layoutId="underline-indicator">Analytics</TabsTrigger>
                                <TabsTrigger value="history" layoutId="underline-indicator">History</TabsTrigger>
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
                    </PremiumCard>

                    {/* Standard/Default Variant */}
                    <PremiumCard className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-semibold">Default Style</h3>
                            <p className="text-sm text-muted-foreground">Standard inset background indicator.</p>
                        </div>
                        <Tabs defaultValue="all" variant="default">
                            <TabsList className="grid grid-cols-3 w-full">
                                <TabsTrigger value="all" layoutId="default-indicator">All</TabsTrigger>
                                <TabsTrigger value="unread" layoutId="default-indicator">Unread</TabsTrigger>
                                <TabsTrigger value="archived" layoutId="default-indicator">Archived</TabsTrigger>
                            </TabsList>
                            <TabsContent value="all" className="p-4 border border-dashed rounded-xl bg-muted/10 h-32">
                                <p className="text-sm">Showing all messages in your workspace.</p>
                            </TabsContent>
                            <TabsContent value="unread" className="p-4 border border-dashed rounded-xl bg-muted/10 h-32">
                                <p className="text-sm">You have 5 items that require your attention.</p>
                            </TabsContent>
                            <TabsContent value="archived" className="p-4 border border-dashed rounded-xl bg-muted/10 h-32">
                                <p className="text-sm">No archived conversations found.</p>
                            </TabsContent>
                        </Tabs>
                    </PremiumCard>

                    {/* Ghost Variant */}
                    <PremiumCard className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-semibold">Ghost Style</h3>
                            <p className="text-sm text-muted-foreground">Subtle indicators for tertiary navigation.</p>
                        </div>
                        <Tabs defaultValue="desktop" variant="ghost">
                            <TabsList className="w-full justify-start px-0 gap-1">
                                <TabsTrigger
                                    value="desktop"
                                    layoutId="ghost-indicator"
                                    indicatorClassName="bg-primary/10 shadow-none border border-primary/20"
                                >
                                    Desktop
                                </TabsTrigger>
                                <TabsTrigger
                                    value="mobile"
                                    layoutId="ghost-indicator"
                                    indicatorClassName="bg-primary/10 shadow-none border border-primary/20"
                                >
                                    Mobile
                                </TabsTrigger>
                                <TabsTrigger
                                    value="api"
                                    layoutId="ghost-indicator"
                                    indicatorClassName="bg-primary/10 shadow-none border border-primary/20"
                                >
                                    API
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="desktop" className="p-4 border border-dashed rounded-xl bg-muted/10 h-32">
                                <p className="text-sm">Optimizing view for large screen devices.</p>
                            </TabsContent>
                            <TabsContent value="mobile" className="p-4 border border-dashed rounded-xl bg-muted/10 h-32">
                                <p className="text-sm">Previewing mobile responsiveness and layout.</p>
                            </TabsContent>
                            <TabsContent value="api" className="p-4 border border-dashed rounded-xl bg-muted/10 h-32">
                                <p className="text-sm">Direct access to raw data and endpoints.</p>
                            </TabsContent>
                        </Tabs>
                    </PremiumCard>
                </div>
            </SlideUp>

        </div>
    )
}
