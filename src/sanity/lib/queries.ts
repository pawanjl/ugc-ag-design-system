import { groq } from 'next-sanity'

// Get all posts
export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  "authorName": author->name,
  "authorImage": author->image,
  "categories": categories[]->title
}`

// Get paginated posts (optionally filtered by category title and search query)
export const paginatedPostsQuery = groq`*[_type == "post" && defined(slug.current) && ($category == "" || $category in categories[]->title) && ($searchQuery == "" || title match $searchQuery || excerpt match $searchQuery)] | order(publishedAt desc)[$start...$end] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  "authorName": author->name,
  "authorImage": author->image,
  "categories": categories[]->title
}`

// Get all categories that are used in posts
export const categoriesQuery = groq`*[_type == "category"] {
  _id,
  title
} | order(title asc)`

// Get a single post by its slug
export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  mainImage,
  body,
  publishedAt,
  "authorName": author->name,
  "authorImage": author->image,
  "categories": categories[]->title,
  seoTitle,
  seoDescription,
  seoKeywords,
  seoImage,
  canonicalUrl
}`

// Get related posts (most recent posts excluding the current one)
export const relatedPostsQuery = groq`*[_type == "post" && slug.current != $slug && defined(slug.current)] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  "authorName": author->name,
  "authorImage": author->image,
  "categories": categories[]->title
}`
