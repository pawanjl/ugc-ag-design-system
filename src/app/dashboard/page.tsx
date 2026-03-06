import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Bot, Mic, Sparkles } from "lucide-react"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { SlideUp } from "@/components/animations/slide-up"

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
                <StaggerItem className="col-span-4 block">
                    <Card className="h-full bg-card border-border rounded-xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-card-foreground">Usage Analytics</CardTitle>
                        </CardHeader>
                        <CardContent className="px-6">
                            <div className="flex h-[350px] items-center justify-center text-muted-foreground/50 border border-dashed border-border rounded-xl bg-background/50">
                                [Chart Placeholder]
                            </div>
                        </CardContent>
                    </Card>
                </StaggerItem>
                <StaggerItem className="col-span-3 block">
                    <Card className="h-full bg-card border-border rounded-xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-card-foreground">Recent Generations</CardTitle>
                            <CardDescription className="text-muted-foreground">You've generated 14 audio files today.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex h-[350px] items-center justify-center text-muted-foreground/50 border border-dashed border-border rounded-xl bg-background/50">
                                [List Placeholder]
                            </div>
                        </CardContent>
                    </Card>
                </StaggerItem>
            </StaggerContainer>
        </div>
    )
}
