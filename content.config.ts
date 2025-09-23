import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'

const createBaseSchema = () => z.object({
  title: z.string(),
  description: z.string()
})

const createButtonSchema = () => z.object({
  label: z.string(),
  icon: z.string().optional(),
  to: z.string().optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
  target: z.enum(['_blank', '_self']).optional()
})

const createImageSchema = () => z.object({
  src: z.string().editor({ input: 'media' }),
  alt: z.string()
})

const createAuthorSchema = () => z.object({
  name: z.string(),
  description: z.string().optional(),
  username: z.string().optional(),
  twitter: z.string().optional(),
  to: z.string().optional(),
  avatar: createImageSchema().optional()
})

const createTestimonialSchema = () => z.object({
  quote: z.string(),
  author: createAuthorSchema()
})

const createIndexSchema = z.object({
  hero: z.object({
    links: z.array(createButtonSchema()),
    images: z.array(createImageSchema())
  }),
  about: createBaseSchema(),
  experience: createBaseSchema().extend({
    items: z.array(z.object({
      date: z.date(),
      position: z.string(),
      company: z.object({
        name: z.string(),
        url: z.string(),
        logo: z.string().editor({ input: 'icon' }),
        color: z.string()
      })
    }))
  }),
  testimonials: z.array(createTestimonialSchema()),
  blog: createBaseSchema(),
  faq: createBaseSchema().extend({
    categories: z.array(
      z.object({
        title: z.string().nonempty(),
        questions: z.array(
          z.object({
            label: z.string().nonempty(),
            content: z.string().nonempty()
          })
        )
      }))
  })
})

const createAboutSchema = z.object({
  content: z.object({}),
  images: z.array(createImageSchema())
})

export default defineContentConfig({
  collections: {
    index_uk: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: {
          include: 'uk/index.yml',
          prefix: ''
        },
        schema: createIndexSchema
      })
    ),
    index_en: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: {
          include: 'en/index.yml',
          prefix: '/en'
        },
        schema: createIndexSchema
      })
    ),
    projects: defineCollection(
      asSitemapCollection({
        type: 'data',
        source: 'projects/*.yml',
        schema: z.object({
          title: z.string().nonempty(),
          description: z.string().nonempty(),
          image: z.string().nonempty().editor({ input: 'media' }),
          url: z.string().nonempty(),
          tags: z.array(z.string()),
          date: z.date()
        })
      })
    ),
    blog: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: 'blog/*.md',
        schema: z.object({
          minRead: z.number(),
          date: z.date(),
          image: z.string().nonempty().editor({ input: 'media' }),
          author: createAuthorSchema()
        })
      })
    ),
    pages: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: [
          { include: 'projects.yml' },
          { include: 'blog.yml' }
        ],
        schema: z.object({
          links: z.array(createButtonSchema())
        })
      })
    ),
    speaking: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: 'speaking.yml',
        schema: z.object({
          links: z.array(createButtonSchema()),
          events: z.array(z.object({
            category: z.enum(['Live talk', 'Podcast', 'Conference']),
            title: z.string(),
            date: z.date(),
            location: z.string(),
            url: z.string().optional()
          }))
        })
      })
    ),
    about_uk: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: {
          include: 'uk/about.yml',
          prefix: ''
        },
        schema: createAboutSchema
      })
    ),
    about_en: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: {
          include: 'en/about.yml',
          prefix: '/en'
        },
        schema: createAboutSchema
      })
    )
  }
})
