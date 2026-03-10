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
    CreditCard,
    Key,
    Webhook,
    BarChart3,
    History,
    ArrowUpRight,
    Bot,
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
    SidebarMenuBadge,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { usePlatform, type Platform } from "@/components/dashboard/platform-context"

// ── Platform Specific Nav Data ──────────────────────────────────────────────

const creativeNav = {
    main: [
        { title: "Home", url: "/dashboard", icon: Home },
        { title: "Layouts Showcase", url: "/dashboard/layouts", icon: Layers, tag: "New" },
        { title: "Forms Showcase", url: "/dashboard/forms", icon: FileText },
    ],
    sections: [
        {
            label: "Voices", items: [
                {
                    title: "Voices",
                    url: "#",
                    icon: Mic,
                    badge: "+",
                    subItems: [
                        { title: "Voice Library", url: "#" },
                        { title: "Voice Cloning", url: "#" },
                        { title: "Voice Design", url: "#" },
                    ]
                }
            ]
        },
        {
            label: "Playground",
            items: [
                { title: "Text to Speech", url: "#", icon: Type },
                { title: "Voice Changer", url: "#", icon: Radio },
                { title: "Voice Isolator", url: "#", icon: Waves },
                { title: "Sound Effects", url: "#", icon: AudioWaveform },
                { title: "Music", url: "#", icon: Music },
                { title: "Image & Video", url: "#", icon: Image },
                { title: "Templates", url: "#", icon: BookTemplate },
            ]
        },
        {
            label: "Products",
            items: [
                { title: "Studio", url: "#", icon: Layers },
                { title: "Audiobooks", url: "#", icon: BookOpen, tag: "New" },
                { title: "Dubbing", url: "#", icon: Globe2 },
                { title: "Speech to Text", url: "#", icon: FileAudio },
                { title: "Audio Native", url: "#", icon: Clapperboard },
                { title: "Productions", url: "#", icon: Mic },
            ]
        },
        {
            label: "Files", items: [
                { title: "Files", url: "#", icon: FileText, badge: "3" }
            ]
        },
        {
            label: "Monitor",
            items: [
                { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
            ]
        },
        {
            label: "Settings", items: [
                { title: "Billing", url: "/dashboard/billing", icon: CreditCard }
            ]
        }
    ]
}

const apiNav = {
    main: [
        { title: "Home", url: "/dashboard", icon: Home },
    ],
    sections: [
        {
            label: "Build",
            items: [
                { title: "Voices", url: "#", icon: Mic, badge: "+" },
                { title: "API Playground", url: "#", icon: Zap, isExternal: true },
                { title: "API Docs", url: "#", icon: FileText, isExternal: true },
                { title: "Agents", url: "#", icon: Bot, isExternal: true },
            ]
        },
        {
            label: "Configure",
            items: [
                { title: "API Keys", url: "#", icon: Key },
                { title: "Webhooks", url: "#", icon: Webhook },
            ]
        },
        {
            label: "Monitor",
            items: [
                { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
                { title: "Request Log", url: "#", icon: History },
            ]
        }
    ]
}

const agentsNav = {
    main: [
        { title: "Home", url: "/dashboard", icon: Home },
    ],
    sections: [
        {
            label: "Workspaces",
            items: [
                { title: "My Agents", url: "#", icon: Bot },
                { title: "Templates", url: "#", icon: BookTemplate },
            ]
        },
        {
            label: "Voices",
            items: [
                { title: "Voice Library", url: "#", icon: Mic },
                { title: "Voice Cloning", url: "#", icon: Layers },
            ]
        },
        {
            label: "Monitor",
            items: [
                { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
                { title: "Request Log", url: "#", icon: History },
            ]
        },
        {
            label: "Settings",
            items: [
                { title: "Billing", url: "/dashboard/billing", icon: CreditCard }
            ]
        }
    ]
}

const platformNavConfig: Record<Platform, any> = {
    elevenCreative: creativeNav,
    elevenAgents: agentsNav,
    elevenAPI: apiNav,
}

// ── Sidebar Nav Item ─────────────────────────────────────────────────────────

interface NavSubItemProps {
    title: string;
    url: string;
}

interface NavItemProps {
    title: string
    url: string
    icon: React.ElementType
    isActive?: boolean
    badge?: string
    tag?: string
    isExternal?: boolean
    subItems?: NavSubItemProps[]
}

function NavItem({ title, url, icon: Icon, isActive: propIsActive, tag, badge, isExternal, subItems }: NavItemProps) {
    const pathname = usePathname()
    // A parent is active if it or any of its subItems match the pathname
    const isSubActive = subItems?.some(item => pathname === item.url || pathname.startsWith(item.url + '/'))
    const isActive = (propIsActive ?? (url !== "#" && pathname === url)) || isSubActive

    if (subItems && subItems.length > 0) {
        return (
            <Collapsible asChild defaultOpen={isActive} className="group/collapsible">
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                            tooltip={title}
                            className={`
                                group/item h-8 rounded-[10px] px-2 gap-2
                                transition-all duration-200 ease-in-out w-full
                                ${isActive
                                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                }
                            `}
                        >
                            <Icon className="h-5 w-5 shrink-0" />
                            <span className="flex-1 text-[14px] font-medium leading-5 truncate text-left">
                                {title}
                            </span>
                            <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {subItems.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={pathname === subItem.url}
                                    >
                                        <Link href={subItem.url}>
                                            <span>{subItem.title}</span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        )
    }

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={title}
                className={`
                    group/item h-8 rounded-[10px] px-2 gap-2 relative
                    transition-all duration-200 ease-in-out
                    ${isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }
                `}
            >
                <Link href={url} className="flex items-center gap-2 w-full">
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="flex-1 text-[14px] font-medium leading-5 truncate">
                        {title}
                    </span>
                    {isExternal && (
                        <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-muted-foreground/50 group-hover/item:text-foreground transition-colors" />
                    )}
                    {tag && (
                        <span className="ml-auto mr-4 text-[12px] font-medium leading-4 tracking-[0.03px] px-[11px] py-px rounded-full bg-sidebar-accent border border-sidebar-border text-sidebar-foreground whitespace-nowrap">
                            {tag}
                        </span>
                    )}
                </Link>
            </SidebarMenuButton>
            {badge && (
                <SidebarMenuBadge className={badge === '+' ? "bg-sidebar-accent border border-sidebar-border hover:bg-sidebar-accent/80 transition-colors rounded-[6px] w-[22px] h-[22px] p-[3px] text-sidebar-foreground/50 ml-auto mr-1" : "ml-auto"}>
                    {badge === '+' ? <Plus className="h-3 w-3" /> : badge}
                </SidebarMenuBadge>
            )}
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
                <div className="px-3 pt-2 group-data-[collapsible=icon]:hidden relative">
                    <button
                        onClick={toggleWorkspaceMenu}
                        className="w-full flex items-center gap-2 px-2 py-1 rounded-[10px] bg-sidebar-accent/50 border border-sidebar-border shadow-sm hover:bg-sidebar-accent transition-colors duration-200"
                    >
                        {/* Workspace avatar */}
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[8px] font-bold text-white">
                                {workspaceLabel[0]}
                            </div>
                        </div>
                        <div className="flex flex-1 items-center justify-between min-w-0">
                            <span className="text-[14px] font-medium text-sidebar-foreground truncate max-w-[130px]">
                                {workspaceLabel}
                            </span>
                            <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 ml-2 transition-transform duration-200 ${isWorkspaceMenuOpen ? 'rotate-180' : ''}`} />
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
                            {currentNav.main.map((item: any) => (
                                <div key={item.title} className="relative">
                                    <NavItem {...item} />
                                    {/* Voices: inline + button */}
                                    {item.badge === '+' && (
                                        <button className="absolute right-1 top-[5px] bg-sidebar-accent border border-sidebar-border rounded-[6px] p-[3px] h-[22px] w-[22px] flex items-center justify-center text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/80 transition-colors group-data-[collapsible=icon]:hidden">
                                            <Plus className="h-3 w-3" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* ── Dynamic Sections ──────────────────────────── */}
                {currentNav.sections?.map((section: any) => (
                    <SidebarGroup key={section.label} className="pt-5 pb-0 px-3">
                        <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-[14px] font-medium text-muted-foreground h-5 px-0 mb-1.5">
                            {section.label}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu className="gap-1">
                                {section.items.map((item: any) => (
                                    <div key={item.title} className="relative">
                                        <NavItem {...item} />
                                        {item.badge === '+' && (
                                            <button className="absolute right-1 top-[5px] bg-sidebar-accent border border-sidebar-border rounded-[6px] p-[3px] h-[22px] w-[22px] flex items-center justify-center text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/80 transition-colors group-data-[collapsible=icon]:hidden">
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}

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
            <SidebarFooter className="bg-sidebar border-t border-sidebar-border px-3 py-3">
                <div className="group-data-[collapsible=icon]:hidden">
                    <Link
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
                        <span className="text-[14px] font-medium text-sidebar-foreground group-hover/upgrade:text-sidebar-accent-foreground transition-colors">
                            Upgrade
                        </span>
                    </Link>
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
