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

// ── Nav Data (mirrors the Figma structure exactly) ──────────────────────────

const mainNavItems = [
    { title: "Home", url: "/dashboard", icon: Home, isActive: true },
    { title: "Voices", url: "#", icon: Mic, badge: "+" },
    { title: "Files", url: "#", icon: FileText },
]

const playgroundItems = [
    { title: "Text to Speech", url: "#", icon: Type },
    { title: "Voice Changer", url: "#", icon: Radio },
    { title: "Voice Isolator", url: "#", icon: Waves },
    { title: "Sound Effects", url: "#", icon: AudioWaveform },
    { title: "Music", url: "#", icon: Music },
    { title: "Image & Video", url: "#", icon: Image },
    { title: "Templates", url: "#", icon: BookTemplate },
]

const productsItems = [
    { title: "Studio", url: "#", icon: Layers },
    { title: "Audiobooks", url: "#", icon: BookOpen, tag: "New" },
    { title: "Dubbing", url: "#", icon: Globe2 },
    { title: "Speech to Text", url: "#", icon: FileAudio },
    { title: "Audio Native", url: "#", icon: Clapperboard },
    { title: "Productions", url: "#", icon: Mic },
]

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
                        <span className="ml-auto text-[12px] font-medium leading-4 tracking-[0.03px] px-[11px] py-px rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#e5e5e8] whitespace-nowrap">
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
    return (
        <Sidebar
            collapsible="icon"
            className="border-r border-[#1a1a1a] bg-[#0a0a0a]"
            {...props}
        >
            {/* ── Logo Header ─────────────────────────────────────── */}
            <SidebarHeader className="h-[50px] flex items-center justify-start px-3 bg-[#0a0a0a] border-b border-[#1a1a1a]">
                <div className="flex items-center gap-1.5 overflow-hidden group-data-[collapsible=icon]:justify-center">
                    {/* 11 icon mark */}
                    <div className="flex items-center gap-0.5 shrink-0">
                        <span className="font-black text-white text-lg leading-none select-none">11</span>
                    </div>
                    <span className="font-semibold text-white text-[15px] truncate group-data-[collapsible=icon]:hidden">
                        ElevenLabs
                    </span>
                </div>
            </SidebarHeader>

            <SidebarContent className="bg-[#0a0a0a] overflow-x-hidden">
                {/* ── Platform Switcher ───────────────────────────── */}
                <div className="px-3 pt-2 group-data-[collapsible=icon]:hidden">
                    <button className="w-full flex items-center gap-2 px-2 py-1 rounded-[10px] bg-[#111111] border border-[#1f1f1f] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.3)] hover:bg-[#161616] transition-colors duration-200">
                        {/* Workspace avatar */}
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#a855f7] to-[#22c55e] flex items-center justify-center text-[8px] font-bold text-white">
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
                </div>

                {/* ── Main Nav (Home, Voices, Files) ──────────────── */}
                <SidebarGroup className="pt-3 pb-0 px-3">
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {mainNavItems.map((item) => (
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
                            {playgroundItems.map((item) => (
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
                            {productsItems.map((item) => (
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
                            <Zap className="h-[18px] w-[18px] text-[#a855f7] group-hover/upgrade:text-[#b97cf7] transition-colors" />
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
