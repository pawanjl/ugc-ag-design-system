"use client"

import * as React from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion"
import { AccordionGroupProps } from "./accordion.types"

export function AccordionGroup({
    items,
    itemClassName,
    triggerClassName,
    contentClassName,
    ...props
}: AccordionGroupProps) {
    return (
        <Accordion {...props}>
            {items.map((item) => (
                <AccordionItem 
                    key={item.id} 
                    value={item.id} 
                    className={item.className || itemClassName}
                >
                    <AccordionTrigger className={triggerClassName}>
                        {item.trigger}
                    </AccordionTrigger>
                    <AccordionContent className={contentClassName}>
                        {item.content}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
