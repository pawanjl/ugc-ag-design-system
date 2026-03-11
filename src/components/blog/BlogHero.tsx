import Link from "next/link"
import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"

interface BlogHeroProps {
  post: {
    title: string
    slug: { current: string }
    mainImage?: any
    excerpt?: string
    categories?: string[]
  }
}

export function BlogHero({ post }: BlogHeroProps) {
  // Function to safely extract Sanity image URL
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
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 items-center">
      {/* Left Content */}
      <div className="flex flex-col max-w-xl">
        <h2 className="text-3xl sm:text-4xl md:text-[40px] font-medium leading-[1.2] tracking-tight text-foreground mb-6">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-lg md:text-[19px] leading-relaxed text-muted-foreground mb-8">
            {post.excerpt}
          </p>
        )}
        <Link 
          href={`/blog/${post.slug.current}`}
          className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3.5 text-[13px] font-bold uppercase tracking-wider text-background transition-transform hover:scale-105 active:scale-95 w-max"
        >
          Read Article
        </Link>
      </div>

      {/* Right Image */}
      <Link href={`/blog/${post.slug.current}`} className="group relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-[24px] bg-muted/30 border border-border/10 block">
        {mainImageUrl ? (
          <Image
            src={mainImageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-medium text-muted-foreground">
            No cover image
          </div>
        )}
        
        {/* Category Tags Overlay */}
        {post.categories && post.categories.length > 0 && (
          <div className="absolute top-5 left-5 flex flex-wrap gap-2 z-10">
            {post.categories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-[11px] font-bold tracking-[0.08em] text-black uppercase shadow-sm"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </Link>
    </div>
  )
}
