import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { postsQuery, categoriesQuery } from '@/sanity/lib/queries'
import { BlogList } from '@/components/blog/BlogList'
import { BlogHero } from '@/components/blog/BlogHero'

export const metadata: Metadata = {
  title: 'Blog | UGC',
  description: 'Latest news, customer stories, and research from our platform.',
}

export const revalidate = 60

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(categoriesQuery)
  ])

  return (
    <main>
      {/* BEGIN: FeaturedPostSection */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        {posts && posts.length > 0 && (
          <BlogHero post={posts[0]} />
        )}
      </section>
      {/* END: FeaturedPostSection */}



  {/* BEGIN: BlogGrid */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <BlogList initialPosts={posts.slice(0, 6)} categories={categories || []} />
      </section>
      {/* END: BlogGrid */}
      {/* END: BlogGrid */}
    </main>
  )
}
