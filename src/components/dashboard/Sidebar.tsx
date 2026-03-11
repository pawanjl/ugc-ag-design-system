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

// ── Nav Data (mirrors the Figma structure exactly) ──────────────────────────

const mainNavItems = [
    { title: "Home", url: "/dashboard", icon: Home },
    { title: "Blogs", url: "/blog", icon: FileText, tag: "New" },
    { title: "Layouts Showcase", url: "/dashboard/layouts", icon: Layers },
    { title: "Forms Showcase", url: "/dashboard/forms", icon: FileText },
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
    },
    { title: "Files", url: "#", icon: FileText, badge: "3" },
    { title: "Billing", url: "/dashboard/billing", icon: CreditCard },
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
    { title: "Studio", url: "/studio", icon: Layers },
    { title: "Audiobooks", url: "#", icon: BookOpen, tag: "New" },
    { title: "Dubbing", url: "#", icon: Globe2 },
    { title: "Speech to Text", url: "#", icon: FileAudio },
    { title: "Audio Native", url: "#", icon: Clapperboard },
    { title: "Productions", url: "#", icon: Mic },
]

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
    subItems?: NavSubItemProps[]
}

function NavItem({ title, url, icon: Icon, isActive: propIsActive, tag, badge, subItems }: NavItemProps) {
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
                                        <a href={subItem.url}>
                                            <span>{subItem.title}</span>
                                        </a>
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
                <a href={url} className="flex items-center gap-2 w-full">
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="flex-1 text-[14px] font-medium leading-5 truncate">
                        {title}
                    </span>
                    {tag && (
                        <span className="ml-auto mr-4 text-[12px] font-medium leading-4 tracking-[0.03px] px-[11px] py-px rounded-full bg-sidebar-accent border border-sidebar-border text-sidebar-foreground whitespace-nowrap">
                            {tag}
                        </span>
                    )}
                </a>
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
                    <button className="w-full flex items-center gap-2 px-2 py-1 rounded-[10px] bg-sidebar-accent border border-sidebar-border shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] hover:bg-sidebar-accent/80 transition-colors duration-200">
                        {/* Workspace avatar */}
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[8px] font-bold text-white">
                                E
                            </div>
                        </div>
                        <div className="flex flex-1 items-center justify-between min-w-0">
                            <span className="text-[14px] font-medium text-sidebar-foreground truncate max-w-[130px]">
                                ElevenCreative
                            </span>
                            <ChevronDown className="h-4 w-4 text-sidebar-foreground/50 shrink-0 ml-2" />
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
                                        <button className="absolute right-1 top-[5px] bg-sidebar-accent border border-sidebar-border rounded-[6px] p-[3px] h-[22px] w-[22px] flex items-center justify-center text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/80 transition-colors group-data-[collapsible=icon]:hidden">
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
                    <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-[14px] font-medium text-muted-foreground h-5 px-0 mb-1.5">
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
                    <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-[14px] font-medium text-muted-foreground h-5 px-0 mb-1.5">
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
            <SidebarFooter className="bg-sidebar border-t border-sidebar-border px-3 py-3">
                <div className="group-data-[collapsible=icon]:hidden">
                    <a
                        href="#"
                        className="
                            flex items-center gap-2 px-2 py-1.5 w-full rounded-lg
                            relative overflow-hidden
                            border border-sidebar-border
                            bg-gradient-to-r from-primary/10 via-transparent to-secondary/10
                            hover:from-primary/20 hover:to-secondary/20
                            transition-all duration-300
                            group/upgrade
                        "
                    >
                        <div className="flex items-center justify-center h-5 w-5 shrink-0">
                            <Zap className="h-[18px] w-[18px] text-primary group-hover/upgrade:text-primary transition-colors" />
                        </div>
                        <span className="text-[14px] font-medium text-sidebar-foreground group-hover/upgrade:text-sidebar-primary transition-colors">
                            Upgrade
                        </span>
                    </a>
                </div>
                {/* Collapsed icon-only state */}
                <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-sidebar-border bg-primary/10 hover:bg-primary/20 transition-colors">
                                <Zap className="h-4 w-4 text-primary" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="right">Upgrade</TooltipContent>
                    </Tooltip>
                </div>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}
