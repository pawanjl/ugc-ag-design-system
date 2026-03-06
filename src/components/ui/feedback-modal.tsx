"use client"

import * as React from "react"
import { AnimatedPopover } from "@/components/ui/animated-popover"
import { Button } from "@/components/ui/button/button"

interface FeedbackModalProps {
  children: React.ReactNode
  onSubmit?: (feedback: string) => void
}

export function FeedbackModal({ children, onSubmit }: FeedbackModalProps) {
  const [open, setOpen] = React.useState(false)
  const [feedback, setFeedback] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!feedback.trim()) return

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setFeedback("")
      setOpen(false)
      if (onSubmit) {
        onSubmit(feedback)
      }
    }, 600)
  }

  return (
    <AnimatedPopover
      open={open}
      onOpenChange={setOpen}
      align="center"
      sideOffset={8}
      trigger={children}
      className="w-[340px]"
    >
      <div className="flex flex-col pb-2">
        <form id="feedback-form" onSubmit={handleSubmit}>
          <label className="text-sm font-medium flex flex-col gap-2">
            <textarea 
              className="flex min-h-[60px] w-full rounded-[10px] border border-[#2a2a2a] bg-transparent px-3 py-2 text-sm placeholder:text-[#5b5b64] focus-visible:outline-none focus-visible:border-[#e5e5e8]/30 focus-visible:ring-[0.5px] focus-visible:ring-[#e5e5e8]/30 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition duration-100 resize-none" 
              name="feedback" 
              placeholder="Type your feedback here..." 
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              autoFocus
            />
          </label>
        </form>
      </div>
      <div className="flex items-center justify-between gap-10 mt-1">
        <p className="text-xs text-[#5b5b64] font-normal leading-tight">
          We don't respond to submissions, but we read all of them carefully
        </p>
        <Button 
          type="submit" 
          form="feedback-form" 
          variant="outline" 
          size="sm"
          loading={isSubmitting}
          disabled={!feedback.trim() || isSubmitting}
        >
          Submit
        </Button>
      </div>
    </AnimatedPopover>
  )
}
