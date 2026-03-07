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
    Sparkles,
    SunMoon,
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button/button"
import { DockPanelTrigger } from "@/components/ui/dock-layout"
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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export function Topbar() {
    const [searchFocused, setSearchFocused] = useState(false)
    const [isThemePanelOpen, setIsThemePanelOpen] = useState(false)
    const { setTheme } = useTheme()

    return (
        <header className="sticky top-0 z-20 flex h-14 w-full items-center gap-3 border-b border-[#1a1a1a] bg-[#0a0a0a]/95 backdrop-blur-md px-4 md:px-6">
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
                        bg-[#111111] border border-[#1f1f1f]
                        text-sm text-[#e5e5e8] placeholder:text-[#5b5b64]
                        rounded-full
                        focus-visible:ring-1 focus-visible:ring-primary/50
                        focus-visible:ring-offset-0
                        focus-visible:border-[#a855f7]/40
                        hover:border-[#2a2a2a]
                        transition-all duration-200
                        appearance-none
                    "
                />
                {/* Keyboard shortcut hint */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-0.5 pointer-events-none">
                    <kbd className="flex items-center justify-center h-4 min-w-4 px-1 text-[10px] font-medium text-[#5b5b64] bg-[#1a1a1a] border border-[#2a2a2a] rounded">
                        <Command className="h-2.5 w-2.5" />
                    </kbd>
                    <kbd className="flex items-center justify-center h-4 min-w-4 px-1 text-[10px] font-medium text-[#5b5b64] bg-[#1a1a1a] border border-[#2a2a2a] rounded">
                        K
                    </kbd>
                </div>
            </div>

            {/* Right-side actions */}
            <div className="flex items-center gap-2 ml-auto">
                {/* Ask AI Toggle */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DockPanelTrigger panel="ask" asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="hidden md:inline-flex text-muted-foreground hover:text-foreground"
                                disableScale={true}
                                disableHover={true}
                            >
                                <svg width="16px" height="16px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" className="shrink-0 w-4 h-4 text-foreground opacity-100 -ml-[3px] mr-[5px]">
                                    <path d="M13.4937 2.79004L13.0291 1.58215C12.9714 1.4322 12.8273 1.33325 12.6667 1.33325C12.506 1.33325 12.3619 1.4322 12.3043 1.58215L11.8397 2.79004C11.772 2.9661 11.6329 3.10523 11.4568 3.17295L10.2489 3.63753C10.0989 3.6952 10 3.83926 10 3.99992C10 4.16058 10.0989 4.30464 10.2489 4.36231L11.4568 4.82689C11.6329 4.89461 11.772 5.03374 11.8397 5.2098L12.3043 6.41769C12.3619 6.56764 12.506 6.66659 12.6667 6.66659C12.8273 6.66659 12.9714 6.56764 13.0291 6.41769L13.4937 5.2098C13.5613 5.03374 13.7005 4.89461 13.8765 4.82689L15.0845 4.36231C15.2344 4.30464 15.3333 4.16058 15.3333 3.99992C15.3333 3.83926 15.2344 3.6952 15.0845 3.63753L13.8765 3.17295C13.7005 3.10523 13.5613 2.9661 13.4937 2.79004Z" fill="currentColor"></path>
                                    <path d="M8.00131 2.66675L4.00128 2.66675C2.89671 2.66675 2.00128 3.56219 2.00128 4.66675V10.0239C2.00128 11.1285 2.89671 12.0239 4.00128 12.0239H5.7677C5.92432 12.0239 6.07593 12.0791 6.19597 12.1797L7.99845 13.6906L9.82512 12.1772C9.94472 12.0781 10.0951 12.0239 10.2504 12.0239H12.0013C13.1058 12.0239 14.0013 11.1285 14.0013 10.0239V8.67868" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                Ask AI
                            </Button>
                        </DockPanelTrigger>
                    </TooltipTrigger>
                    <TooltipContent>Ask the AI assistant for help</TooltipContent>
                </Tooltip>

                {/* Mobile search icon */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden rounded-lg text-[#5b5b64] hover:text-white hover:bg-[#1a1a1a] h-8 w-8 transition-all duration-200"
                >
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                </Button>

                {/* Notifications */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-lg text-[#5b5b64] hover:text-white hover:bg-[#1a1a1a] h-8 w-8 transition-all duration-200"
                >
                    <Bell className="h-4 w-4" />
                    {/* Notification dot */}
                    <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7] ring-[1.5px] ring-[#0a0a0a]" />
                    <span className="sr-only">Notifications</span>
                </Button>

                {/* Theme selector */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="
                            flex items-center gap-2 pl-1 pr-2 py-1
                            rounded-lg
                            hover:bg-[#1a1a1a]
                            transition-all duration-200
                            focus-visible:outline-none
                            focus-visible:ring-1 focus-visible:ring-[#a855f7]/50
                        ">
                            {/* Gradient ring avatar */}
                            <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-[#a855f7] to-[#22c55e] p-[1.5px] shrink-0">
                                <Avatar className="h-full w-full">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                                    <AvatarFallback className="bg-[#0a0a0a] text-[11px] text-white font-medium">
                                        EC
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <span className="hidden md:block text-[13px] font-medium text-[#e5e5e8] max-w-[100px] truncate">
                                ElevenCreative
                            </span>
                            <ChevronDown className="hidden md:block h-3.5 w-3.5 text-[#5b5b64] shrink-0" />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        sideOffset={8}
                        className="w-52 bg-[#111111] border border-[#1f1f1f] text-[#e5e5e8] rounded-xl shadow-2xl"
                    >
                        <DropdownMenuLabel className="text-xs font-normal text-[#5b5b64] pb-1">
                            Signed in as
                            <span className="block font-medium text-[#e5e5e8] mt-0.5 text-sm truncate">
                                user@elevencreative.io
                            </span>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-[#1f1f1f]" />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="gap-2 rounded-lg text-[13px] cursor-pointer hover:bg-[#1a1a1a] focus:bg-[#1a1a1a]">
                                <User className="h-4 w-4 text-[#5b5b64]" />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 rounded-lg text-[13px] cursor-pointer hover:bg-[#1a1a1a] focus:bg-[#1a1a1a]">
                                <Settings2 className="h-4 w-4 text-[#5b5b64]" />
                                Settings
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator className="bg-[#1f1f1f]" />
                        <DropdownMenuItem className="gap-2 rounded-lg text-[13px] cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-300">
                            <LogOut className="h-4 w-4" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
