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
} from "@/components/ui/dropdown-menu"

export function Topbar() {
    const [searchFocused, setSearchFocused] = useState(false)

    return (
        <header className="sticky top-0 z-20 flex h-14 w-full items-center gap-3 border-b border-[#1a1a1a] bg-[#0a0a0a]/95 backdrop-blur-md px-4 md:px-6">
            {/* Mobile hamburger / sidebar trigger */}
            <SidebarTrigger className="text-[#5b5b64] hover:text-white hover:bg-[#1a1a1a] h-8 w-8 rounded-lg transition-all duration-200 shrink-0" />

            {/* Search bar */}
            <div
                className={`
                    hidden md:flex items-center flex-1 max-w-sm relative
                    transition-all duration-300
                    ${searchFocused ? "max-w-md" : "max-w-sm"}
                `}
            >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#5b5b64] pointer-events-none transition-colors duration-200 z-10" />
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
                        focus-visible:ring-1 focus-visible:ring-[#a855f7]/50
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

                {/* User avatar + dropdown */}
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
