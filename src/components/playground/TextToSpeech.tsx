"use client"

import React, { useState, useRef, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
    ChevronDown,
    ChevronRight,
    X,
    Zap,
    RotateCcw,
    Mic,
    Sparkles,
    History,
    Settings,
    AudioLines,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────
   DESIGN TOKENS (from Figma node 7:2237 — adapted to dark theme)
   ───────────────────────────────────────────────────────────── */
// Background: #0a0a0a | Surface: #141414 | Border: #262626
// Text: #e5e5e8 | Muted text: rgba(229,229,232,0.5)
// Accent: #a855f7 | Active: #e5e5e8 | Emotion tag: #b644c5

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
interface Voice {
    id: string
    name: string
    initials: string
    color: string // gradient / solid
}

interface ModelOption {
    id: string
    label: string
    badge?: string
}

/* ─────────────────────────────────────────────────────────────
   STATIC DATA
   ───────────────────────────────────────────────────────────── */
const VOICES: Voice[] = [
    { id: "harry", name: "Harry - Fierce Warrior", initials: "HF", color: "from-orange-500 to-red-600" },
    { id: "rachel", name: "Rachel", initials: "RA", color: "from-purple-500 to-pink-600" },
    { id: "adam", name: "Adam", initials: "AD", color: "from-blue-500 to-cyan-600" },
    { id: "emily", name: "Emily", initials: "EM", color: "from-green-500 to-teal-600" },
]

const MODELS: ModelOption[] = [
    { id: "eleven-v3", label: "Eleven v3", badge: "v3" },
    { id: "eleven-turbo-v2", label: "Eleven Turbo v2.5", badge: "v2.5" },
    { id: "eleven-multilingual-v2", label: "Eleven Multilingual v2", badge: "v2" },
    { id: "eleven-flash-v2", label: "Eleven Flash v2.5", badge: "Flash" },
]

const MAX_CHARS = 5000
const CREDITS = 10000

/* ─────────────────────────────────────────────────────────────
   SUB-COMPONENTS
   ───────────────────────────────────────────────────────────── */

/** Small avatar circle used for voice chips */
function VoiceAvatar({ voice, size = "sm" }: { voice: Voice; size?: "sm" | "md" }) {
    const sz = size === "sm" ? "w-4 h-4 text-[9px]" : "w-5 h-5 text-[10px]"
    return (
        <span className={cn("rounded-full bg-gradient-to-br flex items-center justify-center font-semibold text-white shrink-0", sz, voice.color)}>
            {voice.initials.slice(0, 2)}
        </span>
    )
}

/** Voice selector chip (top of editor) */
function VoiceChip({ voice, onClick }: { voice: Voice; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#262626] bg-[#141414] hover:bg-[#1a1a1a] transition-colors text-sm font-medium text-[#e5e5e8] shrink-0"
        >
            <VoiceAvatar voice={voice} size="sm" />
            {voice.name}
        </button>
    )
}

/** Emotion / expression tag rendered inline in the text preview */
function EmotionTag({ label }: { label: string }) {
    return (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md border border-[#b644c5]/30 text-[#b644c5] text-sm font-medium">
            [{label}]
        </span>
    )
}

/** Settings Panel — right side */
function SettingsPanel({
    selectedVoice,
    onVoiceChange,
    selectedModel,
    onModelChange,
    stability,
    onStabilityChange,
    languageOverride,
    onLanguageOverrideChange,
    onResetValues,
}: {
    selectedVoice: Voice
    onVoiceChange: (v: Voice) => void
    selectedModel: ModelOption
    onModelChange: (m: ModelOption) => void
    stability: number
    onStabilityChange: (v: number) => void
    languageOverride: boolean
    onLanguageOverrideChange: (v: boolean) => void
    onResetValues: () => void
}) {
    const [activeTab, setActiveTab] = useState<"settings" | "history">("settings")
    const [showBanner, setShowBanner] = useState(true)
    const [voiceOpen, setVoiceOpen] = useState(false)
    const [modelOpen, setModelOpen] = useState(false)

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* ── Tabs ── */}
            <div className="flex gap-4 px-5 pt-2 border-b border-[#1a1a1a] shrink-0">
                {(["settings", "history"] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "pb-2.5 pt-2 text-sm font-medium capitalize border-b-[1.5px] -mb-px transition-colors",
                            activeTab === tab
                                ? "border-[#e5e5e8] text-[#e5e5e8]"
                                : "border-transparent text-[#787881] hover:text-[#a6a6ae]"
                        )}
                    >
                        {tab === "settings" ? <Settings className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" /> : <History className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />}
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* ── Content ── */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 styled-scrollbar">
                {activeTab === "settings" && (
                    <>
                        {/* ── Voice Design Promo Banner ── */}
                        {showBanner && (
                            <div className="relative flex items-start gap-3 rounded-2xl border border-[#262626] bg-[#141414] p-4 overflow-hidden">
                                {/* Gradient shimmer accent */}
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-orange-500/5 pointer-events-none" />
                                {/* Icon placeholder */}
                                <div className="relative w-[80px] h-[80px] shrink-0 rounded-lg bg-[#0a0a0a] border border-[#262626] flex items-center justify-center">
                                    <Sparkles className="w-8 h-8 text-[#a855f7]" />
                                </div>
                                <div className="flex-1 min-w-0 relative">
                                    <p className="text-sm font-medium text-[#e5e5e8]">Try Voice Design for v3</p>
                                    <p className="text-xs text-[rgba(229,229,232,0.55)] mt-1 leading-relaxed">
                                        Create expressive voices for the Eleven v3 Text to Speech model
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowBanner(false)}
                                    className="relative shrink-0 rounded-lg p-1.5 hover:bg-[#1a1a1a] transition-colors"
                                >
                                    <X className="w-3 h-3 text-[#787881]" />
                                </button>
                            </div>
                        )}

                        {/* ── Voice Selector ── */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#e5e5e8]">Voice</label>
                            <div className="relative">
                                <button
                                    onClick={() => { setVoiceOpen(!voiceOpen); setModelOpen(false) }}
                                    className="w-full flex items-center justify-between gap-3 px-3 py-2 h-10 rounded-lg border border-[#262626] bg-[#141414] hover:bg-[#1a1a1a] transition-colors text-sm text-[#e5e5e8]"
                                >
                                    <span className="flex items-center gap-2">
                                        <VoiceAvatar voice={selectedVoice} size="sm" />
                                        {selectedVoice.name}
                                    </span>
                                    <ChevronDown className={cn("w-4 h-4 text-[#787881] transition-transform", voiceOpen && "rotate-180")} />
                                </button>
                                {voiceOpen && (
                                    <div className="absolute z-20 top-full mt-1 left-0 right-0 rounded-lg border border-[#262626] bg-[#0f0f10] shadow-xl shadow-black/30 overflow-hidden">
                                        {VOICES.map((v) => (
                                            <button
                                                key={v.id}
                                                onClick={() => { onVoiceChange(v); setVoiceOpen(false) }}
                                                className={cn(
                                                    "w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-[#1a1a1a] transition-colors",
                                                    v.id === selectedVoice.id ? "text-[#e5e5e8]" : "text-[#787881]"
                                                )}
                                            >
                                                <VoiceAvatar voice={v} size="sm" />
                                                {v.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ── Model Selector ── */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-[#e5e5e8]">Model</label>
                                <a href="#" className="text-xs text-[#e5e5e8] underline underline-offset-2 hover:text-[#a6a6ae] flex items-center gap-0.5">
                                    Best practices <ChevronRight className="w-3 h-3" />
                                </a>
                            </div>
                            {/* Model card with gradient shimmer */}
                            <div className="relative rounded-xl border border-[#262626] overflow-hidden p-1">
                                {/* Gradient shimmer background */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background:
                                            "linear-gradient(140deg, rgba(102,253,255,0) 37%, rgba(102,253,255,0.08) 39%, rgba(222,75,242,0.08) 42%, rgba(254,99,1,0.06) 47%, transparent 60%)",
                                    }}
                                />
                                <div className="relative">
                                    <button
                                        onClick={() => { setModelOpen(!modelOpen); setVoiceOpen(false) }}
                                        className="w-full flex items-center justify-between gap-3 px-3 py-2 h-[38px] rounded-lg border border-[#262626] bg-[#0a0a0a] text-sm text-[#e5e5e8] hover:bg-[#141414] transition-colors"
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded border border-[#262626] bg-gradient-to-r from-cyan-400/20 to-purple-400/20 text-[9px] font-bold text-[#e5e5e8] uppercase tracking-wide">
                                                {selectedModel.badge ?? "v3"}
                                            </span>
                                            {selectedModel.label}
                                        </span>
                                        <ChevronDown className={cn("w-4 h-4 text-[#787881] transition-transform", modelOpen && "rotate-180")} />
                                    </button>
                                    {modelOpen && (
                                        <div className="absolute z-20 top-full mt-1 left-0 right-0 rounded-lg border border-[#262626] bg-[#0f0f10] shadow-xl shadow-black/30 overflow-hidden">
                                            {MODELS.map((m) => (
                                                <button
                                                    key={m.id}
                                                    onClick={() => { onModelChange(m); setModelOpen(false) }}
                                                    className={cn(
                                                        "w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-[#1a1a1a] transition-colors",
                                                        m.id === selectedModel.id ? "text-[#e5e5e8]" : "text-[#787881]"
                                                    )}
                                                >
                                                    <span className="inline-flex items-center px-1 py-0.5 rounded text-[8px] font-bold border border-[#262626] text-[#a6a6ae] uppercase tracking-wide">
                                                        {m.badge}
                                                    </span>
                                                    {m.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ── Stability Slider ── */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-[#e5e5e8] underline underline-offset-2 decoration-dotted cursor-help">
                                    Stability
                                </label>
                            </div>
                            <div className="flex items-center justify-between text-xs text-[rgba(229,229,232,0.5)] -mb-1">
                                <span>Creative</span>
                                <span>Robust</span>
                            </div>
                            <Slider
                                value={[stability]}
                                onValueChange={([v]) => onStabilityChange(v)}
                                min={0}
                                max={100}
                                step={1}
                                className="w-full [&_[role=slider]]:bg-[#e5e5e8] [&_[role=slider]]:border-[#e5e5e8] [&_[role=slider]]:shadow-md [&_.bg-primary]:bg-[#e5e5e8]"
                            />
                        </div>

                        {/* ── Language Override Toggle ── */}
                        <div className="flex items-center justify-between pb-1">
                            <label className="text-sm font-medium text-[#e5e5e8] underline underline-offset-2 decoration-dotted cursor-help">
                                Language Override
                            </label>
                            <Switch
                                checked={languageOverride}
                                onCheckedChange={onLanguageOverrideChange}
                                className="data-[state=checked]:bg-[#a855f7]"
                            />
                        </div>

                        {/* ── Reset Values ── */}
                        <div className="flex justify-end pt-1">
                            <button
                                onClick={onResetValues}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-[#787881] hover:text-[#e5e5e8] hover:bg-[#141414] transition-colors"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                Reset values
                            </button>
                        </div>
                    </>
                )}

                {activeTab === "history" && (
                    <div className="flex flex-col items-center justify-center h-48 text-center">
                        <History className="w-10 h-10 text-[#2a2a2a] mb-3" />
                        <p className="text-sm text-[#787881]">No generation history yet</p>
                        <p className="text-xs text-[#3a3a3a] mt-1">Your generated audio will appear here</p>
                    </div>
                )}
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE COMPONENT
   ───────────────────────────────────────────────────────────── */
export function TextToSpeechPage() {
    const [text, setText] = useState(
        `[thoughtful] Step one: borrow five BAYCs.\nRoute them to a wallet.\nStep two: claim the drop.\nFive apes × 10,094 APE = 50,470 APE.\n\n[surprised] Why did it work?\nSnapshot logic at claim time… no hold-time check… and easy NFT borrowing rails.\nNo hack — just the rules.`
    )
    const [selectedVoice, setSelectedVoice] = useState<Voice>(VOICES[0])
    const [selectedModel, setSelectedModel] = useState<ModelOption>(MODELS[0])
    const [stability, setStability] = useState(50)
    const [languageOverride, setLanguageOverride] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)

    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const charCount = text.length
    const creditsUsed = CREDITS

    const handleGenerate = async () => {
        setIsGenerating(true)
        await new Promise((r) => setTimeout(r, 2000))
        setIsGenerating(false)
    }

    const handleEnhance = () => {
        /* placeholder for Enhance AI action */
    }

    const handleReset = () => {
        setStability(50)
        setLanguageOverride(false)
    }

    /* Render text with [emotion] tags highlighted */
    const renderTextPreview = () => {
        const parts = text.split(/(\[[^\]]+\])/g)
        return parts.map((part, i) => {
            if (/^\[[^\]]+\]$/.test(part)) {
                return <EmotionTag key={i} label={part.slice(1, -1)} />
            }
            return <span key={i}>{part}</span>
        })
    }

    return (
        <div className="flex h-full min-h-0">
            {/* ════════════════════════════════════════════
                LEFT — Editor Area (flex-1)
               ════════════════════════════════════════════ */}
            <div className="flex flex-col flex-1 min-w-0 h-full">
                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto styled-scrollbar px-12 py-10">
                    <div className="max-w-[680px] mx-auto space-y-4">
                        {/* Voice chip */}
                        <VoiceChip voice={selectedVoice} onClick={() => { }} />

                        {/* Text editor */}
                        <div className="relative">
                            {/* Rendered preview (shows emotion tags highlighted) */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 text-base leading-7 text-[#e5e5e8] whitespace-pre-wrap break-words pointer-events-none px-0 py-0 overflow-hidden"
                            >
                                {text.length === 0 && (
                                    <span className="text-[rgba(229,229,232,0.3)] text-base">
                                        Type your text with audio tags like <EmotionTag label="laughs" /> to turn into expressive speech...
                                    </span>
                                )}
                                {text.length > 0 && renderTextPreview()}
                            </div>

                            {/* Actual textarea (transparent text, just for input) */}
                            <textarea
                                ref={textareaRef}
                                value={text}
                                onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
                                rows={18}
                                spellCheck
                                className="relative w-full bg-transparent resize-none text-base leading-7 text-transparent caret-[#e5e5e8] focus:outline-none placeholder:text-transparent overflow-hidden"
                                style={{ caretColor: "#e5e5e8" }}
                            />

                            {/* Bottom gradient fade */}
                            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
                        </div>

                        {/* Add speaker divider */}
                        <div className="flex items-center gap-3 py-1">
                            <div className="flex-1 h-px bg-[#1a1a1a]" />
                            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#787881] hover:text-[#e5e5e8] hover:bg-[#141414] transition-colors border border-transparent hover:border-[#262626]">
                                <AudioLines className="w-3.5 h-3.5" />
                                Add speaker
                            </button>
                            <div className="flex-1 h-px bg-[#1a1a1a]" />
                        </div>
                    </div>
                </div>

                {/* Footer toolbar — always visible */}
                <div className="shrink-0 border-t border-[#1a1a1a] bg-[#0a0a0a] px-12 py-3">
                    <div className="max-w-[680px] mx-auto flex items-center justify-between">
                        {/* Credits remaining */}
                        <div className="flex items-center gap-1.5 text-xs text-[rgba(229,229,232,0.5)]">
                            <div className="w-4 h-4 rounded-full border border-[#262626] flex items-center justify-center">
                                <Mic className="w-2.5 h-2.5" />
                            </div>
                            {creditsUsed.toLocaleString()} credits remaining
                        </div>

                        {/* Character count + actions */}
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-[rgba(229,229,232,0.4)]">
                                {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
                            </span>

                            {/* Enhance */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleEnhance}
                                className="h-9 px-4 border-[#262626] bg-[#141414] text-[#e5e5e8] hover:bg-[#1a1a1a] hover:text-white text-sm gap-1.5"
                            >
                                <span className="inline-flex items-center px-1 py-0.5 rounded text-[8px] font-bold border border-[#262626] text-[#a6a6ae] uppercase tracking-wide mr-0.5">
                                    {selectedModel.badge}
                                </span>
                                Enhance
                            </Button>

                            {/* Generate speech */}
                            <Button
                                onClick={handleGenerate}
                                disabled={isGenerating || charCount === 0}
                                size="sm"
                                className="h-9 px-4 bg-[#e5e5e8] text-[#0a0a0a] hover:bg-white font-medium text-sm disabled:opacity-40"
                            >
                                {isGenerating ? (
                                    <>
                                        <span className="animate-pulse">Generating…</span>
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-3.5 h-3.5 mr-1.5 fill-current" />
                                        Generate speech
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════════════
                RIGHT — Settings Panel (fixed 460px)
               ════════════════════════════════════════════ */}
            <div className="w-[460px] shrink-0 border-l border-[#1a1a1a] bg-[#0a0a0a] flex flex-col overflow-hidden">
                <SettingsPanel
                    selectedVoice={selectedVoice}
                    onVoiceChange={setSelectedVoice}
                    selectedModel={selectedModel}
                    onModelChange={setSelectedModel}
                    stability={stability}
                    onStabilityChange={setStability}
                    languageOverride={languageOverride}
                    onLanguageOverrideChange={setLanguageOverride}
                    onResetValues={handleReset}
                />
            </div>
        </div>
    )
}
