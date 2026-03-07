import { VariantProps } from "class-variance-authority"
import { Avatar as AvatarPrimitive } from "radix-ui"
import { HTMLMotionProps } from "framer-motion"

export type AvatarSize = "sm" | "md" | "lg" | "xl"
export type AvatarStatus = "online" | "offline" | "busy" | "away"

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: AvatarSize
  status?: AvatarStatus
  statusColor?: string
  animateOnClick?: boolean
  motionProps?: HTMLMotionProps<"div">
}

export interface AvatarImageProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> { }

export interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> { }

export interface AvatarBadgeProps extends React.ComponentPropsWithoutRef<"span"> {
  status?: AvatarStatus
}

export interface AvatarGroupProps extends React.ComponentPropsWithoutRef<"div"> {
  size?: AvatarSize
  max?: number
  total?: number
}
