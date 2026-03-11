'use client'

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { urlForImage } from "@/sanity/lib/image"

interface BlogCardProps {
  post: {
    title: string
    slug: { current: string }
    mainImage?: any
    publishedAt: string
    excerpt?: string
    authorName?: string
    authorImage?: any
    categories?: string[]
  }
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(post.publishedAt || Date.now()))

  // Function to safely extract Sanity image URL, returning undefined if invalid
  const getImageUrl = (imageObject: any): string | undefined => {
    if (!imageObject || !imageObject.asset || !imageObject.asset._ref) {
      return undefined;
    }
    try {
      return urlForImage(imageObject).url();
    } catch (e) {
      return undefined;
    }
  }

  const mainImageUrl = getImageUrl(post.mainImage)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex w-full flex-col h-full group"
    >
      <Link href={`/blog/${post.slug.current}`} className="flex flex-col flex-grow outline-none">
        
        {/* Image wrapper */}
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[16px] bg-muted/30 border border-border/10">
          {mainImageUrl ? (
            <Image
              src={mainImageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-medium text-muted-foreground">
              No cover image
            </div>
          )}
          
          {/* Category Tags Overlay */}
          {post.categories && post.categories.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
              {post.categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[10px] sm:text-[11px] font-bold tracking-wider text-black uppercase shadow-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="flex flex-col mt-5">
          <h3 className="text-xl sm:text-[22px] font-medium leading-[1.3] text-foreground">
            {post.title}
          </h3>
          
          {post.excerpt && (
            <p className="mt-3 text-base text-muted-foreground line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="mt-4 text-[14px] text-muted-foreground">
            {formattedDate}
          </div>
          
          {/* Author Info */}
          {(post.authorName || post.authorImage) && (
            <div className="mt-3 flex items-center gap-2.5">
              <div className="flex items-center">
                {post.authorImage && getImageUrl(post.authorImage) ? (
                  <div className="relative h-6 w-6 sm:h-7 sm:w-7 overflow-hidden rounded-full border border-border bg-muted">
                    <Image
                      src={getImageUrl(post.authorImage)!}
                      alt={post.authorName || "Author"}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground border border-border">
                    {post.authorName ? post.authorName.charAt(0).toUpperCase() : "A"}
                  </div>
                )}
                {/* Note: In a real implementation with array of authors, we would map over them and use -ml-2 for overlapping avatars */}
              </div>
              <span className="text-[14px] font-medium text-foreground">
                {post.authorName}
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

