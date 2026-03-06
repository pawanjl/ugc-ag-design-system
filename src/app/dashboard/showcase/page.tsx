/**
 * Component Showcase — /dashboard/showcase
 *
 * Visual reference for all design system components in /components/ds.
 * This is a dev-only page; not meant for production.
 */
"use client"

import { useState } from "react"
import {
    AnnouncementBanner, PageHeader, SectionHeading,
    QuickActionGrid, VoiceLibraryList, VoiceActionCard,
    Breadcrumb, PageTabNav, FilterChip, FilterBar,
    SearchInput, StatusBadge, MethodBadge, DataTable,
    Button, IconButton, IconLinkCard, IconLinkGrid,
    ProfileMenu, PromptComposer, TopBar, FaqSection, PricingCard,
} from "@/components/ds"
import { Mic, BookOpen, Film, Bot, Music2, Globe2, Sparkles, Copy, Layers, Key, Grid2x2, Code, Library, Cpu, Tag, Bell, RefreshCw } from "lucide-react"

const QUICK_ACTIONS = [
    { label: "Instant speech", icon: <Mic className="w-12 h-12 text-[#a855f7]" /> },
    { label: "Audiobook", icon: <BookOpen className="w-12 h-12 text-[#f97316]" /> },
    { label: "Image & Video", icon: <Film className="w-12 h-12 text-[#22c55e]" /> },
    { label: "ElevenAgents", icon: <Bot className="w-12 h-12 text-[#a855f7]" /> },
    { label: "Music", icon: <Music2 className="w-12 h-12 text-[#f97316]" /> },
    { label: "Dubbed video", icon: <Globe2 className="w-12 h-12 text-[#22c55e]" /> },
]
const LIBRARY_VOICES = [
    { name: "Leo - Energetic, Iviting, and Round", description: "Leo – Energetic Hindi Voice – An energetic Hindi lively voice with standard…", verified: true },
    { name: "Sara - Professional, Clear and Versatile", description: "Saira – Young Casual Voice – Saira is a pen name of a very talented Indian…", verified: true },
    { name: "Viraj - Deep, Suspenseful and Mysterious", description: "Viraj – Thriller & Mystery Audiobook Narrator – Viraj's voice is a perfect mat…", verified: true },
]
const VOICE_ACTIONS = [
    { title: "Voice Design", description: "Design an entirely new voice from a text prompt", icon: <Sparkles className="w-8 h-8 text-[#a855f7]" /> },
    { title: "Clone your Voice", description: "Create a realistic digital clone of your voice", icon: <Copy className="w-8 h-8 text-[#22c55e]" /> },
    { title: "Voice Collections", description: "Curated AI voices for every use case", icon: <Layers className="w-8 h-8 text-[#f97316]" /> },
]

const REQUEST_LOG_ROWS = [
    { code: 200, method: "GET", request: "/v1/convai/knowledge-base/rag-index", user: "2024eb01269@online.bits-pi…", latency: "27ms", timestamp: "Mar 06, 2026, 07:11:17" },
    { code: 200, method: "GET", request: "/v1/convai/knowledge-base?folders_first=true&parent_folder_id=root", user: "2024eb01269@online.bits-pi…", latency: "11ms", timestamp: "Mar 06, 2026, 07:11:17" },
    { code: 200, method: "GET", request: "/v1/convai/agents?archived=false", user: "2024eb01269@online.bits-pi…", latency: "11ms", timestamp: "Mar 02, 2026, 05:10:53" },
    { code: 200, method: "GET", request: "/v1/convai/analytics/live-count", user: "2024eb01269@online.bits-pi…", latency: "10ms", timestamp: "Mar 02, 2026, 05:10:53" },
    { code: 404, method: "POST", request: "/v1/convai/voices", user: "demo@example.com", latency: "5ms", timestamp: "Mar 01, 2026, 12:00:00" },
    { code: 500, method: "DELETE", request: "/v1/convai/agents/xyz", user: "admin@example.com", latency: "80ms", timestamp: "Feb 28, 2026, 09:30:00" },
]

const TABLE_COLUMNS = [
    { key: "code", label: "Code", width: "70px" },
    { key: "method", label: "Method", width: "90px" },
    { key: "request", label: "Request", width: "auto" },
    { key: "user", label: "User", width: "200px", align: "right" as const },
    { key: "latency", label: "Latency", width: "70px", align: "right" as const },
    { key: "timestamp", label: "Timestamp", width: "165px", align: "right" as const },
]

const DEVELOPER_TABS = [
    { label: "Overview", value: "overview" },
    { label: "API Keys", value: "apikeys" },
    { label: "Webhooks", value: "webhooks" },
    { label: "Analytics", value: "analytics" },
    { label: "Request Log", value: "requestlog" },
]

const FILTER_CHIPS = [
    { id: "method", label: "Method", active: false },
    { id: "code", label: "Code", active: false },
    { id: "pattern", label: "Pattern", active: true, count: 4, countLabel: "4 patterns" },
    { id: "apikey", label: "XI API Key", active: false },
    { id: "starttime", label: "Start Time", active: false },
    { id: "endtime", label: "End Time", active: false },
    { id: "minlatency", label: "Min Latency", active: false },
    { id: "maxlatency", label: "Max Latency", active: false },
    { id: "user", label: "User", active: false },
]

export default function ShowcasePage() {
    const [activeTab, setActiveTab] = useState("requestlog")

    return (
        <div className="min-h-screen bg-[#0a0a0a] py-10 px-8">
            <div className="max-w-5xl mx-auto space-y-16">

                {/* ── Header ──────────────────────────────────────── */}
                <div className="border-b border-[#1a1a1a] pb-6">
                    <p className="text-xs font-mono text-[#3a3a3a] mb-1">Design System · /components/ds</p>
                    <h1 className="text-2xl font-semibold text-[#e5e5e8]">Component Showcase</h1>
                    <p className="text-sm text-[#787881] mt-1">Figma: ElevenLabs --- UI-UX (nodes 1:12 · 7:1595)</p>
                </div>

                {/* ═══════════════════════════════════════════════════
            NODE 1:12 — Homepage components
        ═══════════════════════════════════════════════════ */}
                <div className="border-b border-[#1a1a1a] pb-2">
                    <p className="text-[11px] font-mono text-[#a855f7] uppercase tracking-widest">Figma node 1:12 · Homepage</p>
                </div>

                {/* AnnouncementBanner */}
                <section className="space-y-4">
                    <h2 className="text-xs font-mono text-[#3a3a3a] uppercase tracking-wider">AnnouncementBanner · node 1:25</h2>
                    <div className="flex flex-col gap-3 items-start">
                        <AnnouncementBanner badge="New" message="Introducing the Eleven Album" href="#" />
                        <AnnouncementBanner badge="Beta" message="Try Voice Design for v3" onDismiss={() => { }} />
                    </div>
                </section>

                {/* PageHeader */}
                <section className="space-y-4">
                    <h2 className="text-xs font-mono text-[#3a3a3a] uppercase tracking-wider">PageHeader · node 1:69</h2>
                    <PageHeader eyebrow="My Workspace" title="Good morning, Ricky" />
                </section>

                {/* SectionHeading */}
                <section className="space-y-4">
                    <h2 className="text-xs font-mono text-[#3a3a3a] uppercase tracking-wider">SectionHeading · node 1:336</h2>
                    <div className="space-y-3 max-w-xl">
                        <SectionHeading>Latest from the library</SectionHeading>
                        <SectionHeading action={{ label: "View all →", href: "#" }}>Create or clone a voice</SectionHeading>
                    </div>
                </section>

                {/* QuickActionGrid */}
                <section className="space-y-4">
                    <h2 className="text-xs font-mono text-[#3a3a3a] uppercase tracking-wider">QuickActionCard · QuickActionGrid · node 1:84</h2>
                    <QuickActionGrid items={QUICK_ACTIONS} />
                </section>

                {/* VoiceLibraryList */}
                <section className="space-y-4">
                    <h2 className="text-xs font-mono text-[#3a3a3a] uppercase tracking-wider">VoiceLibraryItem · VoiceLibraryList · node 1:344</h2>
                    <div className="max-w-lg border border-[#1a1a1a] rounded-xl p-3">
                        <VoiceLibraryList
                            items={LIBRARY_VOICES.map(v => ({ ...v, onPlay: () => { }, onAdd: () => { } }))}
                            onExplore={() => { }}
                        />
                    </div>
                </section>

                {/* VoiceActionCard */}
                <section className="space-y-4">
                    <h2 className="text-xs font-mono text-[#3a3a3a] uppercase tracking-wider">VoiceActionCard · node 1:480</h2>
                    <div className="max-w-[560px] space-y-2">
                        {VOICE_ACTIONS.map(a => <VoiceActionCard key={a.title} {...a} onClick={() => { }} />)}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
            NODE 7:1595 — Developers / Request Log components
        ═══════════════════════════════════════════════════ */}
                <div className="border-b border-[#1a1a1a] pb-2 pt-4">
                    <p className="text-[11px] font-mono text-[#22c55e] uppercase tracking-widest">Figma node 7:1595 · Developers / Request Log</p>
                </div>

                {/* Breadcrumb */}
                <section className="space-y-4">
                    <h2 className="text-xs font-mono text-[#3a3a3a] uppercase tracking-wider">Breadcrumb · node 7:1851</h2>
                    <Breadcrumb items={[{ label: "Developers", href: "#" }, { label: "Request Log" }]} />
                </section>

                {/* PageTabNav */}
                <section className="space-y-4">
                    <h2 className="text-xs font-mono text-[#3a3a3a] uppercase tracking-wider">PageTabNav · node 7:1625</h2>
                    <PageTabNav
                        tabs={DEVELOPER_TABS}
                        active={activeTab}
                        onChange={setActiveTab}
                    />
                    <p className="text-xs text-[#3a3a3a]">Active: <code className="bg-[#141414] px-1 rounded">{activeTab}</code></p>
                </section>

                {/* SearchInput */}
                <section className="space-y-4">
                    <h2 className="text-xs font-mono text-[#3a3a3a] uppercase tracking-wider">SearchInput · node 7:1646</h2>
                    <div className="max-w-2xl space-y-3">
                        <SearchInput placeholder="Search path or query..." />
                        <SearchInput
                            placeholder="Search path or query..."
                            action={{ label: "Jump to timestamp", onClick: () => { } }}
                        />
                    </div>
                </section>

                {/* FilterChip + FilterBar */}
                <section className="space-y-4">
                    <h2 className="text-xs font-mono text-[#3a3a3a] uppercase tracking-wider">FilterChip · FilterBar · node 7:1657</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 flex-wrap">
                            <FilterChip label="Method" onAdd={() => { }} />
                            <FilterChip label="Pattern" active count={4} countLabel="4 patterns" onRemove={() => { }} />
                            <FilterChip label="XI API Key" onAdd={() => { }} />
                        </div>
                        <div className="border border-[#1a1a1a] rounded-xl p-3">
                            <p className="text-[10px] font-mono text-[#3a3a3a] mb-3">{"<FilterBar />"} (full row)</p>
                            <FilterBar chips={FILTER_CHIPS} onClearAll={() => { }} />
                        </div>
                    </div>
                </section>

                {/* StatusBadge + MethodBadge */}
                <section className="space-y-4">
                    <h2 className="text-xs font-mono text-[#3a3a3a] uppercase tracking-wider">StatusBadge · MethodBadge · node 7:1753</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 flex-wrap">
                            <StatusBadge code={200} />
                            <StatusBadge code={301} />
                            <StatusBadge code={404} />
                            <StatusBadge code={500} />
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <MethodBadge method="GET" />
                            <MethodBadge method="POST" />
                            <MethodBadge method="PUT" />
                            <MethodBadge method="PATCH" />
                            <MethodBadge method="DELETE" />
                        </div>
                    </div>
                </section>

                {/* DataTable */}
                <section className="space-y-4">
                    <h2 className="text-xs font-mono text-[#3a3a3a] uppercase tracking-wider">DataTable · node 7:1729</h2>
                    <DataTable
                        columns={TABLE_COLUMNS}
                        rows={REQUEST_LOG_ROWS as Record<string, unknown>[]}
                        renderCell={(row, key) => {
                            if (key === "code") return <StatusBadge code={row.code as number} />
                            if (key === "method") return <MethodBadge method={row.method as string} />
                            return String(row[key] ?? "")
                        }}
                        onRowAction={() => { }}
                        maxHeight="400px"
                    />
                    <div className="border border-[#1a1a1a] rounded-xl p-3 mt-4">
                        <p className="text-[10px] font-mono text-[#3a3a3a] mb-3">Empty state</p>
                        <DataTable
                            columns={TABLE_COLUMNS}
                            rows={[]}
                            emptyMessage="No more requests found."
                            maxHeight="120px"
                        />
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    NODE 9:4 — Button system
                ═══════════════════════════════════════════════════ */}
                <div className="border-b border-[#1a1a1a] pb-2 pt-4">
                    <p className="text-[11px] font-mono text-[#f97316] uppercase tracking-widest">Figma node 9:4 · Buttons</p>
                </div>

                {/* Button variants */}
                <section className="space-y-4">
                    <h2 className="text-xs font-mono text-[#3a3a3a] uppercase tracking-wider">Button · node 9:99 + 9:92</h2>
                    <div className="space-y-4">
                        {/* variant row */}
                        <div className="flex flex-wrap items-center gap-3">
                            <Button variant="primary">Generate speech</Button>
                            <Button variant="secondary">Enhance</Button>
                            <Button variant="ghost">Feedback</Button>
                            <Button variant="danger">Delete voice</Button>
                        </div>
                        {/* sizes */}
                        <div className="flex flex-wrap items-center gap-3">
                            <Button variant="primary" size="sm">Small</Button>
                            <Button variant="primary" size="md">Medium (default)</Button>
                            <Button variant="primary" size="lg">Large</Button>
                        </div>
                        {/* with icons */}
                        <div className="flex flex-wrap items-center gap-3">
                            <Button variant="primary" icon={<Mic className="w-4 h-4" />}>Generate speech</Button>
                            <Button variant="secondary" icon={<RefreshCw className="w-4 h-4" />}>Enhance</Button>
                            <Button variant="secondary" loading>Loading…</Button>
                            <Button variant="primary" disabled>Disabled</Button>
                        </div>
                        {/* IconButton */}
                        <div className="flex items-center gap-2">
                            <p className="text-[10px] font-mono text-[#3a3a3a] w-24">{"<IconButton />"}</p>
                            <IconButton variant="secondary" size="md" aria-label="Notifications"><Bell className="w-4 h-4" /></IconButton>
                            <IconButton variant="ghost" size="md" aria-label="Refresh"><RefreshCw className="w-4 h-4" /></IconButton>
                            <IconButton variant="danger" size="md" aria-label="Delete"><Copy className="w-4 h-4" /></IconButton>
                        </div>
                    </div>
                </section>

                {/* IconLinkCard + IconLinkGrid */}
                <section className="space-y-4">
                    <h2 className="text-xs font-mono text-[#3a3a3a] uppercase tracking-wider">IconLinkCard · IconLinkGrid · node 9:37</h2>
                    <IconLinkGrid items={[
                        { id: "apikey", label: "Create an API Key", icon: <Key className="w-5 h-5" />, href: "#" },
                        { id: "models", label: "Browse Models", icon: <Grid2x2 className="w-5 h-5" />, href: "#" },
                        { id: "apiref", label: "API Reference", icon: <Code className="w-5 h-5" />, href: "#" },
                        { id: "sdks", label: "Libraries & SDKs", icon: <Library className="w-5 h-5" />, href: "#" },
                        { id: "agents", label: "ElevenAgents", icon: <Bot className="w-5 h-5" />, href: "#" },
                        { id: "pricing", label: "Pricing Overview", icon: <Tag className="w-5 h-5" />, href: "#" },
                    ]} />
                </section>

                {/* ═══════════════════════════════════════════════════
                    NODE 10:5545, 10:5163, 10:5104 — New components (Batch 3)
                ═══════════════════════════════════════════════════ */}
                <div className="border-b border-[#1a1a1a] pb-2 pt-4">
                    <p className="text-[11px] font-mono text-[#a855f7] uppercase tracking-widest">Figma nodes 10:5545 · 10:5163 · 10:5104 · 7:5684 · 7:3886 · Batch 3</p>
                </div>

                {/* ProfileMenu */}
                <section className="space-y-4">
                    <h2 className="text-xs font-mono text-[#3a3a3a] uppercase tracking-wider">ProfileMenu · node 10:5545</h2>
                    <div className="flex items-start gap-8 flex-wrap">
                        <ProfileMenu
                            workspaceName="Ricky's Workspace"
                            workspacePlan="Creator"
                            totalCredits={100000}
                            remainingCredits={87570}
                            sections={[
                                [
                                    { label: "Account", href: "#" },
                                    { label: "Billing & Usage", href: "#" },
                                    { label: "Workspace settings", href: "#" },
                                ],
                                [
                                    { label: "Documentation", href: "#" },
                                    { label: "API Reference", href: "#" },
                                ],
                            ]}
                            onSignOut={() => { }}
                        />
                    </div>
                </section>

                {/* PromptComposer */}
                <section className="space-y-4">
                    <h2 className="text-xs font-mono text-[#3a3a3a] uppercase tracking-wider">PromptComposer (ChatBox) · node 10:5163</h2>
                    <PromptComposerShowcase />
                </section>

                {/* TopBar */}
                <section className="space-y-4">
                    <h2 className="text-xs font-mono text-[#3a3a3a] uppercase tracking-wider">TopBar · node 10:5104</h2>
                    <div className="border border-[#1a1a1a] rounded-xl overflow-hidden">
                        <TopBar
                            breadcrumbs={[{ label: "Music", href: "#" }, { label: "Explore" }]}
                            creditPercentage={12}
                            avatarLabel="RB"
                            onFeedback={() => { }}
                            onAsk={() => { }}
                            onFiles={() => { }}
                            onNotifications={() => { }}
                            onProfile={() => { }}
                        />
                    </div>
                </section>

                {/* FaqSection */}
                <section className="space-y-4">
                    <h2 className="text-xs font-mono text-[#3a3a3a] uppercase tracking-wider">FaqSection · node 7:5684</h2>
                    <div className="border border-[#1a1a1a] rounded-xl overflow-hidden">
                        <FaqSection
                            items={[
                                { question: "What's the maximum amount of text I can generate?", answer: "The character limit depends on your plan. Free users get 10,000 characters/month." },
                                { question: "Can the content I generate be used for commercial purposes?", answer: "Yes on paid plans. Free plan has restrictions." },
                                { question: "How do I know how many credits I have remaining?", answer: "Check your credit balance in the top-right corner of the dashboard." },
                                { question: "Am I charged for every request?", answer: "Credits are deducted per request. Failed server-error requests are not charged." },
                            ]}
                            onAsk={() => { }}
                        />
                    </div>
                </section>

                {/* PricingCard */}
                <section className="space-y-4">
                    <h2 className="text-xs font-mono text-[#3a3a3a] uppercase tracking-wider">PricingCard · node 7:3886</h2>
                    <div className="flex gap-4 flex-wrap">
                        <PricingCard
                            planName="Creator"
                            promoBadge="First month 50% off"
                            originalPrice="₹1,936"
                            price="₹968"
                            priceSuffix="/month"
                            description="For creators making premium content for global audiences"
                            ctaLabel="Subscribe"
                            onCta={() => { }}
                        />
                        <PricingCard
                            planName="Pro"
                            price="₹3,872"
                            priceSuffix="/month"
                            description="For power users and professional teams"
                            ctaLabel="Subscribe"
                            highlighted
                            onCta={() => { }}
                        />
                    </div>
                </section>

                <div className="border-t border-[#1a1a1a] pt-6 pb-12">
                    <p className="text-xs text-[#3a3a3a]">Import from <code className="bg-[#141414] px-1 py-0.5 rounded">@/components/ds</code></p>
                </div>
            </div>
        </div>
    )
}

function PromptComposerShowcase() {
    const [val, setVal] = useState("Compose a melancholic post-rock instrumental with reverb-heavy guitars and a slow, dramatic crescendo.")
    return (
        <div className="flex justify-center bg-[#050505] rounded-xl p-8">
            <PromptComposer
                value={val}
                onChange={setVal}
                onSubmit={(v) => alert("Submit: " + v.slice(0, 40) + "…")}
                credits="900 credits/min"
                disclaimer={{ text: "For downloading and broad commercial use,", linkLabel: "upgrade" }}
            />
        </div>
    )
}

