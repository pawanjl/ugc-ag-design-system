import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { postQuery, relatedPostsQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import { BlogContent } from '@/components/blog/BlogContent'
import { BlogCard } from '@/components/blog/BlogCard'

// For Next.js 15+ (where params is a promise)
type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch(postQuery, { slug })

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const generatedKeywords = post.seoKeywords 
    ? post.seoKeywords.split(',').map((k: string) => k.trim()) 
    : post.categories

  let imageUrl = ''
  if (post.seoImage) {
    imageUrl = urlForImage(post.seoImage).url()
  } else if (post.mainImage) {
    imageUrl = urlForImage(post.mainImage).url()
  }

  return {
    title: {
      absolute: post.seoTitle || post.title,
    },
    description: post.seoDescription || post.excerpt,
    keywords: generatedKeywords,
    alternates: {
      canonical: post.canonicalUrl,
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      url: post.canonicalUrl,
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.seoTitle || post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: imageUrl ? [imageUrl] : [],
    }
  }
}

export const revalidate = 60

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  
  const [post, relatedPosts] = await Promise.all([
    client.fetch(postQuery, { slug }),
    client.fetch(relatedPostsQuery, { slug })
  ])

  if (!post) {
    notFound()
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(post.publishedAt || Date.now()))

  return (
    <main className="min-h-screen bg-background pb-32 pt-16">
      <article className="mx-auto max-w-5xl px-4 md:px-6">
        
        {/* Breadcrumbs Navigation */}
        <div className="mb-16 text-[15px] font-medium text-muted-foreground flex items-center gap-3 flex-wrap">
          <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
          <span className="text-muted-foreground/50">/</span>
          {post.categories && post.categories.length > 0 && (
            <>
              <span className="uppercase tracking-wider text-[13px]">{post.categories[0]}</span>
              <span className="text-muted-foreground/50">/</span>
            </>
          )}
          <span className="text-foreground truncate max-w-[200px] sm:max-w-md">
            {post.title}
          </span>
        </div>

        {/* Header content */}
        <header className="mb-12 flex flex-col items-center text-center">
          <h1 className="mb-10 text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl max-w-4xl text-balance">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-muted-foreground">
            {post.authorName && (
              <div className="flex items-center gap-3">
                {post.authorImage ? (
                  <Image
                    src={urlForImage(post.authorImage).width(80).height(80).url()}
                    alt={post.authorName}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground border border-border">
                    {post.authorName.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-base font-medium text-foreground">
                  {post.authorName}
                </span>
              </div>
            )}
            
            {post.authorName && (
              <span className="hidden sm:block text-muted-foreground/50">•</span>
            )}
            
            <time className="text-base" dateTime={post.publishedAt}>{formattedDate}</time>
          </div>
        </header>

        {/* Main Image */}
        {post.mainImage && (
          <div className="relative mb-20 aspect-[16/9] w-full max-w-5xl mx-auto overflow-hidden rounded-[24px] bg-muted shadow-sm border border-border/10">
            <Image
              src={urlForImage(post.mainImage).url()}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        )}

        {/* Body */}
        <div className="mx-auto max-w-[48rem] w-full text-lg leading-relaxed mb-32">
          <BlogContent value={post.body} />
        </div>
        
        {/* Related Articles */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="border-t border-border/40 pt-16">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-10">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost: any) => (
                <BlogCard key={relatedPost._id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  )
}
