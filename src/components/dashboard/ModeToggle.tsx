"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                            <Sun className="h-[1rem] w-[1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                            <Moon className="absolute h-[1rem] w-[1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>Switch Theme</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-32 bg-card border border-border text-foreground rounded-xl shadow-2xl">
                <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2 rounded-lg text-[13px] cursor-pointer hover:bg-accent focus:bg-accent">
                    <Sun className="h-4 w-4" />
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2 rounded-lg text-[13px] cursor-pointer hover:bg-accent focus:bg-accent">
                    <Moon className="h-4 w-4" />
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="gap-2 rounded-lg text-[13px] cursor-pointer hover:bg-accent focus:bg-accent">
                    <span className="h-4 w-4 flex items-center justify-center font-bold text-[10px]">S</span>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
