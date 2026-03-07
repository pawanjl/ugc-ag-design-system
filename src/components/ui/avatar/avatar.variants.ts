import { cva } from "class-variance-authority"

export const avatarVariants = cva(
  "group/avatar relative flex shrink-0 overflow-hidden rounded-full select-none bg-muted",
  {
    variants: {
      size: {
        sm: "size-6",
        md: "size-8",
        lg: "size-10",
        xl: "size-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export const statusVariants = cva(
  "absolute z-10 rounded-full ring-2 ring-background",
  {
    variants: {
      status: {
        online: "bg-emerald-500",
        offline: "bg-zinc-500",
        busy: "bg-red-500",
        away: "bg-amber-500",
      },
      size: {
        sm: "size-1.5 right-0 bottom-0",
        md: "size-2 right-0 bottom-0",
        lg: "size-2.5 right-0.5 bottom-0.5",
        xl: "size-3 right-0.5 bottom-0.5",
      },
    },
    defaultVariants: {
      status: "online",
      size: "md",
    },
  }
)
