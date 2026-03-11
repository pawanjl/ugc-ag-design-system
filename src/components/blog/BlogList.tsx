'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { BlogCard } from './BlogCard'
import { fetchPosts } from '@/app/blog/actions'

interface BlogListProps {
  initialPosts: any[]
  categories: { _id: string; title: string }[]
}

const POSTS_PER_PAGE = 6

export function BlogList({ initialPosts, categories }: BlogListProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialPosts.length === POSTS_PER_PAGE)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const observerTarget = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return
    
    setLoading(true)
    try {
      const currentLength = posts.length
      const newPosts = await fetchPosts(currentLength, currentLength + POSTS_PER_PAGE, selectedCategory, debouncedQuery)
      
      if (newPosts.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...newPosts])
        if (newPosts.length < POSTS_PER_PAGE) {
          setHasMore(false)
        }
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Failed to load more posts', error)
    } finally {
      setLoading(false)
    }
  }, [posts.length, loading, hasMore, selectedCategory, debouncedQuery])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMorePosts()
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [loadMorePosts, hasMore, loading])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    let isMounted = true

    const fetchFilteredPosts = async () => {
      setLoading(true)
      try {
        const newPosts = await fetchPosts(0, POSTS_PER_PAGE, selectedCategory, debouncedQuery)
        if (!isMounted) return
        setPosts(newPosts)
        setHasMore(newPosts.length === POSTS_PER_PAGE)
      } catch (error) {
        console.error('Failed to fetch filtered posts', error)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchFilteredPosts()

    return () => {
      isMounted = false
    }
  }, [selectedCategory, debouncedQuery])

  return (
    <>
      {/* Search Input */}
      {/* <div className="mb-12 group relative mx-auto max-w-lg">
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
          <span className="material-symbols-outlined text-muted-foreground">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </span>
        </div>
        <input
          className="w-full rounded-full border border-border bg-card py-3 pl-12 pr-6 text-sm text-foreground shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-foreground/5 dark:shadow-none sm:text-base sm:py-3.5"
          placeholder="Search articles..."
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div> */}

      {/* Category Filter Navigation */}
      <div className="mb-16 relative">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <button
            onClick={() => setSelectedCategory('')}
            className={`whitespace-nowrap flex-shrink-0 rounded-full px-4 py-1.5 text-xs sm:px-5 sm:py-2 sm:text-sm font-medium transition-colors ${
              selectedCategory === ''
                ? 'bg-foreground text-background'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            }`}
          >
            All News
          </button>
          {categories && categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category.title)}
              className={`whitespace-nowrap flex-shrink-0 rounded-full px-4 py-1.5 text-xs sm:px-5 sm:py-2 sm:text-sm font-medium transition-colors ${
                selectedCategory === category.title
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {!posts || posts.length === 0 ? (
        <div className="text-center py-24 text-muted-foreground">
          {searchQuery !== '' 
            ? `No articles found matching "${searchQuery}".`
            : selectedCategory === '' 
              ? "We haven't published any articles yet. Check back soon for updates!"
              : `No articles found for the "${selectedCategory}" category.`}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
      
      {/* Intersection Observer Target */}
      {hasMore && (
        <div ref={observerTarget} className="flex justify-center mt-20 p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading more articles...</span>
          </div>
        </div>
      )}
      
      {!hasMore && posts.length > 0 && (
        <div className="flex justify-center mt-20 text-sm text-muted-foreground">
          You've reached the end of the list.
        </div>
      )}
    </>
  )
}
