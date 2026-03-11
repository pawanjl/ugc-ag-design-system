'use server'

import { client } from '@/sanity/lib/client'
import { paginatedPostsQuery } from '@/sanity/lib/queries'

export async function fetchPosts(start: number, end: number, category: string = "", searchQuery: string = "") {
  try {
    const formattedSearchQuery = searchQuery ? `${searchQuery}*` : ""
    const posts = await client.fetch(paginatedPostsQuery, { start, end, category, searchQuery: formattedSearchQuery })
    return posts
  } catch (error) {
    console.error('Error fetching paginated posts:', error)
    return []
  }
}
