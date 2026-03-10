"use client"

import React from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ds/Button"
import { FileText, Download, Printer } from "lucide-react"

export function GSTInvoicePreviewer() {
    return (
        <div className="py-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary" icon={<FileText className="w-4 h-4" />}>
                        Preview Latest GST Invoice
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-[#0a0a0a] border-border/10 text-foreground">
                    <DialogHeader className="border-b border-border/10 pb-4">
                        <DialogTitle>GST Invoice Preview</DialogTitle>
                        <DialogDescription className="text-muted-foreground/50">
                            Invoice ID: INV-2024-001 | Date: Jan 12, 2024
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="py-6 space-y-6 text-[13px]">
                        {/* Company Details */}
                        <div className="flex justify-between">
                            <div>
                                <h4 className="font-bold text-lg mb-1">ElevenLabs Inc.</h4>
                                <p className="text-muted-foreground/60">
                                    123 AI Boulevard, Silicon Valley<br />
                                    California, USA - 94025<br />
                                    GSTIN: 22AAAAA0000A1Z5
                                </p>
                            </div>
                            <div className="text-right">
                                <h4 className="font-bold text-sm mb-1 uppercase text-muted-foreground/40 tracking-wider">Billed To</h4>
                                <p className="text-muted-foreground/60">
                                    Bajrangi (ugc-ag-design-system)<br />
                                    Mumbai, India<br />
                                    GSTIN: Unregistered
                                </p>
                            </div>
                        </div>

                        {/* Invoice Items */}
                        <div className="border border-border/10 rounded-lg overflow-hidden bg-muted/5">
                            <table className="w-full">
                                <thead className="bg-muted/10 border-b border-border/10">
                                    <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground/40 font-bold">
                                        <th className="p-3">Description</th>
                                        <th className="p-3 text-right">Rate</th>
                                        <th className="p-3 text-right">Tax (%)</th>
                                        <th className="p-3 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/10 text-muted-foreground/80">
                                    <tr className="hover:bg-muted/5 transition-colors">
                                        <td className="p-3">Pro Plan Subscription (Monthly)</td>
                                        <td className="p-3 text-right">₹820.34</td>
                                        <td className="p-3 text-right">18%</td>
                                        <td className="p-3 text-right">₹820.34</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Summary */}
                        <div className="flex justify-end pt-4">
                            <div className="w-1/2 space-y-2 border-t border-border/10 pt-4">
                                <div className="flex justify-between text-muted-foreground/60 font-medium">
                                    <span>Subtotal</span>
                                    <span>₹820.34</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground/60 font-medium">
                                    <span>CGST (9%)</span>
                                    <span>₹73.83</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground/60 font-medium">
                                    <span>SGST (9%)</span>
                                    <span>₹73.83</span>
                                </div>
                                <div className="flex justify-between font-black text-lg text-foreground border-t border-border/10 pt-3">
                                    <span>Total</span>
                                    <span className="text-primary tracking-tighter">₹968.00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-border/10">
                        <Button variant="ghost" icon={<Printer className="w-4 h-4" />}>
                            Print
                        </Button>
                        <Button icon={<Download className="w-4 h-4" />}>
                            Download PDF
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
