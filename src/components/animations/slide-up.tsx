"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"

export function SlideUp({
    children,
    delay = 0,
    duration = 0.5,
    yOffset = 20,
    className,
    ...props
}: HTMLMotionProps<"div"> & { delay?: number; duration?: number; yOffset?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: yOffset }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -yOffset }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}
