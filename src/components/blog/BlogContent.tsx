"use client"

import Image from 'next/image'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="relative my-10 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
          <Image
            src={urlForImage(value).url()}
            alt={value.alt || 'Blog Image'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
          />
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="mt-12 mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="mt-12 mb-6 text-3xl font-semibold tracking-tight text-foreground md:text-4xl pb-2 border-b border-border/50">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mt-8 mb-4 text-2xl font-semibold tracking-tight text-foreground">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mt-8 mb-4 text-xl font-semibold tracking-tight text-foreground">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="mb-6 leading-relaxed text-lg text-muted-foreground/90">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-8 border-l-4 border-primary pl-6 py-2 text-xl italic text-foreground bg-muted/30 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-6 ml-6 list-disc space-y-2 text-lg text-muted-foreground/90 marker:text-primary">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-6 ml-6 list-decimal space-y-2 text-lg text-muted-foreground/90 marker:text-primary font-medium">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a 
          href={value.href} 
          rel={rel} 
          className="font-medium text-primary underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors hover:text-foreground"
        >
          {children}
        </a>
      )
    },
    strong: ({ children }: any) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
        {children}
      </code>
    ),
  },
}

interface BlogContentProps {
  value: any[]
}

export function BlogContent({ value }: BlogContentProps) {
  if (!value) return null

  return (
    <article className="prose-base md:prose-lg max-w-none">
      <PortableText value={value} components={components} />
    </article>
  )
}
