import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { PlatformProvider } from "@/components/dashboard/platform-context"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <PlatformProvider>
            <DashboardShell>{children}</DashboardShell>
        </PlatformProvider>
    )
}
