"use client"

import { useState } from "react"
import {
    Bell,
    Search,
    Command,
    ChevronDown,
    Settings2,
    LogOut,
    User,
    SunMoon,
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"

export function Topbar() {
    const [searchFocused, setSearchFocused] = useState(false)
    const [isThemePanelOpen, setIsThemePanelOpen] = useState(false)
    const { setTheme } = useTheme()

    return (
        <header className="sticky top-0 z-20 flex h-14 w-full items-center gap-3 border-b border-border bg-(--bg-shell)/95 backdrop-blur-md px-4 md:px-6">
            {/* Mobile hamburger / sidebar trigger */}
            <SidebarTrigger className="text-muted-foreground hover:text-foreground hover:bg-accent h-8 w-8 rounded-lg transition-all duration-200 shrink-0" />

            {/* Search bar */}
            <div
                className={`
                    hidden md:flex items-center flex-1 max-w-sm relative
                    transition-all duration-300
                    ${searchFocused ? "max-w-md" : "max-w-sm"}
                `}
            >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none transition-colors duration-200 z-10" />
                <Input
                    type="search"
                    placeholder="Search resources..."
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="
                        w-full h-8 pl-9 pr-10
                        bg-background border border-border
                        text-sm text-foreground placeholder:text-muted-foreground
                        rounded-full
                        focus-visible:ring-1 focus-visible:ring-[#a855f7]/50
                        focus-visible:ring-offset-0
                        focus-visible:border-[#a855f7]/40
                        hover:border-border/80
                        transition-all duration-200
                        appearance-none
                    "
                />
                {/* Keyboard shortcut hint */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-0.5 pointer-events-none">
                    <kbd className="flex items-center justify-center h-4 min-w-4 px-1 text-[10px] font-medium text-muted-foreground bg-accent border border-border rounded">
                        <Command className="h-2.5 w-2.5" />
                    </kbd>
                    <kbd className="flex items-center justify-center h-4 min-w-4 px-1 text-[10px] font-medium text-muted-foreground bg-accent border border-border rounded">
                        K
                    </kbd>
                </div>
            </div>

            {/* Right-side actions */}
            <div className="flex items-center gap-2 ml-auto">
                {/* Mobile search icon */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent h-8 w-8 transition-all duration-200"
                >
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                </Button>

                {/* Notifications */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent h-8 w-8 transition-all duration-200"
                >
                    <Bell className="h-4 w-4" />
                    {/* Notification dot */}
                    <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7] ring-[1.5px] ring-background" />
                    <span className="sr-only">Notifications</span>
                </Button>

                {/* Theme selector */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent h-8 w-8 transition-all duration-200"
                            aria-label="Change theme"
                        >
                            <SunMoon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        sideOffset={8}
                        className="w-44 bg-(--bg-popup) border border-border text-foreground rounded-xl shadow-2xl"
                    >
                        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground pb-1">
                            Theme
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-border" />
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                className="rounded-lg text-[13px] cursor-pointer hover:bg-(--bg-popup-hover) focus:bg-(--bg-popup-hover)"
                                onClick={() => setTheme("system")}
                            >
                                Default (System)
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="rounded-lg text-[13px] cursor-pointer hover:bg-(--bg-popup-hover) focus:bg-(--bg-popup-hover)"
                                onClick={() => setTheme("light")}
                            >
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="rounded-lg text-[13px] cursor-pointer hover:bg-(--bg-popup-hover) focus:bg-(--bg-popup-hover)"
                                onClick={() => setTheme("dark")}
                            >
                                Dark
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* User avatar + dropdown with side theme panel */}
                <div className="relative">
                    <DropdownMenu
                        onOpenChange={(open) => {
                            if (!open) setIsThemePanelOpen(false)
                        }}
                    >
                        <DropdownMenuTrigger asChild>
                            <button className="
                                flex items-center gap-2 pl-1 pr-2 py-1
                                rounded-lg
                                hover:bg-accent
                                transition-all duration-200
                                focus-visible:outline-none
                                focus-visible:ring-1 focus-visible:ring-[#a855f7]/50
                            ">
                                {/* Gradient ring avatar */}
                                <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-[#a855f7] to-[#22c55e] p-[1.5px] shrink-0">
                                    <Avatar className="h-full w-full">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                                        <AvatarFallback className="bg-background text-[11px] text-foreground font-medium">
                                            EC
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <span className="hidden md:block text-[13px] font-medium text-foreground max-w-[100px] truncate">
                                    ElevenCreative
                                </span>
                                <ChevronDown className="hidden md:block h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            sideOffset={8}
                            className="w-52 bg-(--bg-popup) border border-border text-foreground rounded-xl shadow-2xl"
                        >
                            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground pb-1">
                                Signed in as
                                <span className="block font-medium text-foreground mt-0.5 text-sm truncate">
                                    user@elevencreative.io
                                </span>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-border" />
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="gap-2 rounded-lg text-[13px] cursor-pointer hover:bg-(--bg-popup-hover) focus:bg-(--bg-popup-hover)">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 rounded-lg text-[13px] cursor-pointer hover:bg-(--bg-popup-hover) focus:bg-(--bg-popup-hover)">
                                    <Settings2 className="h-4 w-4 text-muted-foreground" />
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger className="gap-2 rounded-lg text-[13px] cursor-pointer hover:bg-(--bg-popup-hover) focus:bg-(--bg-popup-hover)">
                                        <SunMoon className="h-4 w-4 text-muted-foreground" />
                                        <span>Theme</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent className="w-44 bg-(--bg-popup) border border-border text-foreground rounded-xl shadow-2xl">
                                        <DropdownMenuItem
                                            className="rounded-lg text-[13px] cursor-pointer hover:bg-(--bg-popup-hover) focus:bg-(--bg-popup-hover)"
                                            onClick={() => setTheme("system")}
                                        >
                                            Default (System)
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="rounded-lg text-[13px] cursor-pointer hover:bg-(--bg-popup-hover) focus:bg-(--bg-popup-hover)"
                                            onClick={() => setTheme("light")}
                                        >
                                            Light
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="rounded-lg text-[13px] cursor-pointer hover:bg-(--bg-popup-hover) focus:bg-(--bg-popup-hover)"
                                            onClick={() => setTheme("dark")}
                                        >
                                            Dark
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator className="bg-border" />
                            <DropdownMenuItem className="gap-2 rounded-lg text-[13px] cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-300">
                                <LogOut className="h-4 w-4" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
