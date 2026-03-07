import * as React from "react"
import { ReactNode } from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"

export interface AccordionItemData {
  id: string
  trigger: ReactNode
  content: ReactNode
  className?: string
}

export type AccordionGroupProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
  items: AccordionItemData[]
  itemClassName?: string
  triggerClassName?: string
  contentClassName?: string
}
