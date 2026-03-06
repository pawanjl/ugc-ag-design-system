"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { avatarVariants, statusVariants } from "./avatar.variants"
import {
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
  AvatarBadgeProps,
  AvatarGroupProps,
} from "./avatar.types"

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, size = "md", status, statusColor, animateOnClick = true, motionProps, ...props }, ref) => (
    <div className="relative inline-block">
      <motion.div
        whileTap={animateOnClick ? { scale: 0.94 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        {...motionProps}
      >
        <AvatarPrimitive.Root
          ref={ref}
          className={cn(avatarVariants({ size }), className)}
          {...props}
        />
      </motion.div>
      {status && (
        <span
          className={cn(statusVariants({ status, size }))}
          style={statusColor ? { backgroundColor: statusColor } : undefined}
          aria-hidden="true"
        />
      )}
    </div>
  )
)
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, size = "md", max, total, children, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children)
    const displayCount = max ? Math.min(childrenArray.length, max) : childrenArray.length
    const remainingCount = total ? total - displayCount : childrenArray.length - displayCount

    return (
      <div
        ref={ref}
        className={cn("flex flex-row-reverse justify-end -space-x-2 space-x-reverse", className)}
        {...props}
      >
        {remainingCount > 0 && (
          <div
            className={cn(
              avatarVariants({ size }),
              "z-10 flex items-center justify-center border-2 border-background bg-muted text-xs font-medium text-muted-foreground"
            )}
          >
            +{remainingCount}
          </div>
        )}
        {childrenArray.slice(0, displayCount).reverse().map((child, index) => (
          <div key={index} className="relative ring-2 ring-background rounded-full">
            {child}
          </div>
        ))}
      </div>
    )
  }
)
AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }
