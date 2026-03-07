"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"
import { motion } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const TabsContext = React.createContext<{
  activeTab: string | undefined
  setActiveTab: (value: string) => void
  variant?: string | null
}>({
  activeTab: undefined,
  setActiveTab: () => {},
  variant: "default",
})

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
    variant?: VariantProps<typeof tabsListVariants>["variant"]
  }
>(({ defaultValue, value, onValueChange, variant = "default", ...props }, ref) => {
  const [activeTab, setActiveTabInternal] = React.useState(value || defaultValue)

  React.useEffect(() => {
    if (value !== undefined) {
      setActiveTabInternal(value)
    }
  }, [value])

  const setActiveTab = React.useCallback(
    (val: string) => {
      if (value === undefined) {
        setActiveTabInternal(val)
      }
      onValueChange?.(val)
    },
    [onValueChange, value]
  )

  return (
    <TabsContext.Provider value={{ activeTab: activeTab as string, setActiveTab, variant }}>
      <TabsPrimitive.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onValueChange={setActiveTab}
        {...props}
      />
    </TabsContext.Provider>
  )
})
Tabs.displayName = TabsPrimitive.Root.displayName

const tabsListVariants = cva(
  "inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
  {
    variants: {
      variant: {
        default: "bg-muted",
        outline: "bg-transparent border border-border/40",
        ghost: "bg-transparent gap-2",
        pill: "bg-muted/50 p-1.5 gap-1 rounded-full",
        underline: "bg-transparent border-b border-border/40 rounded-none w-full justify-start px-0 pb-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
    VariantProps<typeof tabsListVariants>
>(({ className, variant, ...props }, ref) => {
  // We don't need to wrap List with provider again because the root already provides it.
  // But we allow variant here to stay consistent with API, though root should dominate.
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant, className }))}
      {...props}
    />
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    layoutId?: string
    indicatorClassName?: string
    showIndicator?: boolean
  }
>(({ className, children, value, layoutId = "active-tab-indicator", indicatorClassName, showIndicator = true, ...props }, ref) => {
  const { activeTab, variant } = React.useContext(TabsContext)
  const isActive = activeTab === value
  const isUnderline = variant === "underline"

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      value={value}
      className={cn(
        "group relative inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 data-[state=active]:text-foreground text-muted-foreground",
        !isUnderline && "rounded-md",
        className
      )}
      {...props}
    >
      {isUnderline ? (
        <div className="relative h-full flex items-center justify-center px-1">
          <span className="relative z-10">{children}</span>
          {showIndicator && isActive && (
            <motion.div
              layoutId={layoutId}
              className={cn("absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full", indicatorClassName)}
              transition={{
                type: "spring",
                bounce: 0.15,
                duration: 0.5
              }}
            />
          )}
        </div>
      ) : (
        <>
          <span className="relative z-10">{children}</span>
          {showIndicator && isActive && (
            <motion.div
              layoutId={layoutId}
              className={cn("absolute inset-0 z-0 rounded-md bg-background shadow-sm", indicatorClassName)}
              transition={{
                type: "spring",
                bounce: 0.15,
                duration: 0.5
              }}
            />
          )}
        </>
      )}
    </TabsPrimitive.Trigger>
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
