"use client"

import * as React from "react"

export type Platform = "elevenCreative" | "elevenAgents" | "elevenAPI"

interface PlatformContextValue {
    platform: Platform
    setPlatform: (platform: Platform) => void
}

const PlatformContext = React.createContext<PlatformContextValue | undefined>(undefined)

export function PlatformProvider({ children }: { children: React.ReactNode }) {
    const [platform, setPlatform] = React.useState<Platform>("elevenCreative")

    const value = React.useMemo(
        () => ({
            platform,
            setPlatform,
        }),
        [platform],
    )

    return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>
}

export function usePlatform(): PlatformContextValue {
    const context = React.useContext(PlatformContext)

    if (!context) {
        throw new Error("usePlatform must be used within a PlatformProvider")
    }

    return context
}

