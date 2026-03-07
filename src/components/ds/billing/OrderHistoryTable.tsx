"use client"

import React from "react"
import { DataTable, DataTableColumn } from "../DataTable"
import { Download } from "lucide-react"
import { cn } from "@/lib/utils"

const columns: DataTableColumn[] = [
    { key: "id", label: "Invoice ID", width: "120px" },
    { key: "date", label: "Date", width: "120px" },
    { key: "plan", label: "Plan", width: "120px" },
    { key: "amount", label: "Amount", width: "100px", align: "right" },
    { key: "status", label: "Status", width: "100px", align: "center" },
]

const rows: Record<string, string>[] = [
    { id: "INV-001", date: "Oct 12, 2023", plan: "Pro Plan", amount: "₹968.00", status: "Paid" },
    { id: "INV-002", date: "Nov 12, 2023", plan: "Pro Plan", amount: "₹968.00", status: "Paid" },
    { id: "INV-003", date: "Dec 12, 2023", plan: "Pro Plan", amount: "₹968.00", status: "Paid" },
    { id: "INV-004", date: "Jan 12, 2024", plan: "Pro Plan", amount: "₹968.00", status: "Processing" },
]

export function OrderHistoryTable() {
    return (
        <div className="py-4">
            <DataTable
                columns={columns}
                rows={rows}
                onRowAction={(row) => console.log("Download invoice for", row.id)}
                renderCell={(row, key) => {
                    if (key === "status") {
                        const status = row[key] as string
                        return (
                            <div className="flex justify-center">
                                <span className={cn(
                                    "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border whitespace-nowrap",
                                    status === "Paid" 
                                        ? "bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_12px_rgba(34,197,94,0.1)]" 
                                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 shadow-[0_0_12px_rgba(234,179,8,0.1)]"
                                )}>
                                    {status}
                                </span>
                            </div>
                        )
                    }
                    return String(row[key] ?? "")
                }}
            />
        </div>
    )
}
