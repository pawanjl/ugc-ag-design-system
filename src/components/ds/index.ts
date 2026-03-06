/**
 * Design System Components — /components/ds
 *
 * All components are extracted from Figma file: ElevenLabs --- UI-UX
 * and adapted to the dark design system.
 *
 * Each component is self-contained (no shared state), fully typed,
 * and documented with the source Figma node ID in its JSDoc.
 */

// ── Interactive Atoms ────────────────────────────────────────────────
export { Button, IconButton } from "./Button"
export type { ButtonProps, ButtonVariant, ButtonSize, IconButtonProps } from "./Button"

// ── Overlays / Menus ──────────────────────────────────────────────
export { ProfileMenu } from "./ProfileMenu"
export type { ProfileMenuProps, ProfileMenuItem } from "./ProfileMenu"

export { PromptComposer } from "./PromptComposer"
export type { PromptComposerProps, ComposerControl } from "./PromptComposer"

// ── Atoms ─────────────────────────────────────────────────────────────
export { AnnouncementBanner } from "./AnnouncementBanner"
export type { AnnouncementBannerProps } from "./AnnouncementBanner"

export { PageHeader } from "./PageHeader"
export type { PageHeaderProps } from "./PageHeader"

export { SectionHeading } from "./SectionHeading"
export type { SectionHeadingProps } from "./SectionHeading"

export { Breadcrumb } from "./Breadcrumb"
export type { BreadcrumbProps, BreadcrumbItem } from "./Breadcrumb"

// ── Navigation ────────────────────────────────────────────────────────
export { PageTabNav } from "./PageTabNav"
export type { PageTabNavProps, TabItem } from "./PageTabNav"

// ── Inputs ────────────────────────────────────────────────────────────
export { SearchInput } from "./SearchInput"
export type { SearchInputProps } from "./SearchInput"

// ── Filters ───────────────────────────────────────────────────────────
export { FilterChip, FilterBar } from "./FilterChip"
export type { FilterChipProps, FilterBarProps, FilterBarChip } from "./FilterChip"

// ── Badges ────────────────────────────────────────────────────────────
export { StatusBadge, MethodBadge } from "./HttpBadges"
export type { StatusBadgeProps, MethodBadgeProps, StatusBadgeVariant } from "./HttpBadges"

// ── Data Display ──────────────────────────────────────────────────────
export { DataTable } from "./DataTable"
export type { DataTableProps, DataTableColumn } from "./DataTable"

// ── Cards ─────────────────────────────────────────────────────────────
export { QuickActionCard, QuickActionGrid } from "./QuickActionCard"
export type { QuickActionCardProps, QuickActionGridProps } from "./QuickActionCard"

export { IconLinkCard, IconLinkGrid } from "./IconLinkCard"
export type { IconLinkCardProps, IconLinkGridProps, IconLinkGridItem } from "./IconLinkCard"

export { VoiceActionCard } from "./VoiceActionCard"
export type { VoiceActionCardProps } from "./VoiceActionCard"

// ── List Items ────────────────────────────────────────────────────────
export { VoiceLibraryItem, VoiceLibraryList } from "./VoiceLibraryItem"
export type { VoiceLibraryItemProps, VoiceLibraryListProps } from "./VoiceLibraryItem"

// -- Layout / Structural ------------------------------------------------------
export { TopBar } from "./TopBar"
export type { TopBarProps, BreadcrumbItem as TopBarBreadcrumbItem } from "./TopBar"

// -- Sections -----------------------------------------------------------------
export { FaqSection } from "./FaqSection"
export type { FaqSectionProps, FaqItem } from "./FaqSection"

export { PricingCard } from "./PricingCard"
export type { PricingCardProps, PricingFeature } from "./PricingCard"
