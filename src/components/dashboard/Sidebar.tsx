"use client"

import * as React from "react"
import {
    Home,
    Mic,
    FileText,
    Type,
    Radio,
    Waves,
    Music,
    Image,
    BookTemplate,
    Layers,
    BookOpen,
    Globe2,
    FileAudio,
    AudioWaveform,
    Clapperboard,
    Code2,
    Zap,
    ChevronDown,
    Plus,
    Shield,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { usePlatform } from "@/components/dashboard/platform-context"

// ── Nav Data per platform ────────────────────────────────────────────────────

const platformNavConfig = {
    elevenCreative: {
        main: [
            { title: "Home", url: "/dashboard", icon: Home, isActive: true },
            { title: "Voices", url: "#", icon: Mic, badge: "+" },
            { title: "Files", url: "#", icon: FileText },
        ],
        playground: [
            { title: "Text to Speech", url: "#", icon: Type },
            { title: "Voice Changer", url: "#", icon: Radio },
            { title: "Voice Isolator", url: "#", icon: Waves },
            { title: "Sound Effects", url: "#", icon: AudioWaveform },
            { title: "Music", url: "#", icon: Music },
            { title: "Image & Video", url: "#", icon: Image },
            { title: "Templates", url: "#", icon: BookTemplate },
        ],
        products: [
            { title: "Studio", url: "#", icon: Layers },
            { title: "Audiobooks", url: "#", icon: BookOpen, tag: "New" },
            { title: "Dubbing", url: "#", icon: Globe2 },
            { title: "Speech to Text", url: "#", icon: FileAudio },
            { title: "Audio Native", url: "#", icon: Clapperboard },
            { title: "Productions", url: "#", icon: Mic },
        ],
    },
    elevenAgents: {
        main: [
            { title: "Agents Home", url: "/dashboard/agents", icon: Home, isActive: true },
            { title: "Agent Builder", url: "#", icon: Layers },
            { title: "Conversations", url: "#", icon: Mic },
        ],
        playground: [
            { title: "Agent Playground", url: "#", icon: Type },
            { title: "Knowledge Bases", url: "#", icon: BookOpen },
            { title: "Routing & Orchestration", url: "#", icon: Waves },
        ],
        products: [
            { title: "Agent Hub", url: "#", icon: Globe2 },
            { title: "Analytics", url: "#", icon: Clapperboard },
            { title: "Security", url: "#", icon: Shield },
        ],
    },
    elevenAPI: {
        main: [
            { title: "API Overview", url: "/dashboard/api", icon: Home, isActive: true },
            { title: "API Playground", url: "#", icon: Code2 },
            { title: "Requests & Logs", url: "#", icon: FileText },
        ],
        playground: [
            { title: "REST Examples", url: "#", icon: Type },
            { title: "SDKs & Clients", url: "#", icon: Layers },
            { title: "Webhooks", url: "#", icon: Radio },
        ],
        products: [
            { title: "API Keys", url: "#", icon: Shield },
            { title: "Rate Limits", url: "#", icon: Zap },
            { title: "Status & Incidents", url: "#", icon: Globe2 },
        ],
    },
} as const

// ── Sidebar Nav Item ─────────────────────────────────────────────────────────

interface NavItemProps {
    title: string
    url: string
    icon: React.ElementType
    isActive?: boolean
    badge?: string
    tag?: string
}

function NavItem({ title, url, icon: Icon, isActive, tag }: NavItemProps) {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={title}
                className={`
                    group/item h-8 rounded-[10px] px-2 gap-2
                    transition-all duration-200 ease-in-out
                    ${isActive
                        ? "bg-[#1a1a1a] text-white font-medium"
                        : "text-[#5b5b64] hover:bg-[#1a1a1a] hover:text-[#e5e5e8]"
                    }
                `}
            >
                <a href={url} className="flex items-center gap-2 w-full">
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="flex-1 text-[14px] font-medium leading-5 truncate">
                        {title}
                    </span>
                    {tag && (
                        <span className="ml-auto text-[12px] font-medium leading-4 tracking-[0.03px] px-[11px] py-px rounded-full bg-sidebar-accent border border-sidebar-border text-sidebar-foreground whitespace-nowrap">
                            {tag}
                        </span>
                    )}
                </a>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

// ── Main Sidebar Component ───────────────────────────────────────────────────

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { platform, setPlatform } = usePlatform()
    const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = React.useState(false)

    const currentNav = platformNavConfig[platform]

    const workspaceLabel =
        platform === "elevenAgents" ? "ElevenAgents" : platform === "elevenAPI" ? "ElevenAPI" : "ElevenCreative"

    const toggleWorkspaceMenu = () => {
        setIsWorkspaceMenuOpen((open) => !open)
    }

    const handleWorkspaceSelect = (value: keyof typeof platformNavConfig) => {
        setPlatform(value)
        setIsWorkspaceMenuOpen(false)
    }

    return (
        <Sidebar
            collapsible="icon"
            className="border-r border-sidebar-border bg-sidebar"
            {...props}
        >
            {/* ── Logo Header ─────────────────────────────────────── */}
            <SidebarHeader className="h-[50px] flex items-center justify-start px-3 bg-sidebar border-b border-sidebar-border">
                <div className="flex items-center gap-1.5 overflow-hidden group-data-[collapsible=icon]:justify-center">
                    {/* 11 icon mark */}
                    <div className="flex items-center gap-0.5 shrink-0">
                        <span className="font-black text-sidebar-foreground text-lg leading-none select-none">11</span>
                    </div>
                    <span className="font-semibold text-sidebar-foreground text-[15px] truncate group-data-[collapsible=icon]:hidden">
                        ElevenLabs
                    </span>
                </div>
            </SidebarHeader>

            <SidebarContent className="bg-sidebar overflow-x-hidden">
                {/* ── Platform Switcher ───────────────────────────── */}
                <div className="px-3 pt-2 group-data-[collapsible=icon]:hidden">
                    <button className="w-full flex items-center gap-2 px-2 py-1 rounded-[10px] bg-[#111111] border border-[#1f1f1f] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.3)] hover:bg-[#161616] transition-colors duration-200">
                        {/* Workspace avatar */}
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[8px] font-bold text-white">
                                E
                            </div>
                        </div>
                        <div className="flex flex-1 items-center justify-between min-w-0">
                            <span className="text-[14px] font-medium text-white truncate max-w-[130px]">
                                ElevenCreative
                            </span>
                            <ChevronDown className="h-4 w-4 text-[#5b5b64] shrink-0 ml-2" />
                        </div>
                    </button>

                    {isWorkspaceMenuOpen && (
                        <div
                            className="absolute left-3 right-3 mt-1 rounded-[10px] border border-sidebar-border bg-popover shadow-[0px_10px_40px_rgba(0,0,0,0.1)] z-20"
                            role="listbox"
                            aria-label="Select workspace"
                        >
                            <button
                                type="button"
                                onClick={() => handleWorkspaceSelect("elevenCreative")}
                                className={`flex w-full items-center gap-2 px-2 py-1.5 text-left text-[13px] rounded-[10px] ${platform === "elevenCreative"
                                    ? "bg-sidebar-accent text-sidebar-foreground"
                                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent"
                                    }`}
                            >
                                <span className="flex-1 truncate">ElevenCreative</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleWorkspaceSelect("elevenAgents")}
                                className={`flex w-full items-center gap-2 px-2 py-1.5 text-left text-[13px] rounded-[10px] ${platform === "elevenAgents"
                                    ? "bg-sidebar-accent text-sidebar-foreground"
                                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent"
                                    }`}
                            >
                                <span className="flex-1 truncate">ElevenAgents</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleWorkspaceSelect("elevenAPI")}
                                className={`flex w-full items-center gap-2 px-2 py-1.5 text-left text-[13px] rounded-[10px] ${platform === "elevenAPI"
                                    ? "bg-sidebar-accent text-sidebar-foreground"
                                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent"
                                    }`}
                            >
                                <span className="flex-1 truncate">ElevenAPI</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* ── Main Nav (Home, Voices, Files) ──────────────── */}
                <SidebarGroup className="pt-3 pb-0 px-3">
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {currentNav.main.map((item) => (
                                <div key={item.title} className="relative">
                                    <NavItem {...item} />
                                    {/* Voices: inline + button */}
                                    {item.badge && (
                                        <button className="absolute right-1 top-[5px] bg-[#111111] border border-[#2a2a2a] rounded-[6px] p-[3px] h-[22px] w-[22px] flex items-center justify-center text-[#5b5b64] hover:text-white hover:bg-[#1a1a1a] transition-colors group-data-[collapsible=icon]:hidden">
                                            <Plus className="h-3 w-3" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* ── Playground Section ──────────────────────────── */}
                <SidebarGroup className="pt-5 pb-0 px-3">
                    <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-[14px] font-medium text-[#787881] h-5 px-0 mb-1.5">
                        Playground
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {currentNav.playground.map((item) => (
                                <NavItem key={item.title} {...item} />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* ── Products Section ────────────────────────────── */}
                <SidebarGroup className="pt-5 pb-0 px-3">
                    <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-[14px] font-medium text-[#787881] h-5 px-0 mb-1.5">
                        Products
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {currentNav.products.map((item) => (
                                <NavItem key={item.title} {...item} />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* ── Developers Link ─────────────────────────────── */}
                <SidebarGroup className="pt-4 pb-2 px-3">
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            <NavItem title="Developers" url="#" icon={Code2} />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* ── Footer: Upgrade CTA ─────────────────────────────── */}
            <SidebarFooter className="bg-[#0a0a0a] border-t border-[#1a1a1a] px-3 py-3">
                <div className="group-data-[collapsible=icon]:hidden">
                    <a
                        href="#"
                        className="
                            flex items-center gap-2 px-2 py-1.5 w-full rounded-lg
                            relative overflow-hidden
                            border border-[#2a2a2a]
                            bg-gradient-to-r from-[#a855f7]/10 via-transparent to-[#22c55e]/10
                            hover:from-[#a855f7]/20 hover:to-[#22c55e]/20
                            transition-all duration-300
                            group/upgrade
                        "
                    >
                        <div className="flex items-center justify-center h-5 w-5 shrink-0">
                            <Zap className="h-[18px] w-[18px] text-primary group-hover/upgrade:text-primary transition-colors" />
                        </div>
                        <span className="text-[14px] font-medium text-[#e5e5e8] group-hover/upgrade:text-white transition-colors">
                            Upgrade
                        </span>
                    </a>
                </div>
                {/* Collapsed icon-only state */}
                <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center">
                    <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-[#2a2a2a] bg-[#a855f7]/10 hover:bg-[#a855f7]/20 transition-colors">
                        <Zap className="h-4 w-4 text-[#a855f7]" />
                    </button>
                </div>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}
