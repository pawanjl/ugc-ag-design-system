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
                <h1 className="text-3xl font-bold tracking-tight text-white">Overview</h1>
                <p className="text-zinc-400">Welcome back. Here's what's happening today.</p>
            </SlideUp>

            <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric, i) => (
                    <StaggerItem key={i}>
                        <Card className="bg-[#1a1a1a] border-[#27272a] rounded-xl hover:bg-[#1a1a1a]/80 hover:scale-[1.02] shadow-sm transition-all duration-300 group cursor-pointer h-full">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-zinc-300">{metric.title}</CardTitle>
                                <div className="h-8 w-8 rounded-full bg-[#0a0a0a] flex items-center justify-center group-hover:bg-[#a855f7]/10 transition-colors">
                                    <metric.icon className="h-4 w-4 text-zinc-500 group-hover:text-[#a855f7] transition-colors" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">{metric.value}</div>
                                <p className="text-xs text-emerald-500 mt-1">{metric.change}</p>
                            </CardContent>
                        </Card>
                    </StaggerItem>
                ))}
            </StaggerContainer>

            <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-2">
                <StaggerItem className="col-span-4 block">
                    <Card className="h-full bg-[#1a1a1a] border-[#27272a] rounded-xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-white">Usage Analytics</CardTitle>
                        </CardHeader>
                        <CardContent className="px-6">
                            <div className="flex h-[350px] items-center justify-center text-zinc-600 border border-dashed border-[#27272a] rounded-xl bg-[#0a0a0a]/50">
                                [Chart Placeholder]
                            </div>
                        </CardContent>
                    </Card>
                </StaggerItem>
                <StaggerItem className="col-span-3 block">
                    <Card className="h-full bg-[#1a1a1a] border-[#27272a] rounded-xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-white">Recent Generations</CardTitle>
                            <CardDescription className="text-zinc-400">You've generated 14 audio files today.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex h-[350px] items-center justify-center text-zinc-600 border border-dashed border-[#27272a] rounded-xl bg-[#0a0a0a]/50">
                                [List Placeholder]
                            </div>
                        </CardContent>
                    </Card>
                </StaggerItem>
            </StaggerContainer>
        </div>
    )
}
