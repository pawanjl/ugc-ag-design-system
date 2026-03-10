"use client"

import { DataTable, type DataTableColumn } from "@/components/ds/DataTable"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button/button"
import { History, ChevronDown } from "lucide-react"

type RequestLogRow = {
  code: number
  method: string
  request: string
  user: string
  latency: string
  timestamp: string
}

const columns: DataTableColumn[] = [
  { key: "code", label: "Code", width: "80px" },
  { key: "method", label: "Method", width: "90px" },
  { key: "request", label: "Request" },
  { key: "user", label: "User", width: "200px" },
  { key: "latency", label: "Latency", width: "110px", align: "right" },
  { key: "timestamp", label: "Timestamp", width: "190px", align: "right" },
]

const rows: RequestLogRow[] = [
  {
    code: 200,
    method: "GET",
    request: "/v1/voices?show_legacy=true",
    user: "ghavteaniket@gmail.com",
    latency: "14ms",
    timestamp: "Mar 10, 2026, 21:43:08",
  },
  {
    code: 200,
    method: "GET",
    request: "/v1/models",
    user: "ghavteaniket@gmail.com",
    latency: "259ms",
    timestamp: "Mar 10, 2026, 21:43:07",
  },
  {
    code: 200,
    method: "GET",
    request: "/v1/voices?show_legacy=true",
    user: "ghavteaniket@gmail.com",
    latency: "93ms",
    timestamp: "Mar 10, 2026, 21:43:07",
  },
  {
    code: 200,
    method: "GET",
    request: "/v1/voices?show_legacy=true",
    user: "ghavteaniket@gmail.com",
    latency: "21ms",
    timestamp: "Mar 10, 2026, 21:43:06",
  },
  {
    code: 200,
    method: "GET",
    request: "/v1/models",
    user: "ghavteaniket@gmail.com",
    latency: "23ms",
    timestamp: "Mar 10, 2026, 21:43:02",
  },
]

const filterChips = [
  "+ Method",
  "+ Code",
  "+ Pattern",
  "+ XI API Key",
  "+ Start Time",
  "+ End Time",
  "+ Min Latency",
  "+ Max Latency",
  "+ User",
]

export default function RequestLogPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-7 items-center justify-center rounded-md bg-muted">
            <History className="h-4 w-4 text-foreground" />
          </span>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Request Log
            </h1>
            <p className="text-xs text-muted-foreground md:text-sm">
              Inspect recent API activity, response codes, and latencies.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full px-4 text-xs font-medium"
          >
            API Pricing
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full px-4 text-xs font-medium"
          >
            Documentation
          </Button>
        </div>
      </div>

      {/* Search row */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search path or query..."
            className="h-9 rounded-lg border-border/70 bg-muted/40 text-[13px] placeholder:text-muted-foreground/60"
          />
          <Button
            size="sm"
            className="h-9 rounded-full px-4 text-xs font-medium bg-foreground text-background hover:bg-foreground/90"
          >
            Jump to timestamp
          </Button>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 text-xs">
          {filterChips.map((label) => (
            <button
              key={label}
              type="button"
              className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background px-3 py-1 text-[11px] font-medium text-muted-foreground hover:bg-muted/50 transition-colors"
            >
              {label}
              <ChevronDown className="h-3 w-3 text-muted-foreground/60" />
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <DataTable<RequestLogRow>
        columns={columns}
        rows={rows}
        maxHeight="580px"
        renderCell={(row, key) => {
          if (key === "code") {
            return (
              <span className="inline-flex min-w-[44px] items-center justify-center rounded-full bg-black px-3 py-1 text-[11px] font-semibold text-white">
                {row.code}
              </span>
            )
          }

          if (key === "method") {
            return (
              <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-[11px] font-semibold text-foreground">
                {row.method}
              </span>
            )
          }

          if (key === "request") {
            return (
              <span className="font-mono text-[12px] text-foreground/90">
                {row.request}
              </span>
            )
          }

          if (key === "user") {
            return (
              <span className="text-[12px] text-foreground/80">
                {row.user}
              </span>
            )
          }

          if (key === "latency") {
            return (
              <span className="text-[12px] font-semibold text-foreground">
                {row.latency}
              </span>
            )
          }

          if (key === "timestamp") {
            return (
              <span className="text-[12px] text-muted-foreground">
                {row.timestamp}
              </span>
            )
          }

          return null
        }}
      />
    </div>
  )
}

