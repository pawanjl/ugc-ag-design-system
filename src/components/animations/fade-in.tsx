"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"

export function FadeIn({
    children,
    delay = 0,
    duration = 0.5,
    className,
    ...props
}: HTMLMotionProps<"div"> & { delay?: number; duration?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}
