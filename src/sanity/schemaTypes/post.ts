import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO & Metadata',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }
      ]
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    // SEO Fields
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      fieldset: 'seo',
      description: 'Optional. Falls back to the main title if left blank. Keep under 60 characters.',
      validation: Rule => Rule.max(60).warning('Longer titles may be truncated by search engines')
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      fieldset: 'seo',
      rows: 3,
      description: 'Used for the <meta name="description"> tag. Keep under 160 characters.',
      validation: Rule => Rule.max(160).warning('Longer descriptions may be truncated by search engines')
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'string',
      fieldset: 'seo',
      description: 'Comma-separated keywords for this post.',
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO/Social Image (OG Image)',
      type: 'image',
      fieldset: 'seo',
      description: 'Optional. Falls back to the Main Image. Recommended size: 1200x630.',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      fieldset: 'seo',
      description: 'Optional. Only use if this content was originally published elsewhere.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
