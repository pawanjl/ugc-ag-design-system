"use client"

import React, { ReactNode } from "react"
import { MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * DataTable
 *
 * Design token source: Figma node 7:1729–7:1840 — the request log table
 *
 * A generic data table with:
 * - Sticky header row (14px medium, muted text)
 * - Data rows with bottom border dividers
 * - Optional row actions menu (⋯ button)
 * - Empty state message
 * - Scrollable body with fixed-height container
 *
 * Design specs:
 * - Border: 1px rgba(0,0,29,0.08), rounded-lg
 * - Header bg: white/dark, sticky, 36px height
 * - Row: padding px-2.5, py-1.5, border-b between rows
 * - Row height: ~36px
 * - Actions: 18px ⋯ icon button, rounded-[10px]
 *
 * Props:
 * - columns      — column definitions: { key, label, width?, align? }
 * - rows         — row data: record keyed by column key, or any object
 * - renderCell   — optional custom cell renderer: (row, colKey) => ReactNode
 * - onRowClick   — optional row click callback
 * - onRowAction  — optional ⋯ menu callback (if omitted, no options button)
 * - emptyMessage — text shown when rows is empty
 * - maxHeight    — CSS max-height for the table body scroll area (default: "600px")
 * - className    — additional overrides
 */
export interface DataTableColumn {
    key: string
    label: string
    width?: string    // CSS width, e.g. "80px" or "flex-1"
    align?: "left" | "right" | "center"
}

export interface DataTableProps<T extends Record<string, unknown> = Record<string, unknown>> {
    columns: DataTableColumn[]
    rows: T[]
    renderCell?: (row: T, key: string, colIndex: number) => ReactNode
    onRowClick?: (row: T) => void
    onRowAction?: (row: T) => void
    emptyMessage?: string
    maxHeight?: string
    className?: string
}

export function DataTable<T extends Record<string, unknown>>({
    columns,
    rows,
    renderCell,
    onRowClick,
    onRowAction,
    emptyMessage = "No results found.",
    maxHeight = "600px",
    className,
}: DataTableProps<T>) {
    return (
        <div
            className={cn(
                "w-full border border-border rounded-lg overflow-hidden bg-background",
                className
            )}
            style={{ maxHeight }}
        >
            <table className="w-full border-collapse text-[12px]">
                {/* Sticky header */}
                <thead>
                    <tr className="sticky top-0 z-10 bg-background border-b border-border/40">
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                style={{ width: col.width }}
                                className={cn(
                                    "h-11 px-4 font-semibold text-[11px] uppercase tracking-wider text-muted-foreground/50 whitespace-nowrap text-left align-middle",
                                    col.align === "right" && "text-right",
                                    col.align === "center" && "text-center"
                                )}
                            >
                                {col.label}
                            </th>
                        ))}
                        {/* Options column placeholder */}
                        {onRowAction && <th className="w-9 h-9" />}
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {rows.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length + (onRowAction ? 1 : 0)}
                                className="py-16 text-center text-[rgba(229,229,232,0.4)] text-[14px]"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        rows.map((row, rowIdx) => (
                            <tr
                                key={rowIdx}
                                onClick={() => onRowClick?.(row)}
                                className={cn(
                                    "border-b border-border/30 last:border-b-0 transition-colors group/row",
                                    onRowClick && "cursor-pointer hover:bg-primary/[0.02]"
                                )}
                            >
                                {columns.map((col, colIdx) => (
                                    <td
                                        key={col.key}
                                        className={cn(
                                            "px-4 py-3 align-middle whitespace-nowrap text-[13px] text-foreground/80 font-medium",
                                            col.align === "right" && "text-right",
                                            col.align === "center" && "text-center"
                                        )}
                                    >
                                        {renderCell
                                            ? renderCell(row, col.key, colIdx)
                                            : String(row[col.key] ?? "")}
                                    </td>
                                ))}

                                {/* Row action button */}
                                {onRowAction && (
                                    <td className="w-12 px-1 align-middle text-right pr-3">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onRowAction(row) }}
                                            aria-label="Row options"
                                            className="size-8 rounded-lg flex items-center justify-center text-muted-foreground/30 hover:bg-secondary/20 hover:text-foreground transition-all ml-auto"
                                        >
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
